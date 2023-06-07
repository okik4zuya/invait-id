<?php

namespace App\Http\Controllers\Account\Client;

use App\Http\Controllers\Controller;
use App\Models\Invitation;
use App\Models\InvitationReservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ClientRSVPController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request){

        $invitation = Invitation::with('invitation_reservation')->where('client_id', $request->user()->id)->first();
        $rsvp = InvitationReservation::whereBelongsTo($invitation)->paginate(20);
        //dd($request->user()->id);
        //dd($invitation);
        return Inertia('Account/Client/RSVP/Index',[
            'rsvp'=>$rsvp
        ]);
    }
}
