//import react  
import React, { useState, useRef, useEffect } from "react";

//import Head, usePage, Link
import { usePage } from '@inertiajs/inertia-react';

//import Inertia adapter
import { Inertia } from "@inertiajs/inertia";

//import Sweet Alert
import Swal from 'sweetalert2';

//import monaco editor
import Editor from '@monaco-editor/react';

//import react-select
import Select from 'react-select'
import AsyncSelect from 'react-select/async'
import InvitationContentForm from "../../../Components/InvitationContentForm";

import YAML from 'yaml'
import InvitationFeatureForm from "../../../Components/InvitationFeatureForm";
import { isClient } from "../../../Utils/Helpers";
import hasAnyPermission from "../../../Utils/Permissions";

export default function InvitationForm({
    header,
    isEdit
}) {
    //destruct props "invitations"
    const { url } = usePage();
    const { auth, errors, invitation, templates, custom_templates, client, reseller } = usePage().props;
    //console.log(JSON.parse(invitation.template))
    // console.log(usePage())

    //mapping template select options
    const templateOptions = templates?.map(item => ({ label: item.name, value: item.id }));


    //define states
    const [title, setTitle] = useState(isEdit ? invitation.title : '');
    const [slug, setSlug] = useState(isEdit ? invitation.slug : '');
    const [status, setStatus] = useState(isEdit ? invitation.status : 'draft');
    const [thumbnail, setThumbnail] = useState(isEdit ? invitation.thumbnail : '');
    const [excerpt, setExcerpt] = useState(isEdit ? invitation.excerpt : '');
    const [isCustomTemplate, setIsCustomTemplate] = useState(isEdit ? invitation.is_custom_template : false);
    const [isCustomCss, setIsCustomCss] = useState(isEdit ? invitation.is_custom_template : false);
    const [isCustomContent, setIsCustomContent] = useState(isEdit ? invitation.is_custom_template : false);
    const [customTemplate, setCustomTemplate] = useState(isEdit ? invitation.custom_template?.template : templates[0]?.template);
    const [customCss, setCustomCss] = useState(isEdit ? invitation.custom_template?.css : templates[0]?.css);
    const [customContent, setCustomContent] = useState(isEdit ? invitation.custom_template?.content : templates[0]?.content);
    const [templateId, setTemplateId] = useState(isEdit ? invitation.template_id : templateOptions[0]?.value);
    const [clientId, setClientId] = useState(isEdit ? invitation.client_id : '');
    const [clientUsername, setClientUsername] = useState(isEdit ? client?.username : '');
    const [resellerId, setResellerId] = useState(isEdit ? invitation.reseller_id : '');
    const [resellerUsername, setResellerUsername] = useState(isEdit ? reseller?.username : '');

    const [isYAMLEditor, setIsYAMLEditor] = useState(false);

    // console.log(customContent)

    useEffect(() => {
    }, [])

    // define methods for monaco editor
    function handleTemplateEditorChange(value, event) {
        setCustomTemplate(value)
    }
    function handleCssEditorChange(value, event) {
        setCustomCss(value)
    }
    function handleContentEditorChange(value, event) {
        setCustomContent(value)
    }

    //Reset functions
    const resetTemplate = () => {
        setCustomTemplate(templates.filter(item => item.id === templateId)[0].template)
    }
    const resetCss = () => {
        setCustomCss(templates.filter(item => item.id === templateId)[0].css)
    }
    const resetContent = () => {
        setCustomContent(templates.filter(item => item.id === templateId)[0].content)
    }
    const resetAll = () => {
        //show sweet alert
        Swal.fire({
            title: 'Are you sure?',
            text: "This will reset template, css, and content to its original template!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, reset it!'
        }).then((result) => {
            if (result.isConfirmed) {

                //set to original template
                setCustomTemplate(templates.filter(item => item.id === templateId)[0].template)
                setCustomCss(templates.filter(item => item.id === templateId)[0].css)
                setCustomContent(templates.filter(item => item.id === templateId)[0].content)

                Swal.fire({
                    title: 'Success!',
                    text: 'Data reset successfully!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }

    // handle select template change
    function handleTemplateChange(value) {
        setTemplateId(value.value)
        const newTemplate = templates.filter(item => item.id == value.value)[0]

        //logic
        //get custom_template untuk template terpilih
        const savedCustomTemplate = custom_templates ? custom_templates?.filter(item => item.template_id === value.value) : [];
        console.log(savedCustomTemplate)

        //jika belum punya custom_template untuk template terpilih,
        //maka template, css, dan content diambil dari newTemplate
        //jika sudah punya custom_template, maka diambil dari custom_template 
        if (savedCustomTemplate?.length === 0) {
            setCustomTemplate(newTemplate.template)
            setCustomCss(newTemplate.css)
            setCustomContent(newTemplate.content)
        } else if (savedCustomTemplate?.length != 0) {
            setCustomTemplate(savedCustomTemplate[0].template)
            setCustomCss(savedCustomTemplate[0].css)
            setCustomContent(savedCustomTemplate[0].content)
        }

    }

    //define promiseClientOptions for aync client list loading
    // const getClientList = (inputValue) => {

    //     return [
    //         { label: 'aku', value: 'kamu' },
    //         { label: 'dia', value: 'mereka' }
    //     ]
    // }
    // const promiseClientOptions = (inputValue) =>
    //     new Promise((resolve) => {
    //         setTimeout(() => {
    //             resolve(getClientList(inputValue));
    //         }, 1000);
    //     });


    //define store method
    const storeInvitation = async (e) => {
        e.preventDefault();

        //sending data
        Inertia.post('/account/invitations', {

            //data
            title,
            slug,
            status,
            thumbnail,
            excerpt,
            template_id: templateId,
            is_custom_template: isCustomTemplate,
            is_custom_css: isCustomCss,
            is_custom_content: isCustomContent,
            custom_template: customTemplate,
            custom_css: customCss,
            custom_content: customContent,
            user_id: auth.user.id,
            client_id: clientId,
            reseller_id: resellerId
        }, {
            onSuccess: () => {

                //show alert
                Swal.fire({
                    title: 'Success!',
                    text: 'Data saved successfully!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        });
    }

    //define update method
    const updateInvitation = async (e) => {
        e.preventDefault();

        //sending data
        Inertia.put(`/account/invitations/${invitation.id}`, {

            //data
            title,
            slug,
            status,
            thumbnail,
            excerpt,
            template_id: templateId,
            is_custom_template: isCustomTemplate,
            is_custom_css: isCustomCss,
            is_custom_content: isCustomContent,
            custom_template: customTemplate,
            custom_css: customCss,
            custom_content: customContent,
            user_id: auth.user.id,
            client_id: clientId,
            reseller_id: resellerId
        }, {
            onSuccess: () => {
                Inertia.visit(url,{},{preserveState: true})

                //show alert
                Swal.fire({
                    title: 'Success!',
                    text: 'Data saved successfully!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        });
    }

    //define update method
    const updateInvitationContent = async (e) => {
        e.preventDefault();

        //sending data
        Inertia.put(`/account/invitations/${invitation.id}`, {

            //data
            ...invitation,
            custom_content: customContent,
        }, {
            onSuccess: () => {

                //show alert
                Swal.fire({
                    title: 'Success!',
                    text: 'Data saved successfully!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        });
    }


    return (
        <div className="row mt-4">
            <div className="col-12">
                <div className="card border-0 shadow-sm border-top-success">
                    <div className="card-header">
                        <span className="font-weight-bold"> {header}</span>
                    </div>
                    <div className="card-body">
                        <form onSubmit={isEdit ? updateInvitation : storeInvitation}>
                            {hasAnyPermission(['invitations.change-reseller']) &&
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Reseller</label>
                                    <input type="text" className="form-control" value={resellerId} onChange={(e) => setResellerId(e.target.value)} placeholder="Reseller Id" />
                                    <input type="text" className="form-control mt-2" value={resellerUsername} onChange={(e) => setResellerUsername(e.target.value)} placeholder="Reseller Username" />
                                </div>
                            }
                            {hasAnyPermission(['invitations.change-client']) &&
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Client</label>
                                    <input type="text" className="form-control" value={clientId} onChange={(e) => setClientId(e.target.value)} placeholder="Client Id" />
                                    <input type="text" className="form-control mt-2" value={clientUsername} onChange={(e) => setClientUsername(e.target.value)} placeholder="Client Username" />
                                </div>
                            }
                            {errors.title && (
                                <div className="alert alert-danger">
                                    {errors.title}
                                </div>
                            )}
                            <div className="mb-3">
                                <label className="form-label fw-bold">Title</label>
                                <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter Title" />
                            </div>
                            {errors.title && (
                                <div className="alert alert-danger">
                                    {errors.title}
                                </div>
                            )}
                            <div className="mb-3">
                                <label className="fw-bold">Slug</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value)}
                                    placeholder="Enter Slug"
                                    disabled={!hasAnyPermission(['invitations.change-slug'])}

                                />
                            </div>
                            {errors.slug && (
                                <div className="alert alert-danger">
                                    {errors.slug}
                                </div>
                            )}
                            <div className="mb-3">
                                <label className="fw-bold">Status</label>
                                <select
                                    className="form-select"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    disabled={!hasAnyPermission(['invitations.change-status'])}
                                >
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                    <option value="expired">Expired</option>
                                </select>
                            </div>
                            {errors.status && (
                                <div className="alert alert-danger">
                                    {errors.status}
                                </div>
                            )}
                            <div className="mb-3">
                                <label className="fw-bold">Thumbnail</label>
                                <input type="text" className="form-control" value={thumbnail} onChange={(e) => setThumbnail(e.target.value)} placeholder="Enter Thumbnail" />
                            </div>
                            {errors.thumbnail && (
                                <div className="alert alert-danger">
                                    {errors.thumbnail}
                                </div>
                            )}
                            <div className="mb-3">
                                <label className="fw-bold">Excerpt</label>
                                <textarea type="text" className="form-control" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Enter Excerpt" />
                            </div>
                            {errors.excerpt && (
                                <div className="alert alert-danger">
                                    {errors.excerpt}
                                </div>
                            )}
                            {!hasAnyPermission(['invitations.change-template']) ?
                                <div className="mb-3">
                                    <label className="fw-bold">Select Template</label>
                                    <select
                                        className="form-select"
                                        defaultValue={templateOptions.filter(item => item.value === invitation.template_id)[0].label}
                                        disabled={!hasAnyPermission(['invitations.change-template'])}
                                    >
                                        <option>{templateOptions.filter(item => item.value === invitation.template_id)[0].label}</option>
                                    </select>
                                </div>
                                :
                                <div className="mb-3">
                                    <label className="fw-bold">Select Template</label>
                                    <Select
                                        className="basic-single"
                                        classNamePrefix="select"
                                        defaultValue={templateOptions[0]}
                                        value={templateOptions.filter(item => item.value == templateId)}
                                        isSearchable={true}
                                        name="template"
                                        options={templateOptions}
                                        onChange={value => handleTemplateChange(value)}
                                    />
                                </div>
                            }
                            {errors.template_id && (
                                <div className="alert alert-danger">
                                    {errors.template_id}
                                </div>
                            )}
                            {['admin', 'operator'].filter(item => item === auth.user.roles[0].name).length > 0 ?
                                <div className="d-flex">
                                    <div className="form-check form-switch mb-3">
                                        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" checked={isYAMLEditor} onChange={e => setIsYAMLEditor(e.target.checked)} />
                                        <label className="form-check-label" for="flexSwitchCheckDefault">Switch to YAML Editor</label>
                                    </div>
                                </div>
                                :
                                null
                            }
                            {isYAMLEditor &&
                                <>

                                    <div className="mb-3">
                                        <div className="d-flex align-items-center mb-2">
                                            <label className="fw-bold">Invitation Content</label>
                                            <div className="btn btn-sm btn-success" style={{ marginLeft: "12px" }} onClick={resetContent}>Reset</div>
                                        </div>
                                        <Editor
                                            height="300px"
                                            defaultLanguage="yaml"
                                            value={customContent}
                                            theme="vs-dark"
                                            onChange={handleContentEditorChange}
                                        />
                                    </div>
                                    <div className="d-flex">
                                        <div className="form-check form-switch mb-3">
                                            <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" checked={isCustomTemplate} onChange={e => setIsCustomTemplate(e.target.checked)} />
                                            <label className="form-check-label" for="flexSwitchCheckDefault">Enable Custom Template</label>
                                        </div>
                                    </div>
                                    {
                                        isCustomTemplate == true &&
                                        <div className="mb-3">
                                            <div className="d-flex align-items-center mb-2">
                                                <label className="fw-bold">Custom Template</label>
                                                <div className="btn btn-sm btn-success" style={{ marginLeft: "12px" }} onClick={resetTemplate}>Reset</div>
                                            </div>
                                            <Editor
                                                height="300px"
                                                defaultLanguage="yaml"
                                                value={customTemplate}
                                                theme="vs-dark"
                                                onChange={handleTemplateEditorChange}
                                            />
                                        </div>
                                    }
                                    {errors.custom_template && (
                                        <div className="alert alert-danger">
                                            {errors.custom_template}
                                        </div>
                                    )}
                                    {
                                        isCustomTemplate == true &&
                                        <div className="mb-3">
                                            <div className="d-flex align-items-center mb-2">
                                                <label className="fw-bold">Custom CSS</label>
                                                <div className="btn btn-sm btn-success" style={{ marginLeft: "12px" }} onClick={resetCss}>Reset</div>
                                            </div>
                                            <Editor
                                                height="300px"
                                                defaultLanguage="css"
                                                value={customCss}
                                                theme="vs-dark"
                                                onChange={handleCssEditorChange}
                                            />
                                        </div>
                                    }
                                    {errors.custom_css && (
                                        <div className="alert alert-danger">
                                            {errors.custom_css}
                                        </div>
                                    )}
                                </>
                            }
                            {!isYAMLEditor &&
                                <div className="card">
                                    <div className="card-header">
                                        <div className="fw-bold">Invitation Content</div>
                                    </div>
                                    <div className="card-body">
                                        <InvitationContentForm data={YAML.parse(customContent)} setData={setCustomContent} />
                                    </div>
                                </div>
                            }
                            {!isYAMLEditor &&
                                <div className="card mt-4">
                                    <div className="card-header">
                                        <div className="fw-bold">Invitation Features</div>
                                    </div>
                                    <div className="card-body">
                                        <InvitationFeatureForm data={YAML.parse(customContent)} setData={setCustomContent} />
                                    </div>
                                </div>
                            }
                            <div className="position-fixed d-flex" style={{ top: "70px", right: "20px" }}>
                                <button type="submit" className="btn btn-md btn-success me-2"><i className="fa fa-save"></i> {isEdit ? "Update" : "Save"}</button>
                                {/* <div onClick={resetAll} className="btn" style={{ background: "#c9c9c9" }}><i className="fa fa-rotate-right"></i>Reset All</div> */}
                            </div>

                        </form>
                    </div>


                </div>
            </div>
        </div>

    )
}