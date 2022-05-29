<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Validator;

use function PHPUnit\Framework\isNull;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }
    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request){
    	$validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        if (! $token = auth()->attempt($validator->validated())) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        return $this->createNewToken($token);
    }
    /**
     * Register a User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|between:2,100',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|confirmed|min:6',
            'profile_picture' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'cover_picture' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);

        

        if($validator->fails()){
            return response()->json(
                ["error" => $validator->errors()->toJson()]
                , 422);
        }
        $user = User::create(array_merge(
                    $validator->validated(),
                    ['password' => bcrypt($request->password)]
        ));

        if($request->hasFile('profile_picture')) {
            $profile_picture = "profile_picture_" .$user->id."_".$request->file('profile_picture')->getClientOriginalName();
            $request->file('profile_picture')->move(public_path('images'), $profile_picture);
        } else {
            $profile_picture = 'https://avatars.dicebear.com/api/human/' .$request->name. '.svg';
        }

        if($request->hasFile('cover_picture')) {
            $cover_picture = "cover_picture_" .$user->id."_".$request->file('cover_picture')->getClientOriginalName();
            $request->file('cover_picture')->move(public_path('images'), $cover_picture);
        } else {
            $cover_picture = "https://source.unsplash.com/random/";
        }

        $user->profile_picture = $profile_picture;
        $user->cover_picture = $cover_picture;
        $user->save();

        
        return response()->json([
            'message' => 'User successfully registered',
            'user' => $user
        ], 201);
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout() {
        auth()->logout();
        return response()->json(['message' => 'User successfully signed out']);
    }
    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh() {
        return $this->createNewToken(auth()->refresh());
    }
    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function userProfile() {
        return response()->json(auth()->user());
    }
    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function createNewToken($token){
        return response()->json([
            'status' => 200,
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => auth()->user()
        ]);
    }
}