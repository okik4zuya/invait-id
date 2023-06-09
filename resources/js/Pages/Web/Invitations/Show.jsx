import React, { useEffect, useState } from 'react';
import { usePage } from "@inertiajs/inertia-react"
import '@splidejs/splide/css';
import '@splidejs/splide/css/core';
import './invitation.css';
import './utility.css';
import 'animate.css';
import Splide from '@splidejs/splide';
import Block from './Components/Block';
import { useInvitationStore } from '../../../store';
import Modal from './Components/Modal';
import Gift from './Components/Gift';
import Ucapan from './Components/Ucapan';
import Reservation from './Components/Reservation';
import { AudioButton } from './Components/AudioButton';
import YAML from 'yaml'
import { useFullScreenHandle } from 'react-full-screen';

export default function InvitationShow() {
    //destructure inertia usePage()
    const { invitation } = usePage().props;
    const { template } = invitation;
    // console.log(invitation)

    //define url params
    const q = window.location.search
    const urlParams = new URLSearchParams(q)

    //destructure global state from zustand store
    const { isModalGiftShow, setIsModalGiftShow } = useInvitationStore(state => state)
    const { isModalUcapanShow, setIsModalUcapanShow } = useInvitationStore(state => state);
    const { isModalRsvpShow, setIsModalRsvpShow } = useInvitationStore(state => state);
    const { isCoverShow, setIsCoverShow } = useInvitationStore(state => state);
    const { pageIndex, setPageIndex } = useInvitationStore(state => state);


    //parse content and template
    const parsedContent = YAML.parse(invitation.custom_template.content);
    const parsedTemplate = YAML.parse(template.template);
    const parsedCustomTemplate = YAML.parse(invitation.custom_template.template);

    //getFeatureData
    const getFeatureData = (type) => {
        let hasFeature = parsedContent?.features.hasOwnProperty(type);
        if (hasFeature === true) {
            return parsedContent?.features[type]
        } else {
            return null;
        }
    }

    //disabledFeatures
    let disabledFeatures = [];
    if (parsedContent?.features) {
        for (const feature in parsedContent.features) {
            if (parsedContent.features[feature].is_page_enabled === false) {
                disabledFeatures.push(feature)
            }
        }
    }

    //replace template string
    const replaceTemplate = () => {
        let stringToReplace = {};
        stringToReplace.nama_tamu = urlParams.get('to') ?? 'Nama Tamu';
        if (parsedContent.pages) {
            for (let i = 0; i < parsedContent.pages.length; i++) {
                stringToReplace = { ...stringToReplace, ...parsedContent.pages[i] }
            }
        }

        for (const key in stringToReplace) {
            let el = document.querySelectorAll('.' + key);
            for (let i = 0; i < el.length; i++) {
                if (el[i]) {
                    if (el[i]?.tagName === 'IMG') {
                        el[i].src = stringToReplace[key]
                    } else if (el[i]?.tagName === 'DIV' || 'SPAN') {
                        el[i].innerHTML = stringToReplace[key]
                    }
                }
            }
        }

    }

    //replace template string -- alternative method
    // const replacedTemplate = (pages) => {
    //     let stringToReplace = {};
    //     for (let i = 0; i < parsedContent.pages.length; i++) {
    //         stringToReplace = { ...stringToReplace, ...parsedContent.pages[i] }
    //     }
    //     for (let i = 0; i < pages.length; i++) {
    //         for (let j = 0; j < pages[i].blocks.length; j++) {
    //             if (stringToReplace.hasOwnProperty(pages[i].blocks[j].content)) {
    //                 pages[i].blocks[j].content = stringToReplace[pages[i].blocks[j].content]
    //             }
    //             if (stringToReplace.hasOwnProperty(pages[i].blocks[j].attributes.src)) {
    //                 pages[i].blocks[j].attributes.src = stringToReplace[pages[i].blocks[j].attributes.src]
    //             }
    //         }
    //     }
    //     return pages;
    // }


    //backgroundToRender
    const backgroundToRender = () => {
        let background = invitation.is_custom_template == true ? parsedCustomTemplate.background : parsedTemplate.background;
        return background;
    }

    //pagesToRender
    const pagesToRender = () => {
        let pages = invitation.is_custom_template == true ? parsedCustomTemplate.pages : parsedTemplate.pages;

        let hash = pages;
        for (let i = 0; i < disabledFeatures.length; i++) {
            if (disabledFeatures[i] === "maps") {
                hash = hash.filter(item => item.page_title !== "Maps")
            } else if (disabledFeatures[i] === "rsvp") {
                hash = hash.filter(item => item.page_title !== "RSVP")
            } else if (disabledFeatures[i] === "ucapan") {
                hash = hash.filter(item => item.page_title !== "Ucapan")
            } else if (disabledFeatures[i] === "gift") {
                hash = hash.filter(item => item.page_title !== "Gift")
            }
        }
        return hash;
    }
    //console.log(pagesToRender())


    //fulscreen handling
    const fsHandle = useFullScreenHandle();

    useEffect(() => {
        //add css to DOM
        const style = document.createElement('style');
        style.innerHTML = invitation.is_custom_template == true ? invitation.custom_template.css : invitation.template.css;
        document.head.appendChild(style);

        //replace template with custom content
        parsedContent && replaceTemplate()


        $('#main-slider').not('.slick-initialized').slick({
            fade: true,
            arrows: false,
            // verticalSwiping: true,
            infinite: false,
            asNavFor: "#thumb-slider"
        }).on('afterChange', (e, current) => {
            setPageIndex(current.currentSlide)
        })
        $('#thumb-slider').not('.slick-initialized').slick({
            arrows: false,
            infinite: false,
            asNavFor: "#main-slider",
            slidesToShow: 4,
            centerMode: false,
            focusOnSelect: true,
            swipeToSlide: true
        }).on('afterChange', (e, current) => {
            setPageIndex(current.currentSlide)
        })

        document.addEventListener('swiped', (e) => {
            if(e.detail.dir === 'up'){
                let currentSlide = $('#main-slider').slick('slickCurrentSlide')
                currentSlide < pagesToRender().length && $('#main-slider').slick('slickGoTo', currentSlide + 1)
                console.log('swiped up')
            } else if(e.detail.dir === 'down'){
                let currentSlide = $('#main-slider').slick('slickCurrentSlide')
                currentSlide > 0 && $('#main-slider').slick('slickGoTo', currentSlide + 1)
                console.log('swiped down')
            }
        })

        return () => {
        }


    }, [pageIndex])

    return (
        <div className='canvas-absolute'>
            <div className='canvas-relative'>
                {getFeatureData('audio')?.is_enabled && <AudioButton src={getFeatureData('audio').data.src} />}
                <Modal isShow={isModalGiftShow} onClose={() => setIsModalGiftShow(false)}><Gift data={getFeatureData('gift')} /> </Modal>
                <Modal isShow={isModalUcapanShow} onClose={() => setIsModalUcapanShow(false)}><Ucapan data={getFeatureData('ucapan')} messages={invitation.invitation_message} /> </Modal>
                <Modal isShow={isModalRsvpShow} onClose={() => setIsModalRsvpShow(false)}><Reservation data={getFeatureData('rsvp')} /> </Modal>
                <div
                    className={`cover-container ${isCoverShow == false && "cover-container--out"}`}
                >
                    <div className='background-container'>
                        {backgroundToRender() && backgroundToRender()[0].blocks.map((block, key) => (
                            <Block
                                key={key}
                                type={block.type}
                                className={block.className}
                                attributes={block.attributes}
                                container_attributes={block.container_attributes}
                                content={block.content}
                                blocks={block.blocks}
                                data={getFeatureData(block.type)}
                                getFeatureData={getFeatureData}
                            />
                        ))}
                    </div>
                    <div className='content-frame'>
                        {pagesToRender() && pagesToRender()[0].blocks?.map((block, key) => (
                            <Block
                                key={key}
                                type={block.type}
                                className={block.className}
                                attributes={block.attributes}
                                container_attributes={block.container_attributes}
                                content={block.content}
                                blocks={block.blocks}
                                data={getFeatureData(block.type)}
                                getFeatureData={getFeatureData}
                            />
                        ))}
                    </div>
                </div>
                <div id='main-slider'>
                    {pagesToRender() && pagesToRender().slice(1).map((page, pageKey) => (
                        <div key={pageKey} className={`page-${pageKey + 1}`}>
                            {pageIndex === pageKey &&
                                <>
                                    <div className='layer__background'>
                                        {backgroundToRender() && backgroundToRender()[page.background].blocks.map((block, key) => (
                                            <Block
                                                key={key}
                                                type={block.type}
                                                className={block.className}
                                                attributes={block.attributes}
                                                container_attributes={block.container_attributes}
                                                content={block.content}
                                                blocks={block.blocks}
                                                data={getFeatureData(block.type)}
                                                getFeatureData={getFeatureData}
                                            />
                                        ))}
                                    </div>

                                    <div className='layer__content'>
                                        <div className='content-frame'>
                                            {page.blocks.map((block, key) => (
                                                <Block
                                                    key={key}
                                                    type={block.type}
                                                    className={block.className}
                                                    attributes={block.attributes}
                                                    container_attributes={block.container_attributes}
                                                    content={block.content}
                                                    blocks={block.blocks}
                                                    data={getFeatureData(block.type)}
                                                    getFeatureData={getFeatureData}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </>
                            }
                        </div>
                    ))}
                </div>

                <div id="thumb-slider">
                            {pagesToRender().slice(1).map((page, key) => (
                                <li key={key} className="menu-thumb d-flex flex-column align-items-center justify-content-center">
                                    <i className={`${page.thumb_icon} menu-thumb__icon`} />
                                    <div className='menu-thumb__title mt-1'>
                                        {page.page_title}
                                    </div>
                                </li>
                            ))}
                </div>
            </div>
        </div>
    )
}