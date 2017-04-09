<?php

namespace App\Http\Controllers\Feeds;


use App\ProcessedFeedProduct;
use App\Product;
use Illuminate\Http\Request;
use App\Feed;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;
use Symfony\Component\Process\Process;


class FeedsController extends Controller
{
    use FiltersTrait, CategoriesTrait;

    protected $entities = ['Beslist','Google'];

    public function index()
    {
        $feeds = currentStore()->feeds()->paginate(10);

        return view('feeds.index', compact('feeds'));
    }

    public function create()
    {
        $feed = new Feed();
        $entities = $this->entities;

        return view('feeds.create', compact('feed', 'entities'));
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|max:255',
            'entity' => 'required',
        ]);

        $feed = new Feed($request->except('_token'));
        $feed->store_id = currentStore()->id;
        $feed->unique_filename = str_random(8);
        $feed->active = $request->input('active');
        $feed->save();
        $feed->unique_filename = str_random(8).currentStore()->id.str_random(8).$feed->id.str_random(4);
        $feed->save();

        flash('Feed created', 'The feed has been created', 'success');
        return redirect('/feeds/'.$feed->id);
    }

    public function destroy($id)
    {
        $feed = Feed::getFeed($id);
        if (!$feed) {
            return $this->notFound();
        };
        $feed->delete();

        flash('Feed removed', 'Your feed has been removed', 'success');
        return redirect('/feeds');
    }

    public function show($id)
    {
        $feed = Feed::getFeed($id);
        if (!$feed) {
            return $this->notFound();
        };

        $entities = $this->entities;
        $entityClass = $this->getEntity($feed);

        $productColumns = Product::getColumnKeys(true);

        return view('feeds.create', compact('feed', 'entities', 'entityClass', 'attributes', 'productColumns'));
    }

    public function update(Request $request, $id)
    {
        $feed = Feed::getFeed($id);
        if (!$feed) {
            return $this->notFound();
        }

        $feed->name = $request->input('name');
        $feed->active = $request->input('active');
        $feed->save();

        flash('Saved', 'Credentials have been saved!', 'success');
        return redirect('/feeds/'.$feed->id);
    }

    public function preview($id)
    {

        $feed = Feed::getFeed($id);

        $xml = $feed->generateFeed(50);

        //$feed->generateFeed();
        $products = Product::where('store_id',currentStore()->id)->paginate(30);
        $total    = $feed->processedProducts()->count();

        $success  = $feed->processedProducts()->count();

        $warning  = 0;
        $error    = 0;
        $status = '';

        return view('feeds.preview',compact('feed','xml','status','success','status','error','warning','total','products'));

    }

    public function getFile($hash,$filename)
    {
        $feed = Feed::where('unique_filename', str_replace('.xml','',$filename))->first();
        if(!$feed || $feed->store->folder_hash != $hash){
            return '404 File not found. ';
        }

        return Storage::get('files/'.$filename);
    }


    private function notFound($redirect = '/feeds', $error = '')
    {
        if ($redirect != '/feeds') {
            flash('Not found', $error, 'error');
            return redirect($redirect);
        }

        flash('Not found', 'Feed not found or no sufficient authorization', 'error');
        return redirect('/feeds');
    }

    private function getEntity($feed)
    {
        $entity = 'App\Feeds\Entities\\'.$feed->entity;
        $entityClass = new $entity();
        return $entityClass;
    }
}
