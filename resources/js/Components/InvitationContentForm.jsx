import React from 'react'
import { useState } from 'react';
import { slugify, makeTitle } from '../Utils/Helpers'
import YAML from 'yaml'

export default function InvitationContentForm({ data, setData }) {

    //define states
    const [activeTab, setActivetab] = useState(data.pages[0].page_title)



    //render inputs
    const inputsToRender = (page) => {
        let inputToRender = [];
        for (const key in page) {
            if (key !== 'page' || key !== 'page_title') {
                inputToRender.push(
                    {
                        key: key,
                        value: page[key]
                    }
                )
            }


        }
        return inputToRender.filter(item => item.key !== 'page').filter(item => item.key !== 'page_title')
    }

    //define handleInputChange method
    const handleInputChange = (pageIndex, key, e) => {
        let newData = data;
        newData.pages[pageIndex][key] = e.target.value

        setData(YAML.stringify(
            {
                ...newData,
                pages: [...newData.pages
                    .map(page => ({ ...page }))
                    .filter(item => item.page !== pageIndex),
                ...newData.pages
                    .filter(item => item.page === pageIndex)
                    .map(page => (
                        { ...page }
                    ))
                ].sort((b, a) => b.page - a.page)
            }
        )
        )
    }
    return (
        <div className=''>
            <ul className="nav nav-pills" id="pills-tab" role="tablist">
                {data.pages.map((page, key) => (
                    <li key={key} className="nav-item">
                        <a
                            className={`nav-link ${activeTab === page.page_title && 'active'}`}
                            id={`pills-${slugify(page.page_title)}-tab`}
                            type="button"
                            onClick={() => setActivetab(page.page_title)}
                        >{page.page_title}</a>
                    </li>
                ))}
            </ul>
            <div className="tab-content">
                {data.pages.map((page, pageKey) => (
                    <div
                        key={pageKey}
                        className={`tab-pane fade ${activeTab === page.page_title && 'active show'} pe-3 ps-3`}
                        id={`pills-${slugify(page.page_title)}`}
                        role="tabpanel"
                        aria-labelledby={`pills-${slugify(page.page_title)}-tab`}
                    >
                        {inputsToRender(page).map((input, key) => (
                            <div key={key} className='mb-3 mt-3'>
                                <div className='fw-bold'>
                                    {makeTitle(input.key)}
                                </div>
                                {data.pages[pageKey][input.key].length < 20 ?

                                    <input
                                        className='form-control'
                                        value={data.pages[pageKey][input.key]}
                                        onChange={(e) => handleInputChange(pageKey, input.key, e)}
                                    />
                                    :
                                    <textarea
                                        className='form-control'
                                        value={data.pages[pageKey][input.key]}
                                        onChange={(e) => handleInputChange(pageKey, input.key, e)}
                                        rows={3}
                                    />
                                }
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}