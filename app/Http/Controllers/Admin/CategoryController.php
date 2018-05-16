<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Category;

class CategoryController extends Controller
{
    public function __construct(Category $category) {
        $this->category = $category;
    }

    public function index(Request $request)
    {
        return response()->json($this->category->with('subCategories')->whereNull('parent_id')->get());
    }
}
