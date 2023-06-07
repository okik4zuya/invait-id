<?php

namespace App\Http\Controllers;

use App\Models\Template;
use App\Http\Controllers\Controller;
use App\Models\TemplateCategory;
use Illuminate\Http\Request;

class TemplateController extends Controller
{
    private $viewIndex = "Account/Templates/Index";
    private $viewCreate = "Account/Templates/Create";
    private $viewEdit = "Account/Templates/Edit";
    private $viewShow = "Account/Templates/Show";
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //get templates
        $templates = Template::with('user')->with('template_category')->when(request()->q, function ($templates) {
            $templates = $templates->where('name', 'like', '%' . request()->q . '%');
        })->latest()->paginate(10);

        //append query string to pagination links
        $templates->appends(['q' => request()->q]);

        //return inertia
        return inertia($this->viewIndex, [
            'templates' => $templates,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //get template_categories
        $template_categories = TemplateCategory::all();

        //return inertia page
        return inertia($this->viewCreate, [
            'template_categories' => $template_categories,
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
            'name'          => 'required',
            'thumbnail'   => 'required',
            'preview_slug'   => 'required',
            'user_id' => 'required',
            'template_category' => 'required',
            'template' => 'required',
            'css' => 'required',
            'content' => 'required'
        ]);
        $templateData = Template::create([
            'name' =>$request->name,
            'thumbnail' => $request->thumbnail,
            'preview_slug'   => $request->preview_slug,
            'user_id' => $request->user_id,
            'template' => $request->template,
            'css' => $request->css,
            'content' => $request->content,
        ]);
        //dd($requestData);
        $templateData->template_category()->sync($request->template_category);


        return redirect()->route('account.templates.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Template  $template
     * @return \Illuminate\Http\Response
     */
    public function show(Template $template)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Template  $template
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //get template
        $template = Template::with('template_category')->findOrFail($id);

        //get template categories
        $template_categories = TemplateCategory::all();

        //render inertia
        return inertia($this->viewEdit, [
            'template' => $template,
            'template_categories' => $template_categories
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Template  $template
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Template $template)
    {

        /**
         * Validate request
         */
        $requestData = $request->validate([
            'name'          => 'required',
            'thumbnail'   => 'required',
            'preview_slug'   => 'required',
            'user_id' => 'required',
            'template_category' => 'required',
            'template' => 'nullable',
            'css' => 'nullable',
            'content' => 'nullable'
        ]);
        $templateData = $template->update([
            'name' =>$request->name,
            'thumbnail' => $request->thumbnail,
            'preview_slug'   => $request->preview_slug,
            'user_id' => $request->user_id,
            'template' => $request->template,
            'css' => $request->css,
            'content' => $request->content,
        ]);
        $template->template_category()->sync($request->template_category);

        $template->update($requestData);

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Template  $template
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {

        //find invitation by ID
        $template = Template::findOrFail($id);

        if ($template->name !== "Master") {

            //delete template
            $template->delete();
        }

        //redirect
        return redirect()->route('account.templates.index');
    }
}
