<?php
namespace App\Http\Controllers\Marketplaces;

use App\Action;
use App\Marketplace;
use App\Filter;
use App\Product;
use Illuminate\Http\Request;

trait FiltersTrait
{

    public function filters($marketplace)
    {
        $marketplace = Marketplace::getMarketplace($marketplace);
        if (!$marketplace) {
            return $this->notFound();
        }

        $modifiers = $marketplace->modifiers()->orderBy('order', 'ASC');

        if ($modifiers->count() == 0) {
            return redirect('/marketplaces/'.$marketplace->id.'/filter/new');
        }

        return redirect('/marketplaces/'.$marketplace->id.'/filter/'.$modifiers->first()->id);
        //return view('marketplaces.filter', compact('marketplace', 'modifiers','current_modifier'));
    }

    public function filtersDetail($marketplace, $modifier)
    {

        $marketplace = Marketplace::getMarketplace($marketplace);
        if (!$marketplace) {
            return $this->notFound();
        }

        $modifiers = $marketplace->modifiers()->get();

        $current_modifier = $marketplace->modifiers()->where('marketplace_id', $marketplace->id)->where('id', $modifier)->first();

        // Error
        if (!$current_modifier) {
            return $this->notFound('/marketplaces/'.$marketplace->id.'/filter', 'Filter not found, or no sufficient rights');
        }

        $filter_methods = Filter::getAvailableFilterMethods();
        $action_methods = Action::getAvailableActions();
        $productColumns = Product::getColumnKeys(true);

        $filtercontent = $current_modifier->filters()->get()->toArray();
        $actioncontent = $current_modifier->actions()->get()->toArray();

        return view('marketplaces.filter', compact('marketplace', 'modifiers', 'current_modifier', 'productColumns', 'filter_methods','action_methods', 'filtercontent', 'actioncontent'));
    }

    public function newFilter($id)
    {
        $marketplace = currentStore()->marketplaces()->where('id', $id)->first();
        $nextorder = $marketplace->modifiers()->getNextOrder();
        $modifier = $marketplace->modifiers()->create([
            'name' => 'Filter '.$nextorder,
            'order' => $nextorder
        ]);

        return redirect('/marketplaces/'.$marketplace->id.'/filter/'.$modifier->id);
    }


    public function saveFilter($marketplace, $modifier, Request $request)
    {
        $marketplace = currentStore()->marketplaces()->where('id', $marketplace)->first();
        if (!$marketplace) {
            flash('Not found', 'Marketplace not found or no sufficient authorization', 'error');
            return back();
        }
        $modifier = $marketplace->modifiers()->where('id', $modifier)->first();
        if (!$modifier) {
            flash('Not found', 'Modifier not found or no sufficient authorization', 'error');
            return back();
        }

        $post = $request->except('_token');

        // Transform data
        foreach ($post['field'] as $key => $value) {
            $filters[$key] = [ 'field' => $post['field'][$key],
                'filter' => $post['method'][$key],
                'value' => $post['value'][$key] ];
        }

        foreach ($post['actionfield'] as $key => $value) {
            $actions[$key] = [ 'field' => $post['actionfield'][$key],
                'action' => $post['actionaction'][$key],
                'value' => $post['actionvalue'][$key] ];
        }

        $this->storeFilters($modifier, $filters);
        $this->storeActions($modifier, $actions);

        return back();
    }

    private function storeFilters($modifier, $data)
    {
        foreach ($data as $key => $filter) {
            $modifier->filters()->where('id', $key)->update($filter);
        }
    }

    private function storeActions($modifier, $data)
    {
        foreach ($data as $key => $filter) {
            $modifier->actions()->where('id', $key)->update($filter);
        }
    }

    public function deleteFilter($marketplace, $modifier, $filter)
    {
        $marketplace = currentStore()->marketplaces()->where('id', $marketplace)->first();
        if (!$marketplace) {
            flash('Not found', 'Marketplace not found or no sufficient authorization', 'error');
            return back();
        }
        $modifier = $marketplace->modifiers()->where('id', $modifier)->first();
        if (!$modifier) {
            flash('Not found', 'Modifier not found or no sufficient authorization', 'error');
            return back();
        }
        $filter = $modifier->filters()->where('id', $filter)->first();
        if (!$filter) {
            flash('Not found', 'Filter not found or no sufficient authorization', 'error');
            return back();
        }

        $filter->delete();
        flash('Filter removed', 'The filter has succesfully been removed.', 'success');
        return back();
    }

    public function deleteModifier($marketplace, $modifier)
    {
        $marketplace = currentStore()->marketplaces()->where('id', $marketplace)->first();
        if (!$marketplace) {
            flash('Not found', 'Marketplace not found or no sufficient authorization', 'error');
            return back();
        }
        $modifier = $marketplace->modifiers()->where('id', $modifier)->first();
        if (!$modifier) {
            flash('Not found', 'Modifier not found or no sufficient authorization', 'error');
            return back();
        }

        $modifier->delete();
        flash('Filter removed', 'The filter has succesfully been removed.', 'success');
        return redirect('/marketplaces/'.$marketplace->id.'/filter');
    }

    public function addAndFilter($marketplace, $modifier)
    {

        $marketplace = Marketplace::find($marketplace);
        if (!$marketplace) {
            flash('Not found', 'Marketplace not found or no sufficient authorization', 'error');
            return back();
        }

        $modifier = $marketplace->modifiers()->where('id', $modifier)->first();
        if (!$modifier) {
            flash('Not found', 'Modifier not found or no sufficient authorization', 'error');
            return back();
        }

        $modifier->filters()->create([]);

        return back();
    }


    public function addAction($marketplace, $modifier)
    {

        $marketplace = Marketplace::find($marketplace);
        if (!$marketplace) {
            flash('Not found', 'Marketplace not found or no sufficient authorization', 'error');
            return back();
        }

        $modifier = $marketplace->modifiers()->where('id', $modifier)->first();
        if (!$modifier) {
            flash('Not found', 'Modifier not found or no sufficient authorization', 'error');
            return back();
        }

        $modifier->actions()->create([]);

        return back();
    }

    public function deleteAction($marketplace, $modifier, $action)
    {
        $marketplace = currentStore()->marketplaces()->where('id', $marketplace)->first();
        if (!$marketplace) {
            flash('Not found', 'Marketplace not found or no sufficient authorization', 'error');
            return back();
        }
        $modifier = $marketplace->modifiers()->where('id', $modifier)->first();
        if (!$modifier) {
            flash('Not found', 'Modifier not found or no sufficient authorization', 'error');
            return back();
        }

        $action = $modifier->actions()->where('id', $action)->first();
        if (!$action) {
            flash('Not found', 'Filter not found or no sufficient authorization', 'error');
            return back();
        }

        $action->delete();
        flash('Filter removed', 'The filter has succesfully been removed.', 'success');
        return redirect('/marketplaces/'.$marketplace->id.'/filter/'.$modifier);
    }
}
