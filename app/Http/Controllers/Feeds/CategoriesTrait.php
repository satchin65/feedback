<?php
namespace App\Http\Controllers\Feeds;

use App\Category;
use App\CategoryFilter;
use App\Feed;
use App\Marketplace;
use App\Filter;
use App\Product;
use Illuminate\Http\Request;

trait CategoriesTrait
{

    public function categories($id, $type = 'feed')
    {
        if ($type == 'feed')
            $entity = Feed::getFeed($id); $feed = $entity;

        if ($type == 'marketplace')
            $entity = Marketplace::getMarketplace($id); $marketplace = $entity;

        if (!$entity)
            return $this->notFound();

        $categories = $entity->categoryFilters()->get();

        $filter_methods = Filter::getAvailableFilterMethods();
        $product_columns = Product::getColumnKeys(true);

        if ($type == 'feed')
            return view('feeds.categories', compact('entity', 'feed', 'categories', 'filter_methods', 'product_columns'));
        if ($type == 'marketplace')
            return view('marketplace.categories', compact('entity', 'marketplace',  'categories', 'filter_methods', 'product_columns'));
    }


    public function get_categories($id, $type = 'feed')
    {
        if ($type == 'feed')
            $entity = Feed::getFeed($id);
        if ($type == 'marketplace')
            $entity = Marketplace::getMarketplace($id);

        if (!$entity)
            return $this->notFound();

        $categories = $entity->categoryFilters()->with('category')->get();
        return $categories;
    }

    public function post_categories($id, $type = 'feed', Request $request)
    {
        if ($type == 'feed')
            $entity = Feed::getFeed($id);
        if ($type == 'marketplace')
            $entity = Marketplace::getMarketplace($id);

        if (!$entity)
            return $this->notFound();

        $payload = $request->all();

        foreach($payload as $category)
        {
            $cat = CategoryFilter::find($category['id']);
            $cat->field = $category['field'];
            $cat->filter = $category['filter'];
            $cat->value = $category['value'];
            $cat->order = $category['order'];
            $cat->active = $category['active'];
            $cat->category_id = $category['category_id'];
            $cat->save();
        }

        if ($type == 'feed')
            $entity->cleanProcessedProducts(true);

        return ['status' => 'success'];

    }

    public function post_main_category($id, $type = 'feed', Request $request)
    {
        if ($type == 'feed')
            $entity = Feed::getFeed($id);
        if ($type == 'marketplace')
            $entity = Marketplace::getMarketplace($id);

        if (!$entity)
            return $this->notFound();

        $payload = $request->all();
        $entity->category_id = $payload['id'];
        $entity->save();
    }
    public function get_main_category($id, $type = 'feed')
    {
        if ($type == 'feed')
            $entity = Feed::getFeed($id);
        if ($type == 'marketplace')
            $entity = Marketplace::getMarketplace($id);

        if (!$entity)
            return $this->notFound();

        return $entity->category;
    }

    public function new_category($id, $type = 'feed')
    {
        if ($type == 'feed')
            $entity = Feed::getFeed($id);
        if ($type == 'marketplace')
            $entity = Marketplace::getMarketplace($id);

        if (!$entity)
            return $this->notFound();

        $category = $entity->categoryFilters()->orderBy('order', 'DESC')->first();
        $neworder = 1;
        if($category)
            $neworder = $category->order + 1;

        $entity->categoryFilters()->create([
            'order' => $neworder
        ]);

        $categories = $entity->categoryFilters()->with('category')->get();
        return $categories;
    }

    public function search_categories($enitity, Request $request)
    {
        $categories = Category::where('entity', $enitity)->where('label', 'LIKE', '%' . $request->input('q') . '%')->take(10)->get();
        return $categories;
    }
}