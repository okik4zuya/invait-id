<?php

use App\Http\Controllers\Account\Client\ClientDataController;
use App\Http\Controllers\Account\Client\ClientRSVPController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Account\DashboardController;
use App\Http\Controllers\Account\CloneInvitationController;
use App\Http\Controllers\Account\CloneTemplateController;
use App\Http\Controllers\Account\RoleController;
use App\Http\Controllers\Account\PermissionController;
use App\Http\Controllers\Account\UserController;
use App\Http\Controllers\Account\InvitationController;
use App\Http\Controllers\InvitationMessageController;
use App\Http\Controllers\InvitationReservationController;
use App\Http\Controllers\TemplateCategoryController;
use App\Http\Controllers\TemplateController;
use App\Http\Controllers\Web\HomeController;
use App\Http\Controllers\Web\InvitationController as WebInvitationController;
use App\Http\Controllers\Web\TemaController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [HomeController::class, 'index'])->name('home.index');
Route::get('/tema', [TemaController::class, 'index'])->name('tema.index');

//route invitation
Route::get('/i/{slug}', [WebInvitationController::class, 'show'])->name('invitations.show');
// Route::get('/i/{slug}', function(){
//     return view('welcome');

// });

//route register index
// Route::get('/register', [RegisterController::class, 'index'])->name('register')->middleware('guest');

//route register store
// Route::post('/register', [RegisterController::class, 'store'])->name('register.store')->middleware('guest');

//route login index
Route::get('/login', [LoginController::class, 'index'])->name('login')->middleware('guest');

//route login store
Route::post('/login', [LoginController::class, 'store'])->name('login.store')->middleware('guest');

//route logout
Route::post('/logout', LogoutController::class)->name('logout')->middleware('auth');

//prefix "account"
Route::prefix('account')->group(function () {

    //middleware "auth"
    Route::group(['middleware' => ['auth']], function () {

        //route dashboard
        Route::get('/dashboard', DashboardController::class)->name('account.dashboard');

        //route permissions
        Route::get('/permissions', PermissionController::class)->name('account.permissions.index')
            ->middleware('permission:permissions.index');

        //route resource roles
        Route::resource('/roles', RoleController::class, ['as' => 'account'])
            ->middleware('permission:roles.index|roles.create|roles.edit|roles.delete');

        //route resource users
        Route::resource('/users', UserController::class, ['as' => 'account'])
            ->middleware('permission:users.index|users.create|users.edit|users.delete');

        //route resource invitations
        Route::resource('/invitations', InvitationController::class, ['as' => 'account'])
            ->middleware('permission:invitations.index|invitations.create|invitations.edit|invitations.delete');

        // Route::get('/invitations', [InvitationController::class, 'index'], ['as' => 'account'])
        //     ->middleware('permission:invitations.index');
        // Route::post('/invitations', [InvitationController::class, 'store'], ['as' => 'account'])
        //     ->middleware('permission:invitations.create');
        // Route::put('/invitations/{id}/edit', [InvitationController::class, 'update'], ['as' => 'account'])
        //     ->middleware('permission:invitations.edit');
        // Route::delete('/invitations/{id}', [InvitationController::class, 'destroy'], ['as' => 'account'])
        //     ->middleware('permission:invitations.delete');


        //route resource templates
        Route::resource('/templates', TemplateController::class, ['as' => 'account'])
            ->middleware('permission:templates.index|templates.create|templates.edit|templates.delete');

        //route resource template-categories
        Route::resource('/template-categories', TemplateCategoryController::class, ['as' => 'account'])
            ->middleware('permission:template-categories.index|template-categories.create|template-categories.edit|template-categories.delete');

        //route for duplicate invitation
        Route::post('/invitations/clone/{id}', CloneInvitationController::class, ['as' => 'account'])
            ->middleware('permission:invitations.clone');

        //route for duplicate template
        Route::post('/templates/clone/{id}', CloneTemplateController::class, ['as' => 'account'])
            ->middleware('permission:templates.clone');

        //routes for client
        //rsvp
        Route::get('/client/rsvp', ClientRSVPController::class, ['as' => 'account'])
            ->middleware('permission:client.rsvp');
        //data
        Route::get('/client/data', ClientDataController::class, ['as' => 'account'])
            ->middleware('permission:client.data');
    });
});
//route resource invitation messages
Route::resource('/invitation-messages', InvitationMessageController::class);

//route resource invitation reservations
Route::resource('/invitation-reservations', InvitationReservationController::class);
