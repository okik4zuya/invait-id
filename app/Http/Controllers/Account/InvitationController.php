<?php

namespace App\Http\Controllers\Account;

use App\Models\Invitation;
use App\Http\Controllers\Controller;
use App\Models\CustomTemplate;
use App\Models\InvitationContent;
use App\Models\Template;
use App\Models\User;
use Artesaos\SEOTools\Facades\SEOMeta;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class InvitationController extends Controller
{
    private $viewIndex = "Account/Invitations/Index";
    private $viewCreate = "Account/Invitations/Create";
    private $viewEdit = "Account/Invitations/Edit";
    private $viewShow = "Account/Invitations/Show";

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        //get invitations
        if (request()->user()->roles[0]->name === 'admin') {
            $invitations = Invitation::with('user')
            ->with('reseller')
            ->with('client')
            ->when(request()->q, function ($invitations) {
                $invitations = $invitations->where('title', 'like', '%' . request()->q . '%')
                    ->orWhere('slug', 'like', '%' . request()->q . '%');
            })
            ->when(request()->reseller, function($invitations){
                $invitations = $invitations->where('reseller_id', request()->reseller);
            })
            ->latest()->paginate(10);
        } else if (request()->user()->roles[0]->name === 'reseller') {
            $invitations = Invitation::with('user')->where('reseller_id', request()->user()->id)->when(request()->q, function ($invitations) {
                $invitations = $invitations->where('title', 'like', '%' . request()->q . '%')
                    ->orWhere('slug', 'like', '%' . request()->q . '%');
            })->latest()->paginate(10);
        }

        // dd(request()->user()->roles[0]->name);

        //append query string to pagination links
        $invitations->appends(['q' => request()->q]);

        // //return inertia
        return inertia($this->viewIndex, [
            'invitations' => $invitations,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //get templates
        $templates = Template::all();

        //render with inertia
        return inertia($this->viewCreate, [
            'templates' => $templates
        ]);
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
            'title'          => 'required',
            'slug'   => 'required|unique:invitations',
            'status' => 'required',
            'thumbnail'   => 'required',
            'excerpt' => 'nullable',
            'user_id' => 'required',
            'client_id' => 'nullable',
            'reseller_id' => 'nullable',
            'template_id' => 'required',
            'is_custom_template' => 'required',
            'is_custom_css' => 'required',
            'is_custom_content' => 'required',
            'custom_template' => 'nullable',
            'custom_css' => 'nullable',
            'custom_content' => 'nullable',
        ]);

        $invitationData = Invitation::create([
            'title' => request()->title,
            'slug' => request()->slug,
            'status' => request()->status,
            'thumbnail' => request()->thumbnail,
            'excerpt' => request()->excerpt,
            'user_id' => request()->user_id,
            'client_id' => request()->client_id,
            'reseller_id' => request()->reseller_id,
            'template_id' => request()->template_id,
            'is_custom_template' => request()->is_custom_template,
            'custom_template' => request()->custom_template,
        ]);


        $customTemplateData = CustomTemplate::create([
            'invitation_id' => $invitationData->id,
            'template_id' => request()->template_id,
            'template' => request()->custom_template,
            'css' => request()->custom_css,
            'content' => request()->custom_content,
        ]);

        //redirect
        return redirect()->route('account.invitations.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  $slug
     * @return \Illuminate\Http\Response
     */
    public function show($slug)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Invitation  $invitation
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //get invitation
        $invitation = Invitation::findOrFail($id);

        //get templates
        $templates = Template::all();

        //get invitation content by invitation_id and template_id
        $custom_template = CustomTemplate::where('invitation_id', $invitation->id)->where('template_id', $invitation->template_id)->first();
        $invitation['custom_template'] = $custom_template;

        //get client
        $client = User::find($invitation->client_id);

        //get reseller
        $reseller = User::find($invitation->reseller_id);

        //get invitation contents by invitation_id
        $custom_templates = CustomTemplate::where('invitation_id', $invitation->id)->get();

        //render with inertia
        return inertia($this->viewEdit, [
            'invitation'          => $invitation,
            'templates' => $templates,
            'custom_templates' => $custom_templates,
            'client' => $client,
            'reseller' => $reseller
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Invitation  $invitation
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Invitation $invitation)
    {

        /**
         * Validate request
         */
        $requestData = $request->validate([
            'title'          => 'required',
            'slug'   => ['required'],
            'status' => 'required',
            'thumbnail'   => 'required',
            'excerpt' => 'nullable',
            'user_id' => 'required',
            'client_id' => 'nullable',
            'reseller_id' => 'nullable',
            'template_id' => 'required',
            'is_custom_template' => 'required',
            'is_custom_css' => 'required',
            'is_custom_content' => 'required',
            'custom_template' => 'nullable',
            'custom_css' => 'nullable',
            'custom_content' => 'nullable',
        ]);


        $invitationData = [
            'title' => request()->title,
            'slug' => request()->slug,
            'status' => request()->status,
            'thumbnail' => request()->thumbnail,
            'excerpt' => request()->excerpt,
            'user_id' => request()->user_id,
            'client_id' => request()->client_id,
            'reseller_id' => request()->reseller_id,
            'template_id' => request()->template_id,
            'is_custom_template' => request()->is_custom_template,
            'is_custom_css' => request()->is_custom_css,
            'is_custom_content' => request()->is_custom_content,
        ];
        $customTemplateData = [
            'invitation_id' => $invitation->id,
            'template_id' => request()->template_id,
            'template' => request()->custom_template,
            'css' => request()->custom_css,
            'content' => request()->custom_content,
        ];
        //update invitation data
        $invitation->update($invitationData);

        //update invitation content data
        //InvitationContent::where('invitation_id', $invitation->id)->where('template_id', $invitation->template_id)->update($invitationContentData);


        // cek apakah custom_template sudah ada?
        // jika sudah ada, maka update custom_template tersebut
        // jika belum ada, maka buat custom_template
        $customTemplateExisted = CustomTemplate::where('invitation_id', $invitation->id)->where('template_id', request()->template_id);
        if ($customTemplateExisted->exists() == true) {
            $customTemplateExisted->update($customTemplateData);
        } else {
            CustomTemplate::create($customTemplateData);
        }




        //redirect
        //return redirect()->route('account.invitations.index');
        return redirect()->back();
        //dd($request->custom_templa);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {

        //find invitation by ID
        $invitation = Invitation::findOrFail($id);

        //delete invitation message of this invitation
        $invitation->invitation_message()->delete();


        //delete invitation
        $invitation->delete();

        //redirect
        return redirect()->route('account.invitations.index');
    }
}
