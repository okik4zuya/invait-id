<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Template extends Model
{
    use HasFactory;
    /**
     * fillable
     * 
     * @var array
     */
    protected $fillable = [
        'name',
        'thumbnail',
        'user_id',
        'template',
        'css',
        'content',
        'preview_slug'
    ];
    /**
     * user
     * 
     * @return void
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    /**
     * template_categories
     * 
     * @return void
     */
    public function template_category()
    {
        return $this->belongsToMany(TemplateCategory::class);
    }
    /**
     * invitation
     * 
     * @return void
     */
    public function invitation()
    {
        return $this->hasMany(Invitation::class);
    }
}
