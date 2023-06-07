<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\Controller;

class RegisterController extends Controller
{    
    /**
     * index
     *
     * @return void
     */
    public function index()
    {
        //return inertia
        return inertia('Auth/Register');
    }
    
    /**
     * store
     *
     * @param  mixed $request
     * @return void
     */
    public function store(Request $request)
    {
        //set validation
        $request->validate([
            'name'      => 'required',
            'email'     => 'required|email|unique:users',
            'username'  => 'required|unique:users',
            'password'  => 'required|confirmed',
        ]);

        //insert data user
        $user = User::create([
            'name'      => $request->name,
            'username'  => $request->username,
            'email'     => $request->email,
            'password'  => bcrypt($request->password)
        ]);

        //find role "customer
        $role = Role::findByName('client');

        //assing role "customer" to user
        $user->assignRole($role);

        //redirect to login
        return redirect()->route('login');

    }
}