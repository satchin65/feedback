<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

class ProductsController extends Controller
{
    public function index()
    {
        $products = currentStore()->products()->paginate(30);

        return view('products.index', compact('products'));
    }


    public function show($id)
    {
        $product = currentStore()->products()->where('id', $id)->first();
        if (!$product) {
            flash('Product not found!', 'The product you try to find does not exist or you have no access to it', 'error');
            return back();
        }
        return view('products.show', compact('product'));
    }
}
