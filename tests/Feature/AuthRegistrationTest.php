<?php

use App\Models\User;

it('registers a new user with valid credentials', function () {
    $response = $this->post('/register', [
        'name' => 'Test User',
        'email' => 'test.user@example.com',
        'password' => 'Password123!',
        'password_confirmation' => 'Password123!',
    ]);

    $response->assertRedirect('/dashboard');
    $this->assertDatabaseHas('users', [
        'email' => 'test.user@example.com',
    ]);

    expect(User::where('email', 'test.user@example.com')->exists())->toBeTrue();
});
