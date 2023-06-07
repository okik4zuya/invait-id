import React, { useState } from 'react'
import WebLayout from '../../../Layouts/Web'
import { Link, usePage } from '@inertiajs/inertia-react'
import './index.css'
import { useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { template } from 'lodash';
import Modal from '../Invitations/Components/Modal';

export default function TemaIndex() {
    const { templates, template_categories, templates_count } = usePage().props;
    const { url } = usePage()

    console.log(usePage().props)

    //define states
    const [fetchedTemplates, setFetchedTemplates] = useState(templates.data);
    const [modalTemaShow, setModalTemaShow] = useState(false);


    //define paginationToRender
    const paginationToRender = () => {
        return [
            templates.links[0],
            templates.links[templates.current_page],
            templates.links[templates.links.length - 1]
        ]
    }
    console.log(paginationToRender())



    //define urlParam
    const q = window.location.search
    const urlParams = new URLSearchParams(q)

    //define loadMore function
    const loadMore = () => {
        Inertia.visit(`/tema?page=${templates.current_page + 1}`, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: (response) => {
                setFetchedTemplates([...fetchedTemplates, ...response.props.templates.data])
            }
        })
    }
    useEffect(() => {
        //Geser category filter slider sesuai dengan posisinya
        const categoryActiveRect = document.querySelector('.category--mobile.active').getBoundingClientRect();
        const temaCategoriesMobileEl = document.querySelector('.tema-categories--mobile');
        temaCategoriesMobileEl.scrollTo(categoryActiveRect.x - 112, 0)
    }, [])


    return (
        <WebLayout>
            <div className='tema-container'>
                <div className='sidebar' style={{ color: 'white' }}>
                    <div className='sidebar__title mb-3'>Kategori Tema</div>
                    <div
                        className={`category ${!urlParams?.get('category') && 'category--glass'}`}
                    >
                        <Link
                            href={`/tema?category=`}
                        >
                            Semua ({templates_count})
                        </Link>
                    </div>
                    {template_categories.sort((a,b)=>(b.template_count-a.template_count)).map((item, key) => (
                        <div
                            className={`category ${urlParams?.get('category') === item.name && 'category--glass'}`}
                        >
                            <Link
                                href={`/tema?category=${item.name}`} key={key}
                            >
                                {item.name} ({item.template_count})
                            </Link>
                        </div>
                    ))}
                </div>
                <div className='tema-list-container'>
                    <div className='tema-categories__title'>Kategori Tema</div>
                    <div className='tema-categories--mobile'>
                        <div
                            className={`category--mobile ${!urlParams?.get('category') && 'active category--glass'}`}
                        >
                            <Link
                                href={`/tema?category=`}
                            >
                                Semua ({templates_count})
                            </Link>
                        </div>
                        {template_categories.map((item, key) => (
                            <div
                                className={`category--mobile ${urlParams?.get('category') === item.name && 'active category--glass'}`}
                            >
                                <Link
                                    href={`/tema?category=${item.name}`} key={key}
                                >
                                    {item.name} ({item.template_count})
                                </Link>
                            </div>

                        ))}

                    </div>
                    <div className='tema-list'>
                        {templates.data.map((item, key) => (
                            <div className='tema__item'>
                                <div className='glass-card tema__title'>{item.name}</div>
                                <div className='tema__thumbnail' onClick={()=>Inertia.visit(`/i/${item.preview_slug}`)}>
                                    <img src={item.thumbnail} />
                                </div>
                                

                            </div>
                        ))}
                    </div>
                    <nav className='tema__pagination'>
                        <ul className={`mb-0`}>
                            {paginationToRender().map((link, index) => (
                                <li
                                    className={`${index === 1 && 'middle'} ${link.url == null ? 'disabled' : ''} ${link.active ? 'active' : ''}`} key={index}>
                                    <Link
                                        className=""
                                        href={link.url === null ? '#' : index === 1 ? '#' : link.url}
                                        dangerouslySetInnerHTML={{ __html: index === 0 ? "\<i class='bx bx-chevron-left' \>" : index === paginationToRender().length - 1 ? "\<i class='bx bx-chevron-right' \>" : `${link.label} of ${templates.last_page}` }}
                                    ></Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </WebLayout>
    )
}