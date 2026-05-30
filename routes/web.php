<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;

Route::inertia('/', 'welcome')->name('home');

Route::inertia('/posts', 'posts/index')->name('posts.index');

Route::middleware('auth')->group(function () {
    Route::inertia('/posts/create', 'posts/create')->name('posts.create');
    Route::get('/posts/{slug}/edit', function (string $slug) {
        return inertia('posts/edit', ['slug' => $slug]);
    })->name('posts.edit');
    Route::inertia('/bookmarks', 'bookmarks')->name('bookmarks');
    Route::inertia('/profile', 'profile')->name('profile');
});

Route::get('/posts/search', function (Request $request) {
    return inertia('posts/search', [
        'q' => $request->query('q', ''),
        'category' => $request->query('category', 'All Topics'),
    ]);
})->name('posts.search');
Route::get('/posts/{slug}', function (string $slug) {
    return inertia('posts/show', ['slug' => $slug]);
})->name('posts.show');

Route::inertia('/categories', 'categories/index')->name('categories.index');
Route::get('/categories/{category}', function (string $category) {
    return inertia('categories/show', ['category' => Str::title(str_replace('-', ' ', $category))]);
})->name('categories.show');

Route::inertia('/about', 'about')->name('about');
Route::inertia('/contact', 'contact')->name('contact');

// Keep a lightweight named dashboard route that redirects to the homepage.
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return redirect('/');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
