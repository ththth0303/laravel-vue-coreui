<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = [
        'id',
        'parent_id',
        'name',
    ];

    public function products()
    {
        return $this->hasMany(Product::class);
    }
    
    public function subCategories()
    {
        return $this->hasMany(Category::class, 'parent_id', 'id');
    }
}
