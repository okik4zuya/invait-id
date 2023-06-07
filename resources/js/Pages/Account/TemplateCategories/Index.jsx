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

export default function RoleIndex() {

    //destruct props "roles"
    const { template_categories } = usePage().props;

    return (
        <>
            <Head>
                <title>Template Category - Invait</title>
            </Head>
            <LayoutAccount>
                <div class="row mt-5">
                    <div class="col-md-8">
                        <div class="row">
                            <div class="col-md-3 col-12 mb-2">
                                <Link href="/account/template-categories/create" class="btn btn-md btn-success border-0 shadow w-100" type="button">
                                    <i class="fa fa-plus-circle me-2"></i>
                                    Add
                                </Link>
                            </div>
                            <div class="col-md-9 col-12 mb-2">

                                <Search URL={'/account/template-categories'} />

                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-2 mb-4">
                    <div className="col-12">
                        <div className="card border-0 rounded shadow-sm border-top-success">
                            <div className="card-header">
                                <span className="font-weight-bold"><i className="fa fa-shield-alt"></i> Template Categories</span>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-bordered table-striped table-hovered">
                                        <thead>
                                            <tr>
                                                <th scope="col" style={{ width: '5%' }}>No.</th>
                                                <th scope="col" style={{ width: '15%' }}>Name</th>
                                                <th scope="col" style={{ width: '15%' }}>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {template_categories.data.map((item, index) => (
                                                <tr key={index}>
                                                    <td className="text-center">{++index + (template_categories.current_page - 1) * template_categories.per_page}</td>
                                                    <td>{item.name}</td>
                                                    <td className="text-center">
                                                        {hasAnyPermission(['template-categories.edit']) &&
                                                            <Link href={`/account/template-categories/${item.id}/edit`} className="btn btn-primary btn-sm me-2"><i className="fa fa-pencil-alt"></i></Link>
                                                        }
                                                        {hasAnyPermission(['template-categories.delete']) &&
                                                            <Delete URL={'/account/template-categories'} id={item.id} />
                                                        }
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <Pagination links={template_categories.links} align={'end'} />

                            </div>
                        </div>
                    </div>
                </div>
            </LayoutAccount>
        </>
    )

}