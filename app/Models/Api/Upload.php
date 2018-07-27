<?php

namespace App\Models\Api;

use Illuminate\Database\Eloquent\Model;

class Upload extends Model
{
    protected $fillable = [
        'name', 'path', 'memo',
    ];
}
