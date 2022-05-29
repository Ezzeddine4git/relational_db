<?php

namespace App\Http\Services;

use App\Models\User;

class UserService
{
    public function are_friends(User $user1, User $user2) {
        if($user1->friended->contains($user2->id) ||$user2->friended->contains($user1->id)) {
            return true;
        } else {
            return false;
        }
    }

    public function friends(User $user) {
        $friends = $user->friends()->get();
        $friended = $user->friended()->get();
        return $friended->merge($friends);
    }
}
