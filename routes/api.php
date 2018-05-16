<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix' => 'admin', 'as' => 'admin.', 'namespace' => 'Admin'], function () {
    Route::resource('category', 'CategoryController');
    Route::resource('product', 'ProductController');
    Route::resource('order', 'OrderController');
    Route::resource('comment', 'CommentController');
    Route::get('rate', 'RateController@index')->name('rate');
    Route::resource('user', 'UserController');
});
