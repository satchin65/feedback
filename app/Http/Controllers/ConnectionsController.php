<?php

namespace App\Http\Controllers;

use App\Connection;
use App\Connections\xmlParser;
use App\Events\FinishedProductImport;
use App\Mapping;
use App\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use App\Http\Requests;

class ConnectionsController extends Controller
{

    public function index()
    {
        $connections = currentStore()->connections()->paginate(3);

        return view('connections.index', compact('connections'));

    }


    public function create()
    {
        $connection = new Connection;
        return view('connections.create', compact('connection'));
    }


    public function add(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|max:255',
            'feed_url' => 'required|active_url',
        ]);

        $connection = new Connection($request->except('_token'));
        $connection->store_id = currentStore()->id;
        $connection->connection_type_id = 1;
        if (!$connection->checkForValidFeed()) {
            $connection->delete();
            return back();
        }
        $connection->save();

        flash('Connection added', 'Connection verified and succesfully added', 'success');
        return redirect('/connections/'.$connection->id);
    }

    public function update(Connection $connection, Request $request)
    {
        $this->validate($request, [
            'name' => 'required|max:255',
            'feed_url' => 'required|active_url',
        ]);
        if (!$connection->checkForValidFeed($request->input('feed_url'))) {
            return back();
        }
        $connection->name = $request->input('name');
        $connection->feed_url = $request->input('feed_url');
        $connection->hour = $request->input('hour');
        $connection->minute = $request->input('minute');
        $connection->active = $request->input('active');
        if(!$request->input('active'))
        {
            $connection->active = 0;
        }
        $connection->save();
        $connection->makeSchedule();

        if($connection->mappings->count()<1)
        {
            flash('Connection saved', 'Map your feed in order to active the connection', 'success');
            return redirect('/connections/'.$connection->id.'/mapping');
        }

        flash('Connection saved', 'Connection verified and succesfully saved', 'success');
        return redirect('/connections');
    }


    public function edit($id)
    {
        $connection = Connection::find($id);
        if (!$connection) {
            flash('Not found', 'Connection not found', 'error');
            return back();
        }

        if (!$connection->isAllowed()) {
            flash('Not allowed', 'You are not allowed to change this connection', 'error');
            return back();
        }

        return view('connections.create', compact('connection'));
    }


    public function delete($id)
    {
        $connection = currentStore()->connections()->where('id', $id)->first();
        if (!$connection) {
            flash('Connection not found', 'Your connection has not been found', 'error');
            return back();
        }
        $connection->delete();

        flash('Connection removed', 'Your connection has been removed', 'success');
        return redirect('/connections');
    }



    public function mapping($id, xmlParser $xmlParser)
    {
        $connection = currentStore()->connections()->where('id', $id)->first();
        if (!$connection) {
            flash('Connection not found', 'Your connection has not been found', 'error');
            return back();
        }
        // Get basic product table column keys for mapping setup
        $columns = Product::getColumnKeys();

        // Get the keys used in the XML File
        $results = $xmlParser->_ParseXmlFile($connection->feed_url);
        $xmlKeys = array_keys($results[0]);
        $keys_matches = $this->_getKeyMatches($xmlKeys, $columns);
        $mappings = Mapping::getMapping($connection);


        return view('connections.mapping', compact('connection','xmlKeys','keys_matches','mappings','columns'));
    }

    public function resetMapping($id)
    {
        $connection = currentStore()->connections()->where('id', $id)->first();
        if (!$connection) {
            flash('Connection not found', 'Your connection has not been found', 'error');
            return back();
        }
        $connection->mappings()->delete();

        flash('Mapping reset', 'Mappings removed and re-evaluated', 'success');
        return redirect('/connections/'.$id.'/mapping');
    }


    public function storeMapping($id, Request $request)
    {

        $connection = Connection::find($id);
        $mapping = $request->except('_token');
        $basic_columns = Schema::getColumnListing('products');

        return Mapping::createMapping($connection,$mapping,$basic_columns);

    }


    private function _getKeyMatches($xml_keys, $columns)
    {


        // First value is column name
        // all the rest are synonyms
        $synos['name'] = ['name','title','titel','naam','product','name'];
        $synos['color'] = ['color','colour','kleur'];
        $synos['material'] = ['materiaal','stoffen','stof'];
        $synos['ean'] = ['ean','ean_code','eancode'];
        $synos['description'] = ['description','descriptions','omschrijving'];
        $synos['delivery_time'] = ['levertijd','bezorgtijd'];
        $synos['price'] = ['price','prijs','bedrag','price','g:price'];
        $synos['stock'] = ['stock','qty','aantal','voorraad','vooraad'];
        $synos['gender'] = ['gender','sexe'];
        $synos['url'] = ['url','link','product_link','url','productlink'];
        $synos['sku'] = ['sku','product_id','id','g:id'];
        $synos['brand'] = ['brand','manufacturer','merk','fabrikant','g:brand'];
        $synos['image_link'] = ['image_link','g:image_link','image','productimage','photo','base_img','img','afbeelding_url','afbeelding'];
        $synos['additional_images'] = ['additional_images','image2','g:additional_image','additional_image','images'];

        foreach ($xml_keys as $keys) {
            $array[$keys] = '';
            // Check if there is a synonym
            foreach ($synos as $sym) {
                if (in_array($keys, $sym)) {
                    $found = $sym;
                }
            }

            if (isset($found) && $found) {
                $array[$keys] = $found[0];
                $array_found[] = $found[0];
            }
            if (in_array($keys, $columns)) {
                $array[$keys] = $keys;
                $array_found[] = $keys;
            }
            unset($found);
        }


        // Get all not chosen colums that are available
        $other_columns = array_diff($columns, $array_found);

        foreach ($other_columns as $col) {
            $array[$col] = '';
        }

        return $array;
    }


    public function startImport($id)
    {
        $connection = currentStore()->connections()->where('id',$id)->first();

        if(!$connection){
            flash('Not allowed', 'You are not allowed to change this connection', 'error');
            return back();
        }

        if($connection->mappings()->count() == 0){
            flash('Create mapping first', 'In order to start the import process please finish mapping your feed', 'error');
            return redirect('/connections/'.$connection->id.'/mapping');
        }

        if(! $connection->active){
            flash('Connection inactive', 'The connection is inactive and cannot be run', 'error');
            return back();
        }

        $connection->startImport();
        flash('Import scheduled', 'You\'re import is scheduled and ready to start', 'success');
        return redirect('/connections');
    }

    public function importStatus($id)
    {
        $connection = currentStore()->connections()->where('id',$id)->first();
        if(!$connection)
            return 0;

        if($connection->scheduled || $connection->running)
            return 1;

        if($connection->failed)
            return 2;

        return 0;
    }

    public function addCustomField($id)
    {

    }

}
