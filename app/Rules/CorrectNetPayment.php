<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class CorrectNetPayment implements Rule {

  private $payment_received;
  private $payment_returned;

  public function __construct($payment_received, $payment_returned) {
    $this->payment_received = $payment_received;
    $this->payment_returned = $payment_returned;
  }

  public function passes($attribute, $value) {
    return $value === $this->payment_received - $this->payment_returned;
  }

  public function message() {
    return 'The net payment is not correct. It must be difference of received and returned payment.';
  }
}
