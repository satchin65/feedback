<?php

namespace App\Http\Controllers;

use App\Channelmapping\ChannelMapper;
use App\Marketplace;
use App\ProcessedProduct;
use App\Product;
use App\Http\Controllers\Marketplaces\FiltersTrait;
use Illuminate\Http\Request;
use App\Http\Requests;

class MarketplacesController extends Controller
{
    use FiltersTrait;

    protected $entities = ['Bol', 'Beslist'];

    public function index()
    {
        $marketplaces = currentStore()->marketplaces()->paginate(10);

        return view('marketplaces.index', compact('marketplaces'));
    }

    public function create()
    {
        $marketplace = new Marketplace();
        $entities = $this->entities;

        return view('marketplaces.create', compact('marketplace', 'entities'));
    }

    public function add(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|max:255',
            'entity' => 'required',
        ]);

        $marketplace = new Marketplace($request->except('_token'));
        $marketplace->store_id = currentStore()->id;
        $marketplace->active = 0;
        $marketplace->save();

        flash('Marketplace created', 'The marketplace has been created', 'success');
        return redirect('/marketplaces/'.$marketplace->id);
    }

    public function delete($id)
    {
        $marketplace = Marketplace::getMarketplace($id);
        if (!$marketplace) {
            return $this->notFound();
        };
        $marketplace->delete();

        flash('Marketplace removed', 'Your marketplace has been removed', 'success');
        return redirect('/marketplaces');
    }

    public function edit($id)
    {
        $marketplace = Marketplace::getMarketplace($id);
        if (!$marketplace) {
            return $this->notFound();
        };

        $entities = $this->entities;
        $entityClass = $this->getEntity($marketplace);
        $attributes = json_decode($marketplace->attributes, 1);

        $productColumns = Product::getColumnKeys(true);

        return view('marketplaces.create', compact('marketplace', 'entities', 'entityClass', 'attributes', 'productColumns'));
    }

    public function update(Request $request, $id)
    {
        $marketplace = Marketplace::getMarketplace($id);
        if (!$marketplace) {
            return $this->notFound();
        }

        $marketplace->name = $request->input('name');
        $marketplace->identifier = $request->input('identifier');
        $marketplace->attributes = json_encode($request->input('attributes'));
        $marketplace->save();

        flash('Saved', 'Credentials have been saved!', 'success');
        return redirect('/marketplaces/'.$marketplace->id);
    }

    public function mapping($id)
    {
        $marketplace = Marketplace::getMarketplace($id);
        if (!$marketplace) {
            return $this->notFound();
        }

        $mapping = new ChannelMapper($marketplace, 'marketplace');
        $requiredFields = $mapping->getRequiredFields();
        $productColumns = Product::getColumnKeys(true);
        $channelmappings = $marketplace->getChannelmappings();

        return view('marketplaces.mapping', compact('marketplace', 'requiredFields', 'productColumns', 'channelmappings'));
    }

    public function saveMapping($id, Request $request)
    {
        $marketplace = Marketplace::getMarketplace($id);
        if (!$marketplace) {
            return $this->notFound();
        }

        $mapping = new ChannelMapper($marketplace, 'marketplace');
        $mapping->storeChannelMapping($request->except('_token'));

        flash('Saved', 'Mapping saved!', 'success');
        return redirect('/marketplaces/'.$marketplace->id.'/mapping');
    }

    public function preview($id, $status = '')
    {
        $marketplace = Marketplace::getMarketplace($id);
        if (!$marketplace) {
            return $this->notFound();
        }

        $mapping = new ChannelMapper($marketplace, 'marketplace');
        $mapping->CheckRequiredFields();

        $requiredfields = $mapping->getRequiredFields();

        $products = $marketplace->processedProducts();
            if($status == 'success'){ $products = $products->where('status','success'); }
            if($status == 'warning'){ $products = $products->where('status','warning'); }
            if($status == 'error'){ $products = $products->where('status','error'); }

        $products = $products->paginate(30);
        $total    = $marketplace->processedProducts()->count();
        $success  = $marketplace->processedProducts()->where('status','success')->count();
        $warning  = $marketplace->processedProducts()->where('status','warning')->count();
        $error    = $marketplace->processedProducts()->where('status','error')->count();

        return view('marketplaces.preview', compact('marketplace', 'products', 'requiredfields','success','warning','error','total','status'));
    }




    private function notFound($redirect = '/marketplaces', $error = '')
    {
        if ($redirect != '/marketplaces') {
            flash('Not found', $error, 'error');
            return redirect($redirect);
        }

        flash('Not found', 'Marketplace not found or no sufficient authorization', 'error');
        return redirect('/marketplaces');
    }

    private function getEntity($marketplace)
    {
        $entity = 'App\Marketplaces\Entities\\'.$marketplace->entity;
        $entityClass = new $entity();
        return $entityClass;
    }
}
