<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class PermissionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //permission dashboard
        Permission::create(['name' => 'dashboard.index', 'guard_name' => 'web']);
        Permission::create(['name' => 'dashboard.statistics', 'guard_name' => 'web']);
        Permission::create(['name' => 'dashboard.chart', 'guard_name' => 'web']);

        //permission users
        Permission::create(['name' => 'users.index', 'guard_name' => 'web']);
        Permission::create(['name' => 'users.create', 'guard_name' => 'web']);
        Permission::create(['name' => 'users.edit', 'guard_name' => 'web']);
        Permission::create(['name' => 'users.delete', 'guard_name' => 'web']);

        //permission roles
        Permission::create(['name' => 'roles.index', 'guard_name' => 'web']);
        Permission::create(['name' => 'roles.create', 'guard_name' => 'web']);
        Permission::create(['name' => 'roles.edit', 'guard_name' => 'web']);
        Permission::create(['name' => 'roles.delete', 'guard_name' => 'web']);

        //permission permissions
        Permission::create(['name' => 'permissions.index', 'guard_name' => 'web']);

        //permission invitations
        Permission::create(['name' => 'invitations.index', 'guard_name' => 'web']);
        Permission::create(['name' => 'invitations.create', 'guard_name' => 'web']);
        Permission::create(['name' => 'invitations.edit', 'guard_name' => 'web']);
        Permission::create(['name' => 'invitations.delete', 'guard_name' => 'web']);
        Permission::create(['name' => 'invitations.show', 'guard_name' => 'web']);
        Permission::create(['name' => 'invitations.clone', 'guard_name' => 'web']);
        Permission::create(['name' => 'invitations.enable-feature', 'guard_name' => 'web']);
        Permission::create(['name' => 'invitations.change-client', 'guard_name' => 'web']);
        Permission::create(['name' => 'invitations.change-reseller', 'guard_name' => 'web']);
        Permission::create(['name' => 'invitations.change-status', 'guard_name' => 'web']);
        Permission::create(['name' => 'invitations.change-slug', 'guard_name' => 'web']);
        Permission::create(['name' => 'invitations.change-template', 'guard_name' => 'web']);

        //permission templates
        Permission::create(['name' => 'templates.index', 'guard_name' => 'web']);
        Permission::create(['name' => 'templates.create', 'guard_name' => 'web']);
        Permission::create(['name' => 'templates.edit', 'guard_name' => 'web']);
        Permission::create(['name' => 'templates.delete', 'guard_name' => 'web']);
        Permission::create(['name' => 'templates.show', 'guard_name' => 'web']);

        //permission template categories
        Permission::create(['name' => 'template-categories.index', 'guard_name' => 'web']);
        Permission::create(['name' => 'template-categories.create', 'guard_name' => 'web']);
        Permission::create(['name' => 'template-categories.edit', 'guard_name' => 'web']);
        Permission::create(['name' => 'template-categories.delete', 'guard_name' => 'web']);
        Permission::create(['name' => 'template-categories.show', 'guard_name' => 'web']);

        //permission client account
        Permission::create(['name' => 'client.data', 'guard_name' => 'web']);
        Permission::create(['name' => 'client.rsvp', 'guard_name' => 'web']);

    }
}