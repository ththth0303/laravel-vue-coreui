<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Hash;
use App\Http\Requests\Api\AddUserRequest;

class UserController extends Controller
{
    public function __construct(User $user) {
        $this->user = $user;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $perPage = 10;
        $perPage = $request->has('perPage') ? $request->perPage : $perPage;
        $user = $this->user->search($request->all())->paginate($perPage);

        return response()->json($user);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(AddUserRequest $request)
    {
        $user = $request->except('password');
        $user['password'] = Hash::make($request->password);
        if ($this->user->create($request->all())) {
            return response()->json(['message' => 'success']);
        }

        return response()->json(['message' => 'failed']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        return response()->json($user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        if ($user->fill($request->all())->save()) {
            return response()->json(['message' => 'success']);
        }
        
        return response()->json(['message' => 'failed']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        if ($user->delete()) {
            return response()->json(['message' => 'success']);
        }

        return response()->json(['message' => 'failed']);
    }
}
