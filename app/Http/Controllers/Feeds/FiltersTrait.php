<?php
namespace App\Http\Controllers\Feeds;

use App\Action;
use App\Feed;
use App\Filter;
use App\Product;
use Illuminate\Http\Request;

trait FiltersTrait
{

    public function filters($feed)
    {

        $feed = Feed::getFeed($feed);
        if (!$feed) {
            return $this->notFound();
        }

        $modifiers = $feed->modifiers()->orderBy('order', 'ASC');

        if ($modifiers->count() == 0) {
            return redirect('/feeds/'.$feed->id.'/filter/new');
        }

        return redirect('/feeds/'.$feed->id.'/filter/'.$modifiers->first()->id);
        //return view('marketplaces.filter', compact('marketplace', 'modifiers','current_modifier'));
    }

    public function filtersDetail($feed, $modifier)
    {

        $feed = Feed::getFeed($feed);
        if (!$feed) {
            return $this->notFound();
        }

        $modifiers = $feed->modifiers()->get();

        $current_modifier = $feed->modifiers()->where('feed_id', $feed->id)->where('id', $modifier)->first();

        // Error
        if (!$current_modifier) {
            return $this->notFound('/feeds/'.$feed->id.'/filter', 'Filter not found, or no sufficient rights');
        }

        $filter_methods = Filter::getAvailableFilterMethods();
        $action_methods = Action::getAvailableActions();
        $productColumns = Product::getAllColumnKeys(true);

        $filtercontent = $current_modifier->filters()->get()->toArray();
        $actioncontent = $current_modifier->actions()->get()->toArray();

        return view('feeds.filter', compact('feed', 'modifiers', 'current_modifier', 'productColumns', 'filter_methods','action_methods', 'filtercontent', 'actioncontent'));
    }

    public function newFilter($id)
    {
        $feed = currentStore()->feeds()->where('id', $id)->first();
        $nextorder = $feed->modifiers()->getNextOrder();
        $modifier = $feed->modifiers()->create([
            'name' => 'Filter '.$nextorder,
            'order' => $nextorder
        ]);
        $feed->cleanProcessedProducts(true);

        return redirect('/feeds/'.$feed->id.'/filter/'.$modifier->id);
    }


    public function saveFilter($feed, $modifier, Request $request)
    {
        $feed = currentStore()->feeds()->where('id', $feed)->first();
        if (!$feed) {
            flash('Not found', 'Feed not found or no sufficient authorization', 'error');
            return back();
        }
        $modifier = $feed->modifiers()->where('id', $modifier)->first();
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
        $feed->cleanProcessedProducts(true);

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

    public function deleteFilter($feed, $modifier, $filter)
    {
        $feed = currentStore()->marketplaces()->where('id', $feed)->first();
        if (!$feed) {
            flash('Not found', 'Feed not found or no sufficient authorization', 'error');
            return back();
        }
        $modifier = $feed->modifiers()->where('id', $modifier)->first();
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

    public function deleteModifier($feed, $modifier)
    {
        $feed = currentStore()->marketplaces()->where('id', $feed)->first();
        if (!$feed) {
            flash('Not found', 'Feed not found or no sufficient authorization', 'error');
            return back();
        }
        $modifier = $feed->modifiers()->where('id', $modifier)->first();
        if (!$modifier) {
            flash('Not found', 'Modifier not found or no sufficient authorization', 'error');
            return back();
        }

        $modifier->delete();
        flash('Filter removed', 'The filter has succesfully been removed.', 'success');
        return redirect('/feeds/'.$feed->id.'/filter');
    }

    public function addAndFilter($feed, $modifier)
    {

        $feed = Feed::find($feed);
        if (!$feed) {
            flash('Not found', 'Feed not found or no sufficient authorization', 'error');
            return back();
        }

        $modifier = $feed->modifiers()->where('id', $modifier)->first();
        if (!$modifier) {
            flash('Not found', 'Modifier not found or no sufficient authorization', 'error');
            return back();
        }

        $modifier->filters()->create([]);

        return back();
    }


    public function addAction($feed, $modifier)
    {

        $feed = Feed::find($feed);
        if (!$feed) {
            flash('Not found', 'Feed not found or no sufficient authorization', 'error');
            return back();
        }

        $modifier = $feed->modifiers()->where('id', $modifier)->first();
        if (!$modifier) {
            flash('Not found', 'Modifier not found or no sufficient authorization', 'error');
            return back();
        }

        $modifier->actions()->create([]);

        return back();
    }

    public function deleteAction($feed, $modifier, $action)
    {
        $feed = currentStore()->marketplaces()->where('id', $feed)->first();
        if (!$feed) {
            flash('Not found', 'Feed not found or no sufficient authorization', 'error');
            return back();
        }
        $modifier = $feed->modifiers()->where('id', $modifier)->first();
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
        return redirect('/feeds/'.$feed->id.'/filter/'.$modifier);
    }
}
