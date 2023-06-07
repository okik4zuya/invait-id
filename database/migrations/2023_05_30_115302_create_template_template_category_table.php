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
        Schema::create('template_template_category', function (Blueprint $table) {
            $table->id();
            $table->foreignId('template_id')->references('id')->on('templates')->cascadeOnDelete();
            $table->foreignId('template_category_id')->references('id')->on('template_categories')->cascadeOnDelete();
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
        Schema::dropIfExists('templates_template_categories');
    }
};
