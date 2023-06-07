<?php

namespace App\Http\Controllers;

use App\Models\InvitationReservation;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class InvitationReservationController extends Controller
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
            'confirmation'          => 'required',
            'number_present'   => 'required',
        ]);

        //dd($requestData);
        
        //create invitation message
        InvitationReservation::create($requestData);


        //redirect
        return back();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\InvitationReservation  $invitationReservation
     * @return \Illuminate\Http\Response
     */
    public function show(InvitationReservation $invitationReservation)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\InvitationReservation  $invitationReservation
     * @return \Illuminate\Http\Response
     */
    public function edit(InvitationReservation $invitationReservation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\InvitationReservation  $invitationReservation
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, InvitationReservation $invitationReservation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\InvitationReservation  $invitationReservation
     * @return \Illuminate\Http\Response
     */
    public function destroy(InvitationReservation $invitationReservation)
    {
        //
    }
}
