<?php

test('the home page loads as the Inertia welcome page', function () {
    $response = $this->get(route('home'));

    $response->assertOk();
    $response->assertSee('data-page="app"', false);
});
