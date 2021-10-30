<?php

namespace App\Http\Controllers;

class SalesController extends Controller {
  private $paymentStatus = ['Paid', 'Unpaid', 'Partial'];

  public function index() {

    $sales = auth()->user()->shop->sales;

    $sales->transform(function ($sale) {
      return $sale->requiredFields();
    });

    return response(['status' => 'OK', 'sales' => $sales], 200);
  }

}
