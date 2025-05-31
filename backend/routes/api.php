<?php

use App\Http\Controllers\RegistroController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SprintsController;

Route::controller(RegistroController::class)->group(function(){
    Route::get('registros', 'index');
    Route::post('registro', 'store');
    Route::get('registro/{id}', 'show');
    Route::put('registro/{id}', 'update');
    Route::delete('registro/{id}', 'destroy');
});

Route::controller(SprintsController::class)->group(function(){
    Route::get('sprints', 'index');
    Route::post('sprint', 'store');
    Route::get('sprint/{id}', 'show');
    Route::put('sprint/{id}', 'update');
    Route::delete('sprint/{id}', 'destroy');
});
//CRUD