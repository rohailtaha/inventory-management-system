<?php

namespace App\Http\Controllers;

class PurchasesController extends Controller {
  public function index() {

    $purchases = auth()->user()->shop->purchases;

    $purchases->transform(function ($purchase) {
      return $purchase->requiredFields();
    });

    return response(['status' => 'OK', 'purchases' => $purchases], 200);
  }
}
