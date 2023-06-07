<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InvitationMessage extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'invitation_id',
        'name',
        'message',
    ];
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
