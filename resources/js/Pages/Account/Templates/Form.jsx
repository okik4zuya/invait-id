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

import YAML from 'yaml'


export default function TemplateForm({
    header,
    isEdit
}) {
    //destruct props "invitations"
    const { auth, errors, template: templateItem, template_categories } = usePage().props;
    //console.log(master_template)
    //console.log(JSON.parse(invitation.template))
    //console.log(usePage().props)
    //console.log(YAML.parse(templateItem.content))
    //console.log(templateItem.content)

    //mapping template category select options
    const templateCategoryOptions = template_categories.map(item => ({ label: item.name, value: item.id }));

    //define states
    const [name, setName] = useState(isEdit ? templateItem.name : '');
    const [templateCategoryIdArray, setTemplateCategoryIdArray] = useState(isEdit ? templateItem.template_category.map(item=>item.id) : [template_categories[0]?.id]);
    const [templateCategory, setTemplateCategory] = useState(isEdit ? templateItem.template_category.map(item=>({label: item.name, value: item.id})) : [templateCategoryOptions[0]]);
    const [previewSlug, setPreviewSlug] = useState(isEdit ? templateItem.preview_slug : '');
    const [thumbnail, setThumbnail] = useState(isEdit ? templateItem.thumbnail : '');
    const [template, setTemplate] = useState(isEdit ? templateItem.template : '');
    const [css, setCss] = useState(isEdit ? templateItem.css : '');
    const [content, setContent] = useState(isEdit ? templateItem.content : '');


    // define methods for monaco editor
    function handleTemplateEditorChange(value, event) {
        setTemplate(value)
    }
    function handleContentEditorChange(value, event) {
        setContent(value)
    }
    function handleCssEditorChange(value, event) {
        setCss(value)
    }

    // handle select template category change
    function handleTemplateCategoryChange(value) {
        setTemplateCategory(value)
        setTemplateCategoryIdArray(value.map(item=>item.value))
        console.log(value.map(item=>item.value))
    }


    //define store method
    const storeTemplate = async (e) => {
        e.preventDefault();

        //sending data
        Inertia.post('/account/templates', {

            //data
            name,
            thumbnail,
            preview_slug: previewSlug,
            template_category: templateCategoryIdArray,
            user_id: auth.user.id,
            template,
            css,
            content,
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
    const updateTemplate = async (e) => {
        e.preventDefault();

        //sending data
        Inertia.put(`/account/templates/${templateItem.id}`, {

            //data
            name,
            thumbnail,
            preview_slug: previewSlug,
            template_category: templateCategoryIdArray,
            user_id: auth.user.id,
            template,
            css,
            content,
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
                <div className="card border-0 rounded shadow-sm border-top-success">
                    <div className="card-header">
                        <span className="font-weight-bold"><i className="fa fa-shield-alt"></i> {header}</span>
                    </div>
                    <div className="card-body">
                        <form onSubmit={isEdit ? updateTemplate : storeTemplate}>
                            <div className="mb-3">
                                <label className="form-label fw-bold">Name</label>
                                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Name" />
                            </div>
                            {errors.name && (
                                <div className="alert alert-danger">
                                    {errors.name}
                                </div>
                            )}
                            <div className="mb-3">
                                <label className="fw-bold">Select Template Category</label>
                                <Select
                                    closeMenuOnSelect={false}
                                    defaultValue={templateCategory}
                                    value={templateCategory}
                                    isMulti
                                    isSearchable={true}
                                    options={templateCategoryOptions}
                                    onChange={value => handleTemplateCategoryChange(value)}
                                />
                                {/* <Select
                                    className="basic-single"
                                    classNamePrefix="select"
                                    defaultValue={templateCategoryOptions[0]}
                                    value={templateCategoryOptions.filter(item => item.value == templateCategoryId)}
                                    isSearchable={true}
                                    name="template"
                                    options={templateCategoryOptions}
                                    onChange={value => handleTemplateCategoryChange(value)}
                                /> */}
                            </div>
                            {errors.template_id && (
                                <div className="alert alert-danger">
                                    {errors.template_id}
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
                                <label className="fw-bold">Preview Slug</label>
                                <input type="text" className="form-control" value={previewSlug} onChange={(e) => setPreviewSlug(e.target.value)} placeholder="Enter Preview Slug" />
                            </div>
                            {errors.preview_slug && (
                                <div className="alert alert-danger">
                                    {errors.preview_slug}
                                </div>
                            )}
                            <div className="mb-3">
                                <label className="fw-bold">Template</label>
                                <Editor
                                    height="300px"
                                    defaultLanguage="yaml"
                                    value={template}
                                    theme="vs-dark"
                                    showFoldingControls={true}
                                    onChange={handleTemplateEditorChange}
                                />
                            </div>
                            {errors.template && (
                                <div className="alert alert-danger">
                                    {errors.template}
                                </div>
                            )}
                            <div className="mb-3">
                                <label className="fw-bold">CSS</label>
                                <Editor
                                    height="300px"
                                    defaultLanguage="css"
                                    value={css}
                                    theme="vs-dark"
                                    onChange={handleCssEditorChange}
                                />
                            </div>
                            {errors.template && (
                                <div className="alert alert-danger">
                                    {errors.template}
                                </div>
                            )}
                            <div className="mb-3">
                                <label className="fw-bold">Content</label>
                                <Editor
                                    height="300px"
                                    defaultLanguage="yaml"
                                    value={content}
                                    theme="vs-dark"
                                    onChange={handleContentEditorChange}
                                />
                            </div>
                            {errors.content && (
                                <div className="alert alert-danger">
                                    {errors.content}
                                </div>
                            )}
                            <div className="position-fixed" style={{ top: "70px", right: "20px" }}>
                                <button type="submit" className="btn btn-md btn-success me-2"><i className="fa fa-save"></i> {isEdit ? "Update" : "Save"}</button>
                            </div>

                        </form>
                    </div>

                </div>
            </div>
        </div>

    )
}