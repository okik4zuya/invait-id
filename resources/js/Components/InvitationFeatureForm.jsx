import React from 'react'
import { useState } from 'react';
import { slugify, makeTitle, toArray } from '../Utils/Helpers'
import YAML from 'yaml'
import { usePage } from '@inertiajs/inertia-react';
import hasAnyPermission from '../Utils/Permissions';
import { Editor } from '@monaco-editor/react';

export default function InvitationFeatureForm({ data, setData }) {

    //convert feature object to array
    const features = toArray(data.features)


    //define states
    const [activeTab, setActivetab] = useState(data.pages[0].page_title)
    const [activeFeatureTab, setActiveFeatureTab] = useState(toArray(data.features)[0].key)


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

    //renderInputs dynamically


    //define handleInputChange method
    const handleFeatureChange = (key1, key2, e) => {
        let newData = data;
        newData.features[key1].data[key2] = e.target.value

        setData(YAML.stringify(newData))
    }
    // const handleEnableFeature = (key, e) => {
    //     let newData = data;
    //     //newData.features[key].is_enabled = e.target.checked

    //     setData(YAML.stringify(updatedData))
    // }
    const handleFeatureEditorChange = (key1, key2, value) => {
        let newData = data;
        newData.features[key1].data[key2] = YAML.parse(value)
        setData(YAML.stringify(newData))

    }
    console.log(data.features['gift'].data.accounts)
    return (
        <div className=''>
            <ul className="nav nav-pills" id="pills-tab" role="tablist">
                {features.map((feature, index) => (
                    <>
                        {feature.value.is_enabled === true &&
                            <li key={index} className="nav-item">
                                <a
                                    className={`nav-link ${activeFeatureTab === feature.key && 'active'}`}
                                    id={`pills-${slugify(feature.key)}-tab`}
                                    type="button"
                                    onClick={() => setActiveFeatureTab(feature.key)}
                                >{makeTitle(feature.key)}</a>
                            </li>
                        }
                    </>
                ))}
            </ul>
            <div className="tab-content">
                {features.map((feature, pageIndex) => (
                    <div
                        key={pageIndex}
                        className={`tab-pane fade ${activeFeatureTab === feature.key && 'active show'} pe-3 ps-3`}
                        id={`pills-${slugify(feature.key)}`}
                        role="tabpanel"
                        aria-labelledby={`pills-${slugify(feature.key)}-tab`}
                    >
                        {/* {hasAnyPermission(['invitations.enable-feature']) &&

                            <div className="form-check form-switch mb-3">
                                <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" checked={data.features[feature.key].is_enabled} onChange={(e)=>handleEnableFeature(feature.key, e)} />
                                <label className="form-check-label" for="flexSwitchCheckDefault">Enable {makeTitle(feature.key)}</label>
                            </div>
                        } */}
                        {toArray(feature.value.data).map((input, index) => (
                            <div key={index} className='mb-3 mt-3'>
                                <div className='fw-bold'>
                                    {makeTitle(input.key)}
                                </div>
                                {typeof toArray(feature.value.data)[index].value === 'string' ?
                                    <>

                                        {toArray(feature.value.data)[index].value.length < 20 ?

                                            <input
                                                className='form-control'
                                                value={data.features[feature.key].data[input.key]}
                                                onChange={(e) => handleFeatureChange(feature.key, input.key, e)}
                                            />
                                            :
                                            <textarea
                                                className='form-control'
                                                value={data.features[feature.key].data[input.key]}
                                                onChange={(e) => handleFeatureChange(feature.key, input.key, e)}
                                                rows={3}
                                            />
                                        }
                                    </>
                                    :
                                    typeof toArray(feature.value.data)[index].value === 'object' ?
                                        <Editor
                                            height="300px"
                                            defaultLanguage="yaml"
                                            value={YAML.stringify(data.features[feature.key].data[input.key])}
                                            theme="vs-dark"
                                            onChange={(value) => handleFeatureEditorChange(feature.key, input.key, value)}

                                        />
                                        :
                                        null
                                }
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}