<?php

use App\Http\Controllers\RegistroController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::controller(RegistroController::class)->group(function(){
    Route::get('registros', 'index');
    Route::post('registro', 'store');
    Route::get('registro/{id}', 'show');
    Route::put('registro/{id}', 'update');
    Route::delete('registro/{id}', 'destroy');
});
