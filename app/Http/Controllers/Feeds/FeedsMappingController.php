<?php

namespace App\Http\Controllers\Feeds;

use App\Channelmapping\ChannelMapper;
use App\Product;
use Illuminate\Http\Request;
use App\Feed;
use App\Http\Controllers\Controller;

class FeedsMappingController extends Controller
{
    use FiltersTrait, CategoriesTrait;

    public function index($id)
    {
        $feed = Feed::getFeed($id);
        if (!$feed) {
            return $this->notFound();
        }

        $mapping = new ChannelMapper($feed, 'feed');
        $requiredFields = $mapping->getRequiredFields();
        $productColumns = Product::getAllColumnKeys(true);
        $channelmappings = $feed->getChannelmappings();

        return view('feeds.mapping', compact('feed', 'requiredFields', 'productColumns', 'channelmappings'));
    }

    public function store($id, Request $request)
    {
        $feed = Feed::getFeed($id);
        if (!$feed)
            return $this->notFound();

        $mapping = new ChannelMapper($feed, 'feed');
        $mapping->storeChannelMapping($request->except('_token'));

        $feed->cleanProcessedProducts(true);

        flash('Saved', 'Mapping saved!', 'success');
        return redirect('/feeds/'.$feed->id.'/mapping');
    }

}
