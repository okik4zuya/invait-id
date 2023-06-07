<?php

namespace App\Http\Controllers;

use App\Models\TemplateCategory;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TemplateCategoryController extends Controller
{
    private $viewIndex = "Account/TemplateCategories/Index";
    private $viewCreate = "Account/TemplateCategories/Create";
    private $viewEdit = "Account/TemplateCategories/Edit";
    private $viewShow = "Account/TemplateCategories/Show";
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        
        //get templates
        $template_categories = TemplateCategory::when(request()->q, function ($template_categories) {
            $template_categpries = $template_categories->where('name', 'like', '%' . request()->q . '%');
        })->latest()->paginate(5);

        //append query string to pagination links
        $template_categories->appends(['q' => request()->q]);

        //return inertia
        return inertia($this->viewIndex, [
            'template_categories' => $template_categories,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //return inertia page
        return inertia($this->viewCreate, []);
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
        ]);

        $templateData = TemplateCategory::create($requestData);

        return redirect()->route('account.template-categories.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\TemplateCategory  $templateCategory
     * @return \Illuminate\Http\Response
     */
    public function show(TemplateCategory $templateCategory)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\TemplateCategory  $templateCategory
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        
        //get template category
        $template_category = TemplateCategory::findOrFail($id);

        //render inertia
        return inertia($this->viewEdit, [
            'template_category' => $template_category
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\TemplateCategory  $templateCategory
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, TemplateCategory $templateCategory)
    {
        /**
         * Validate request
         */
        $requestData = $request->validate([
            'name'          => 'required',
        ]);
        //dd($requestData);

        $templateCategory->update($requestData);

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\TemplateCategory  $templateCategory
     * @return \Illuminate\Http\Response
     */
    public function destroy(TemplateCategory $templateCategory)
    {
        $templateCategory->delete();
        //redirect
        return redirect()->route('account.template-categories.index');
    }
}
