<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InvitationReservation extends Model
{
    use HasFactory;
    protected $fillable = [
        'invitation_id',
        'name',
        'confirmation',
        'number_present',
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
