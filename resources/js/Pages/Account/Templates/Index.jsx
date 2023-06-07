
//import react  
import React from "react";

//import layout
import LayoutAccount from '../../../Layouts/Account';

//import Head, usePage, Link
import { Head, usePage, Link } from '@inertiajs/inertia-react';

//import permissions
import hasAnyPermission from '../../../Utils/Permissions';

//import component search
import Search from '../../../Shared/Search';

//import component pagination
import Pagination from '../../../Shared/Pagination';

//import component delete 
import Delete from '../../../Shared/Delete';

import './index.css'
import Clone from "../../../Shared/Clone";

export default function TemplateIndex() {
    //Debugging
    // console.log(usePage().props);

    //destruct props "invitations"
    const { templates } = usePage().props;
    console.log(templates)

    return (
        <>
            <Head>
                <title>Templates - Invait</title>
            </Head>
            <LayoutAccount>
                <div className="row mt-5">
                    <div className="col-md-8">
                        <div className="row">
                            <div className="col-md-3 col-12 mb-2">
                                <Link href="/account/templates/create" className="btn btn-md btn-success border-0 shadow w-100" type="button">
                                    <i className="fa fa-plus-circle me-2"></i>
                                    Add
                                </Link>
                            </div>
                            <div className="col-md-9 col-12 mb-2">

                                <Search URL={'/account/templates'} />

                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-2 mb-4">
                    <div className="col-12">
                        <div className="card border-0 rounded">
                            <div className="card-header">
                                <span className="font-weight-bold"><i className="fa fa-shield-alt"></i> Templates</span>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-bordered table-striped table-hovered">
                                        <thead>
                                            <tr>
                                                <th scope="col" style={{ width: '5%' }}>No.</th>
                                                <th scope="col" style={{ width: '15%' }}>Name</th>
                                                <th scope="col" style={{ width: '20%' }}>Category</th>
                                                <th scope="col" style={{ width: '15%' }}>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {templates.data.map((template, index) => (
                                                <tr key={index}>
                                                    <td className="text-center">{++index + (templates.current_page - 1) * templates.per_page}</td>
                                                    <td>{template.name}</td>
                                                    <td>
                                                        <div className="category-field">

                                                            {template.template_category.map((item, key) => (
                                                                <div className="category-pill">{item.name}</div>
                                                            ))}
                                                        </div>
                                                    </td>
                                                    <td className="text-center">
                                                        {hasAnyPermission(['templates.edit']) &&
                                                            <Link href={`/account/templates/${template.id}/edit`} className="btn btn-success btn-sm me-2"><i className="fa fa-pencil-alt"></i></Link>
                                                        }
                                                        {hasAnyPermission(['templates.clone']) &&
                                                            <span style={{margin:"0 8px 0 0"}}><Clone URL={'/account/templates/clone'} id={template.id} /></span>
                                                        }
                                                        {hasAnyPermission(['templates.delete']) &&
                                                            <Delete URL={'/account/templates'} id={template.id} />
                                                        }
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <Pagination links={templates.links} align={'end'} />

                            </div>
                        </div>
                    </div>
                </div>
            </LayoutAccount>
        </>
    )

}