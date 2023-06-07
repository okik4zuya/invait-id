//import hook react
import React, { useState } from "react";

//import Head, usePage and Link
import { Head, usePage, Link } from '@inertiajs/inertia-react';

//import inertia adapter
import { Inertia } from '@inertiajs/inertia';

export default function Register() {
    console.log(usePage())

    //destruct props "errors"
    const { errors } = usePage().props;

    //state user
    const [name, setName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    //function "registerHandler"
    const registerHandler = async (e) => {
        e.preventDefault();

        //register
        Inertia.post('/register', {
            name: name,
            email: email,
            username: userName,
            password: password,
            password_confirmation: passwordConfirmation
        });
    }

    return (
        <>
            <Head>
                <title>Register Account - Geek Store</title>
            </Head>
            <div className="container background-layer">
                <div className="row justify-content-center" style={{ height:"100%", paddingTop: "24px" }}>
                    <div className="col-md-6 row justify-content-center align-items-center">
                        <div className="logo-wrapper text-center">
                            <img src="/assets/images/logo.png" />
                            <div className="invait">Invait</div>
                        </div>
                        <div className="card form-auth__wrapper col-md-8">
                            <div className="card-body">
                                <div className="text-center">
                                    <h6 className="mb-3">REGISTER</h6>
                                </div>
                                <form onSubmit={registerHandler}>

                                    <div className="row" style={{ width: "auto" }}>
                                        <div className="col-md-12">
                                            <div className="input-group mb-3">
                                                <span className="input-group-text color-green-invait"><i className="fa fa-user"></i></span>
                                                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" />
                                            </div>
                                            {errors.name && (
                                                <div className="alert alert-danger">
                                                    {errors.name}
                                                </div>
                                            )}
                                        </div>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text color-green-invait"><i className="fa fa-user"></i></span>
                                            <input type="text" className="form-control" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="username" />
                                        </div>
                                        {errors.username && (
                                            <div className="alert alert-danger">
                                                {errors.username}
                                            </div>
                                        )}
                                        <div className="col-md-12">
                                            <div className="input-group mb-3">
                                                <span className="input-group-text color-green-invait"><i className="fa fa-envelope"></i></span>
                                                <input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" />
                                            </div>
                                            {errors.email && (
                                                <div className="alert alert-danger">
                                                    {errors.email}
                                                </div>
                                            )}
                                        </div>
                                        <div className="col-md-12">
                                            <div className="input-group mb-3">
                                                <span className="input-group-text color-green-invait"><i className="fa fa-lock"></i></span>
                                                <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                                            </div>
                                            {errors.password && (
                                                <div className="alert alert-danger">
                                                    {errors.password}
                                                </div>
                                            )}
                                        </div>
                                        <div className="col-md-12">
                                            <div className="input-group mb-3">
                                                <span className="input-group-text color-green-invait"><i className="fa fa-lock"></i></span>
                                                <input type="password" className="form-control" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} placeholder="Confirm Password" />
                                            </div>
                                        </div>
                                    </div>

                                    <button className="btn btn-invait shadow-sm rounded-sm px-4 w-100" type="submit">REGISTER</button>
                                </form>
                            </div>
                        </div>
                        <div className="register text-center mt-3" style={{ color: "white" }}>
                            Have an account? <Link href="/login">Login!</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}