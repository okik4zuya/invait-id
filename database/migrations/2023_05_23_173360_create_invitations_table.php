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
        Schema::create('invitations', function (Blueprint $table) {
            $table->id();
            $table->string('slug');
            $table->string('title');
            $table->enum('status', ['draft', 'published', 'expired']);
            $table->string('thumbnail');
            $table->string('excerpt')->nullable();
            $table->foreignId('template_id')->references('id')->on('templates');
            $table->boolean('is_custom_template');
            $table->boolean('is_custom_css');
            $table->boolean('is_custom_content');
            $table->foreignId('user_id')->references('id')->on('users');
            $table->foreignId('client_id')->references('id')->on('users');
            $table->foreignId('reseller_id')->references('id')->on('users');
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
        Schema::dropIfExists('invitations');
    }
};
