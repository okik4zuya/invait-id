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
        Schema::create('custom_templates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('invitation_id')->references('id')->on('invitations')->cascadeOnDelete();
            $table->foreignId('template_id')->references('id')->on('templates')->cascadeOnDelete();
            $table->longText('template');
            $table->longText('css');
            $table->longText('content');
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
        Schema::dropIfExists('custom_templates');
    }
};
