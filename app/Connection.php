<?php

namespace App;

use App\Jobs\processXmlConnection;
use DOMDocument;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Connection extends Model
{
    protected $fillable = ['name','feed_url'];

    public function connection_type()
    {
        return $this->belongsTo(ConnectionType::class);
    }

    public function mappings()
    {
        return $this->hasMany(Mapping::class);
    }

    public function store()
    {
        return $this->belongsTo(Store::class);
    }

    public function account()
    {
        return $this->store->account;
    }

    public function startImport()
    {
        // Check if job is already running or scheduled and stop if so
        if($this->scheduled || $this->running || ! $this->active)
            return false;
        
        dispatch(new processXmlConnection($this));
    }

    public function isAllowed()
    {
        if (currentStore()->id != $this->store_id) {
            return false;
        }
        return true;
    }


    public function checkForValidFeed($url = null)
    {
        if(! $url)
            $url = $this->feed_url;

        if ($this->get_http_response_code($url) != '200' || !$this->isXMLContentValid(file_get_contents($url))) {
            flash('no valid feed', 'The feed you added is not valid', 'error');
            return false;
        }
        return true;
    }

    public function get_http_response_code($url) {
        $headers = get_headers($url);
        return substr($headers[0], 9, 3);
    }

    public function isXMLContentValid($xmlContent, $version = '1.0', $encoding = 'utf-8')
    {
        if (trim($xmlContent) == '') {
            return false;
        }

        libxml_use_internal_errors(true);

        $doc = new DOMDocument($version, $encoding);
        $doc->loadXML($xmlContent);

        $errors = libxml_get_errors();
        libxml_clear_errors();

        return empty($errors);
    }


    public function process_connection()
    {
        if (!$this->mappings()) {
            die('error');
        }
    }

    public function makeSchedule()
    {
        $current_date = Carbon::now();

        $schedule_date = Carbon::now()->year($current_date->year)
            ->month($current_date->month)
            ->day($current_date->day)
            ->hour($this->hour)
            ->minute($this->minute)
            ->second(0);

        $new_date = $schedule_date;
        if($schedule_date < $current_date){
            $new_date = $schedule_date->addDay();
        }

        $this->scheduled_at = $new_date;
        $this->save();
    }

}
