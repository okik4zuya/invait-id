//import React
import React from "react";

//import permissions
import hasAnyPermission from '../Utils/Permissions';

//import Link and usePage
import { Link, usePage } from '@inertiajs/inertia-react';
import { Inertia } from "@inertiajs/inertia";

export default function Sidebar() {

    //destruct URL from props
    const { url } = usePage()
    const roleName = usePage().props.auth.user.roles[0].name;

    return (
        <>
            <div className="list-group list-group-flush">
                {hasAnyPermission(['dashboard.index']) &&
                    <Link href="/account/dashboard" className={`${url.startsWith('/account/dashboard') ? "active list-group-item list-group-item-action list-group-item-light p-3" : "list-group-item list-group-item-action list-group-item-light p-3"}`}><i className="fa fa-tachometer-alt me-2"></i> Dashboard</Link>
                }
                {hasAnyPermission(['invitations.index']) &&
                    <Link href="/account/invitations" className={`${url.startsWith('/account/invitations') ? "active list-group-item list-group-item-action list-group-item-light p-3" : "list-group-item list-group-item-action list-group-item-light p-3"}`}><i className="fa fa-envelope me-2"></i> Invitations</Link>
                }
                {hasAnyPermission(['templates.index']) &&
                    <Link href="/account/templates" className={`${url.startsWith('/account/templates') ? "active list-group-item list-group-item-action list-group-item-light p-3" : "list-group-item list-group-item-action list-group-item-light p-3"}`}><i className="fa fa-book me-2"></i> Templates</Link>
                }
                {hasAnyPermission(['template-categories.index']) &&
                    <Link href="/account/template-categories" className={`${url.startsWith('/account/template-categories') ? "active list-group-item list-group-item-action list-group-item-light p-3" : "list-group-item list-group-item-action list-group-item-light p-3"}`}><i className="fa fa-book me-2"></i> Template Categories</Link>
                }
                {hasAnyPermission(['roles.index']) &&
                    <Link href="/account/roles" className={`${url.startsWith('/account/roles') ? "active list-group-item list-group-item-action list-group-item-light p-3" : "list-group-item list-group-item-action list-group-item-light p-3"}`}><i className="fa fa-shield-alt me-2"></i> Roles</Link>
                }
                {hasAnyPermission(['permissions.index']) &&
                    <Link href="/account/permissions" className={`${url.startsWith('/account/permissions') ? "active list-group-item list-group-item-action list-group-item-light p-3" : "list-group-item list-group-item-action list-group-item-light p-3"}`}><i className="fa fa-key me-2"></i> Permissions</Link>
                }
                {hasAnyPermission(['users.index']) &&
                    <Link href="/account/users" className={`${url.startsWith('/account/users') ? "active list-group-item list-group-item-action list-group-item-light p-3" : "list-group-item list-group-item-action list-group-item-light p-3"}`}><i className="fa fa-users me-2"></i> Users</Link>
                }
                {roleName === 'client' && hasAnyPermission(['client.data']) &&
                    <Link href="/account/client/data" className={`${url.startsWith('/account/client/data') ? "active list-group-item list-group-item-action list-group-item-light p-3" : "list-group-item list-group-item-action list-group-item-light p-3"}`}><i className="fa fa-edit me-2"></i> Data</Link>
                }
                {roleName === 'client' && hasAnyPermission(['client.rsvp']) &&
                    <Link href="/account/client/rsvp" className={`${url.startsWith('/account/client/rsvp') ? "active list-group-item list-group-item-action list-group-item-light p-3" : "list-group-item list-group-item-action list-group-item-light p-3"}`}><i className="fa fa-check-circle me-2"></i> RSVP</Link>
                }
                <button onClick={() => Inertia.post('/logout')} className={`${url.startsWith('/logout') ? "active list-group-item list-group-item-action list-group-item-light p-3" : "list-group-item list-group-item-action list-group-item-light p-3"}`}><i className="fa fa-right-from-bracket me-2"></i> Logout</button>
            </div>
        </>
    )

}