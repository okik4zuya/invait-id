<?php

namespace App\Http\Controllers\Account\Client;

use App\Http\Controllers\Controller;
use App\Models\CustomTemplate;
use App\Models\Invitation;
use App\Models\Template;
use App\Models\User;
use Illuminate\Http\Request;

class ClientDataController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $invitation = Invitation::with('template')->where('client_id', $request->user()->id)->first();

        // //get client
        // $client = User::find($invitation->client_id);

        // //get reseller
        // $reseller = User::find($invitation->reseller_id);
        //$content = $invitation->custom_template->content;
        //dd($invitation);
        //dd($request->user()->id);
        //dd($invitation);
        if ($invitation) {
            $templates = Template::all();
            $custom_template = CustomTemplate::where('invitation_id', $invitation->id)->where('template_id', $invitation->template_id)->first();
            $invitation['custom_template'] = $custom_template;
            $custom_templates = CustomTemplate::where('invitation_id', $invitation->id)->get();
            return Inertia('Account/Client/Data/Index', [
                'invitation' => $invitation,
                'custom_templates' => $custom_templates,
                'templates' => $templates,
                // 'client' => $client,
                // 'reseller' => $reseller
            ]);
        } else {
            return back();
        }
    }
}
