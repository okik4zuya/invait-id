
//import react  
import React from "react";

//import layout
import LayoutAccount from '../../../Layouts/Account';

//import Head, usePage
import { Head } from '@inertiajs/inertia-react';

//import Form component
import InvitationForm from "./Form";



export default function InvitationCreate() {
    return (
        <>
            <Head>
                <title>Create Invitation - Invait</title>
            </Head>
            <LayoutAccount>
                <InvitationForm header="Create Invitation" isEdit={false} />
            </LayoutAccount>
        </>

    )
}