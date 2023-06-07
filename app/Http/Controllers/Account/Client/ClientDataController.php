<?php

namespace App\Http\Controllers\Account\Client;

use App\Http\Controllers\Controller;
use App\Models\CustomTemplate;
use App\Models\Invitation;
use App\Models\Template;
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
        $templates = Template::all();
        $custom_template = CustomTemplate::where('invitation_id', $invitation->id)->where('template_id', $invitation->template_id)->first();
        $invitation['custom_template'] = $custom_template;
        $custom_templates = CustomTemplate::where('invitation_id', $invitation->id)->get();
        //$content = $invitation->custom_template->content;
        //dd($invitation);
        //dd($request->user()->id);
        //dd($invitation);
        return Inertia('Account/Client/Data/Index',[
            'invitation'=>$invitation,
            'custom_templates' => $custom_templates,
            'templates' => $templates
        ]);
    }
}
