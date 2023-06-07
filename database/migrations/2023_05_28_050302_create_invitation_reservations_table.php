<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('invitation_reservations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('invitation_id')->references('id')->on('invitations')->cascadeOnDelete();
            $table->string('name');
            $table->enum('confirmation', ['Hadir', 'Tidak Hadir', 'Ragu-ragu']);
            $table->integer('number_present');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('invitation_reservations');
    }
};
