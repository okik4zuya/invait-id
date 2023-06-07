<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TemplateCategory extends Model
{
    use HasFactory;
    /**
     * fillable
     * 
     * @var array
     */
    protected $fillable = [
        'name',
    ];
    /**
     * template
     * 
     * @return void
     */
    public function template()
    {
        return $this->belongsToMany(Template::class);
    }
}
