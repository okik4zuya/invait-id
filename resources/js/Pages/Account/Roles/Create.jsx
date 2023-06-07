//import react  
import React, {useState} from "react";

//import layout
import LayoutAccount from '../../../Layouts/Account';

//import Head, usePage
import { Head, usePage } from '@inertiajs/inertia-react';

//import Inertia adapter
import { Inertia } from "@inertiajs/inertia";

//import Sweet Alert
import Swal from 'sweetalert2';

export default function RoleCreate() {

    //destruct props "errors" & "permissions"
    const { errors, permissions } = usePage().props;

    //define state
    const [name, setName] = useState('');
    const [permissionsData, setPermissionsData] = useState([]);

    //define method "handleCheckboxChange"
    const handleCheckboxChange = (e) => {
        //define data
        let data = permissionsData

        //push data on state
        data.push(e.target.value)

        //set data to state
        setPermissionsData(data)
    }

    //define method
    const storeRole = async (e) => {
        e.preventDefault();

        //sending data
        Inertia.post('/account/roles', {

            //data
            name: name,
            permissions: permissionsData
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
        <>
            <Head>
                <title>Create Roles - Geek Store</title>
            </Head>
            <LayoutAccount>
                
            </LayoutAccount>
        </>
    )

}