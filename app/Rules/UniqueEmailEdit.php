<?php

namespace App\Rules;

use App\Models\User;
use Illuminate\Contracts\Validation\Rule;

class UniqueEmailEdit implements Rule
{

    private $params;

    public function __construct($params)
    {
        $this->params = $params;
    }

    public function passes($attribute, $value)
    {
        $user = User::select('email')->where([['id', '!=', $this->params['id']], [$attribute, $value]])->first();
        return is_null($user);
    }

    public function message()
    {
        return 'This email is already taken.';
    }
}
