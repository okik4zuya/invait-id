import React from "react";
import Countdown from "./Countdown";
import Gift from "./Gift";
import { useInvitationStore } from "../../../../store";
import { useFullScreenHandle } from 'react-full-screen';

export default function Block(props) {
    //destructure props
    const { type, className, attributes: attr, container_attributes, content, blocks, data, getFeatureData } = props;

    //if there is class, insert class to attributes.className
    var attributes = {};
    if (className) {
        attributes = {...attr, className};
    } else if(attr?.className){
        attributes = attr;
    }

    //destructure global states from zustand store
    const { isModalGiftShow, setIsModalGiftShow } = useInvitationStore(state => state);
    const { isModalUcapanShow, setIsModalUcapanShow } = useInvitationStore(state => state);
    const { isModalRsvpShow, setIsModalRsvpShow } = useInvitationStore(state => state);
    const { isAudioPlay, setIsAudioPlay } = useInvitationStore(state => state);
    const { isCoverShow, setIsCoverShow } = useInvitationStore(state => state);
    const { pageIndex, setPageIndex } = useInvitationStore(state => state);



    //fulscreen handling
    const fsHandle = useFullScreenHandle();

    const handleOpenInvitation = () => {
        setIsAudioPlay(true)
        setIsCoverShow(false)
        setPageIndex(0)
        if (document.body.requestFullscreen) {
            document.body.requestFullscreen()
        }
    }

    switch (props.type) {
        case "div": return <div {...attributes} dangerouslySetInnerHTML={{ __html: content }}></div>;
            break;
        case "img": return <img {...attributes} />
            break;
        case "i": return <i {...attributes} dangerouslySetInnerHTML={{ __html: content }}></i>;
            break;
        case "open-invitation": return (<div {...attributes} className={`btn-primary ${attributes?.className}`} onClick={handleOpenInvitation}>{data?.data.button_title}</div>)
            break;
        case "wrapper": {
            return (
                <div {...attributes}>
                    {
                        blocks.map((block, key) => (
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
                        ))
                    }
                </div>
            )
        }
            break;
        case "countdown": return (<> {data?.is_enabled ? <Countdown data={data?.data} attributes={attributes} /> : null} </>)
            break;
        case "add_calendar": return (
            <>
                {data.is_enabled ?
                    <a href={data?.data.event_link} target="_blank" {...attributes} className={`add-calendar ${attributes?.className}`}>{data?.data.button_title}</a>
                    :
                    null
                }
            </>
        )
            break;
        case "maps_iframe": return (
            <>
                {data.is_enabled ?
                    <div {...attributes} className={`maps-iframe ${attributes?.className}`}>
                        <iframe
                            src={data.data.iframe_link}
                            width="100%"
                            height="100%"
                            allowFullScreen=""
                            loading="lazy"
                        ></iframe>
                    </div>
                    :
                    null
                }
            </>
        )
            break;
        case "maps_button": return (
            <>
                {
                    data.is_enabled ?
                        <a href={data?.data.maps_link} target="_blank" {...attributes} className={`maps-button ${attributes?.className}`}>Buka Lokasi</a>
                        :
                        null
                }
            </>
        )
            break;
        case "gift": return (<> {data?.is_enabled ? <div {...attributes} className={`btn-primary ${attributes?.className}`} onClick={() => setIsModalGiftShow(true)}>{data?.data.button_title}</div> : null} </>)
            break;
        case "ucapan": return (<> {data?.is_enabled ? <div {...attributes} className={`btn-primary ${attributes?.className}`} onClick={() => setIsModalUcapanShow(true)}>{data?.data.button_title}</div> : null} </>)
            break;
        case "rsvp": return (<> {data?.is_enabled ? <div {...attributes} className={`btn-primary ${attributes?.className}`} onClick={() => setIsModalRsvpShow(true)}>{data?.data.button_title}</div> : null} </>)
            break;
        case "invait_credit": return (
            <div {...attributes}>Made with <i className="heart fa-solid fa-heart" /> by <a className="invait" href="/">Invait</a></div>
        )
            break;
        default: return null;
    }
}