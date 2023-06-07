//import react  
import React from "react";

//import layout
import LayoutAccount from '../../../Layouts/Account';

//import Head, usePage
import { Head } from '@inertiajs/inertia-react';

//import Form component
import TemplateForm from "./Form";



export default function TemplateCreate() {
    return (
        <>
            <Head>
                <title>Create Template - Invait</title>
            </Head>
            <LayoutAccount>
                <TemplateForm header="Create Template" isEdit={false} />
            </LayoutAccount>
        </>

    )
}