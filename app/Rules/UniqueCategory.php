<?php

namespace App\Rules;

use App\Models\Category;
use Illuminate\Contracts\Validation\Rule;

use function PHPUnit\Framework\isNull;

class UniqueCategory implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        $category = Category::where([['shop_id', auth()->user()->shop_id], [$attribute, $value]])->first();
        return is_null($category);
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'This category has already been added.';
    }
}
