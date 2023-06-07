<?php

namespace App\Http\Controllers\Account;

use App\Http\Controllers\Controller;
use App\Models\Template;
use Carbon\Carbon;
use Illuminate\Http\Request;

class CloneTemplateController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $template = Template::findOrFail($request->id);
        $newTemplate = $template->replicate()->fill([
            'name'=>$template->name.' - copy'
        ]);
        $newTemplate->created_at = Carbon::now();
        $newTemplate->save();
        return back();
    }
}
