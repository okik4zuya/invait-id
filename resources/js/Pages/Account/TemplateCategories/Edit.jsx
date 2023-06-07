//import react  
import React from "react";

//import layout
import LayoutAccount from '../../../Layouts/Account';

//import Head, usePage
import { Head } from '@inertiajs/inertia-react';

//import Form component
import TemplateCategoryForm from "./Form";



export default function TemplateCategoryCreate() {
    return (
        <>
            <Head>
                <title>Create Template Category - Invait</title>
            </Head>
            <LayoutAccount>
                <TemplateCategoryForm header="Create Template Category" isEdit={true} />
            </LayoutAccount>
        </>

    )
}