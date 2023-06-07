//import react  
import React, { useState, useRef, useEffect } from "react";

//import Head, usePage, Link
import { usePage } from '@inertiajs/inertia-react';

//import Inertia adapter
import { Inertia } from "@inertiajs/inertia";

//import Sweet Alert
import Swal from 'sweetalert2';

export default function TemplateCategoryForm({
    header,
    isEdit
}) {
    //destruct props "invitations"
    const { auth, errors, template_category } = usePage().props;

    //define states
    const [name, setName] = useState(isEdit ? template_category.name : '');


    //define store method
    const storeTemplateCategory = async (e) => {
        e.preventDefault();

        //sending data
        Inertia.post('/account/template-categories', {

            //data
            name,
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
    const updateTemplateCategory = async (e) => {
        e.preventDefault();

        //sending data
        Inertia.put(`/account/template-categories/${template_category.id}`, {

            //data
            name,
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
                        <form onSubmit={isEdit ? updateTemplateCategory : storeTemplateCategory}>
                            <div className="mb-3">
                                <label className="form-label fw-bold">Name</label>
                                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Name" />
                            </div>
                            {errors.name && (
                                <div className="alert alert-danger">
                                    {errors.name}
                                </div>
                            )}
                            <div>
                                <button type="submit" className="btn btn-md btn-success me-2"><i className="fa fa-save"></i> {isEdit ? "Update" : "Save"}</button>
                            </div>

                        </form>
                    </div>

                </div>
            </div>
        </div>

    )
}