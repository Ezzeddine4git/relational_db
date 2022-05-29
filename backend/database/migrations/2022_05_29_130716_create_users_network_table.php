<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersNetworkTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users_network', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user1_id');
            $table->foreign('user1_id')->references('id')->on('users');
            $table->foreignId('user2_id');
            $table->foreign('user2_id')->references('id')->on('users');
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
        Schema::dropIfExists('users_network');
    }
}
