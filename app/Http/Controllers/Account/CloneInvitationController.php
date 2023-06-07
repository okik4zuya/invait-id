<?php

namespace App\Http\Controllers\Account;

use App\Http\Controllers\Controller;
use App\Models\Invitation;
use Carbon\Carbon;
use Illuminate\Http\Request;

class CloneInvitationController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        //dd($request->id);
        $invitation = Invitation::findOrFail($request->id);
        $newInvitation = $invitation->replicate();
        $newInvitation->created_at = Carbon::now();
        $newInvitation->save();
        return back();
    }
}
