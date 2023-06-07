<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomTemplate extends Model
{
    use HasFactory;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'invitation_id',
        'template_id',
        'content',
        'template',
        'css',
        'content',
    ];
    /**
     * template
     * 
     * @return void
     */
    public function template()
    {
        return $this->belongsTo(Template::class);
    }
    /**
     * invitation
     * 
     * @return void
     */
    public function invitation()
    {
        return $this->belongsTo(Invitation::class);
    }
}
