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
import Clone from "../../../Shared/Clone";

export default function InvitationIndex() {
    //Debugging
    //console.log(usePage());

    //destruct props "invitations"
    const { invitations, auth } = usePage().props;
    // console.log(invitations)
    //define url params
    const q = window.location.search
    const urlParams = new URLSearchParams(q)

    return (
        <>
            <Head>
                <title>Invitations - Invait</title>
            </Head>
            <LayoutAccount>
                <div className="row mt-5">
                    <div className="col-md-8">
                        <div className="row">
                            <div className="col-md-3 col-12 mb-2">
                                <Link href="/account/invitations/create" className="btn btn-md btn-success border-0 shadow w-100" type="button">
                                    <i className="fa fa-plus-circle me-2"></i>
                                    Add
                                </Link>
                            </div>
                            <div className="col-md-9 col-12 mb-2">

                                <Search URL={'/account/invitations'} />

                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-2 mb-4">
                    <div className="col-12">
                        <div className="card border-0">
                            <div className="card-header">
                                <span className="font-weight-bold">Invitations</span>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-bordered table-striped table-hovered">
                                        <thead>
                                            <tr>
                                                <th scope="col" style={{ width: '5%' }}>No.</th>
                                                <th scope="col" style={{ width: '15%' }}>Title</th>
                                                <th scope="col" style={{ width: '15%' }}>Slug</th>
                                                {auth.user.roles[0].name === 'admin' &&
                                                    <th scope="col" style={{ width: '15%' }}>User</th>
                                                }
                                                {auth.user.roles[0].name === 'admin' &&
                                                    <th scope="col" style={{ width: '15%' }}>Client</th>
                                                }
                                                {auth.user.roles[0].name === 'admin' &&
                                                    <th scope="col" style={{ width: '15%' }}>Reseller</th>
                                                }
                                                <th scope="col" style={{ width: '15%' }}>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {invitations.data.map((invitation, index) => (
                                                <tr key={index}>
                                                    <td className="text-center">{++index + (invitations.current_page - 1) * invitations.per_page}</td>
                                                    <td>{invitation.title}</td>
                                                    <td>/{invitation.slug}</td>
                                                    {auth.user.roles[0].name === 'admin' &&
                                                        <td>{invitation.user.name}</td>
                                                    }
                                                    {auth.user.roles[0].name === 'admin' &&
                                                        <td>{invitation.client?.username}</td>
                                                    }
                                                    {auth.user.roles[0].name === 'admin' &&
                                                        <td>{invitation.reseller?.username}</td>
                                                    }
                                                    <td className="text-center d-flex h-100">
                                                        <a href={`/i/${invitation.slug}`} target="_blank" className="btn btn-success btn-sm me-2"><i className="fa fa-eye"></i></a>
                                                        {hasAnyPermission(['invitations.edit']) &&
                                                            <Link href={`/account/invitations/${invitation.id}/edit`} className="btn btn-success btn-sm me-2"><i className="fa fa-pencil-alt"></i></Link>
                                                        }
                                                        {hasAnyPermission(['invitations.delete']) &&
                                                            <Delete URL={'/account/invitations'} id={invitation.id} />
                                                        }
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <Pagination links={invitations.links} align={'end'} />

                            </div>
                        </div>
                    </div>
                </div>
            </LayoutAccount>
        </>
    )

}