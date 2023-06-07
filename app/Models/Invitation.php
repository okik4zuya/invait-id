<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invitation extends Model
{
    use HasFactory;
    /**
     * fillable
     * 
     * @var array
     */
    protected $fillable = [
        'title',
        'slug',
        'status',
        'thumbnail',
        'excerpt',
        'is_custom_template',
        'template_id',
        'user_id',
        'client_id',
        'reseller_id'
    ];

    protected $nullable = [
        'excerpt',
        'custom_template'
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
     * client
     * 
     * @return void
     */
    public function client()
    {
        return $this->belongsTo(User::class, 'client_id');
    }
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
     * custom_template
     * 
     * @return void
     */
    public function custom_template()
    {
        return $this->hasMany(CustomTemplate::class);
    }
    /**
     * invitation_message
     * 
     * @return void
     */
    public function invitation_message()
    {
        return $this->hasMany(InvitationMessage::class);
    }

    /**
     * invitation_reservation
     * 
     * @return void
     */
    public function invitation_reservation()
    {
        return $this->hasMany(InvitationReservation::class);
    }
}
