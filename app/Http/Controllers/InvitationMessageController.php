<?php

namespace App\Http\Controllers;

use App\Models\InvitationMessage;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class InvitationMessageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        
        /**
         * Validate request
         */
        $requestData = $request->validate([
            'invitation_id' => 'required',
            'name'          => 'required',
            'message'   => 'required',
        ]);
        
        //create invitation message
        InvitationMessage::create($requestData);


        //redirect
        return back();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\InvitationMessage  $invitationMessage
     * @return \Illuminate\Http\Response
     */
    public function show(InvitationMessage $invitationMessage)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\InvitationMessage  $invitationMessage
     * @return \Illuminate\Http\Response
     */
    public function edit(InvitationMessage $invitationMessage)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\InvitationMessage  $invitationMessage
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, InvitationMessage $invitationMessage)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\InvitationMessage  $invitationMessage
     * @return \Illuminate\Http\Response
     */
    public function destroy(InvitationMessage $invitationMessage)
    {
        //
    }
}
