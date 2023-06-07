<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Template;
use App\Models\TemplateCategory;
use Illuminate\Http\Request;

class TemaController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $template_categories = TemplateCategory::withCount('template')->get();
        $templates_count = Template::count();
        if (request()->category) {
            $templates = Template::whereHas('template_category', function ($q) {
                $q->where('template_categories.name', request()->category);
            })->select('id','name', 'thumbnail', 'preview_slug')->paginate(8);
        } else {
            $templates = Template::latest()->select('id','name', 'thumbnail', 'preview_slug')->paginate(8);
        }

        //return inertia
        return inertia('Web/Tema/Index', [
            'templates' => $templates,
            'templates_count' => $templates_count,
            'template_categories' => $template_categories
        ]);
    }
}
