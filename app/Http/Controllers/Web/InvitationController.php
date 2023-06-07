<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\CustomTemplate;
use App\Models\Invitation;
use App\Models\InvitationContent;
use App\Models\InvitationMessage;
use Artesaos\SEOTools\Facades\JsonLd;
use Artesaos\SEOTools\Facades\OpenGraph;
use Artesaos\SEOTools\Facades\SEOMeta;
use Artesaos\SEOTools\Facades\TwitterCard;
use Illuminate\Http\Request;

class InvitationController extends Controller
{
    /**
     * Display the specified resource.
     *
     * @param  $slug
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $slug)
    {
        //find invitation by slug
        $invitation = Invitation::with('template')->with('client')->where('slug', $slug)->first();
        // dd($invitation->status);

        if ($invitation !== null && $invitation->status === 'published') {
            $custom_template = CustomTemplate::where('invitation_id', $invitation->id)->where('template_id', $invitation->template->id)->first();
            $invitation_message = InvitationMessage::where('invitation_id', $invitation->id)->orderBy('created_at', 'desc')->get();
            $invitation['custom_template'] = $custom_template;
            $invitation['invitation_message'] = $invitation_message;

            //set SEO
            SEOMeta::setTitle($invitation->title)
                ->setDescription($invitation->excerpt);
            OpenGraph::setTitle($invitation->title)
                ->setDescription($invitation->excerpt)
                ->addImage($invitation->thumbnail);
            TwitterCard::setTitle($invitation->title)
                ->setDescription($invitation->excerpt)
                ->setImage($invitation->thumbnail);
            JsonLd::setTitle($invitation->title)
                ->setDescription($invitation->excerpt)
                ->addImage($invitation->thumbnail);
            
            return inertia('Web/Invitations/Show', [
                'invitation' => $invitation
            ]);
        } else {
            return abort(404);
        }
    }
}
