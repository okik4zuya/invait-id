import React from "react";

//import layout

//import Head, usePage
import { Head } from '@inertiajs/inertia-react';

//import Form component
import LayoutAccount from "../../../../Layouts/Account";
import InvitationForm from "../../Invitations/Form";



export default function InvitationEdit() {
    return (
        <>
            <Head>
                <title>Edit Invitation - Invait</title>
            </Head>
            <LayoutAccount>
                <InvitationForm header="Edit Invitation" isEdit={true} />
            </LayoutAccount>
        </>

    )
}