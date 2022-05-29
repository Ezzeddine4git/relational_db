<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Services\UserService;
use Illuminate\Http\Request;

class UserController extends Controller
{   

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }


    public function index (Request $request) {
        return response()->json([
            'status' => 200,
            'data' => User::all()
        ], 200);
    }

    public function add_friend(User $user) {
        if (!$this->userService->are_friends(auth()->user(), $user)) {
            auth()->user()->friended()->attach($user);
            return response()->json([
                'status' => 200,
                'message' => 'Friend added'
            ], 200);
        } else {
            return response()->json([
                'status' => 200,
                'message' => 'Already friends'
            ], 200);
        }
    }

    public function friends_list(User $user) {
        return response()->json([
            'status' => 200,
            'data' => $this->userService->friends($user)
        ]);
    }
}
