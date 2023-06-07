//import hook react
import React, { useState } from "react";

//import Head, usePage and Link
import { Head, usePage, Link } from '@inertiajs/inertia-react';

//import inertia adapter
import { Inertia } from '@inertiajs/inertia';

export default function Login() {

    //destruct props "errors"
    const { errors } = usePage().props;

    //state user
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    //function "loginHandler"
    const loginHandler = async (e) => {
        e.preventDefault();

        //login
        Inertia.post('/login', {
            username: username,
            password: password
        });
    }

    return (
        <>
            <Head>
                <title>Login Account - invait</title>
            </Head>
            <div className="container background-layer">
                <div className="row justify-content-center">
                    <div className="col-md-4 mt-80">
                        <div className="logo-wrapper text-center">
                            <img src="/assets/images/logo.png"/>
                            <div className="invait">Invait</div>
                        </div>
                        <div className="card form-auth__wrapper">
                            <div className="card-body">
                                <div className="text-center mb-2">
                                    <h6 className="">LOGIN</h6>
                                </div>
                                <form onSubmit={loginHandler}>

                                    <div className="input-group mb-3">
                                        <span className="input-group-text color-green-invait"><i className="fa fa-user"></i></span>
                                        <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                                    </div>
                                    {errors.username && (
                                        <div className="alert alert-danger">
                                            {errors.username}
                                        </div>
                                    )}

                                    <div className="input-group mb-3">
                                        <span className="input-group-text color-green-invait"><i className="fa fa-lock"></i></span>
                                        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                                    </div>
                                    {errors.password && (
                                        <div className="alert alert-danger">
                                            {errors.password}
                                        </div>
                                    )}

                                    <button className="btn btn-invait shadow-sm rounded-sm px-4 w-100" type="submit">LOGIN</button>
                                </form>
                            </div>
                        </div>
                        {/* <div className="register text-center mt-3" style={{ color: "white" }}>
                            Need an account? <Link href="/register">Register!</Link>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    )

}