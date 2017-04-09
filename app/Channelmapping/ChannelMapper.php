<?php

namespace App\Channelmapping;

use App\ChannelMap;
use App\ChannelMapping;
use App\Marketplace;

class ChannelMapper
{


    private $marketplace;
    private $type;

    /**
     * ChannelMapper constructor.
     * @param $marketplace
     * @param $type
     */
    public function __construct($marketplace, $type)
    {
        $this->type = $type;
        $this->marketplace = $marketplace;
    }


    public function getRequiredFields()
    {

        $maps = ChannelMap::where('entity', $this->marketplace->entity)->orderBy('order', 'ASC')->get();
        return $maps;
    }

    public function storeChannelMapping($request)
    {

        foreach ($request['map'] as $key => $value) {
            if(isset($request['value'])){
                $this->_storeFieldMap($key, $value, $request['value']);
            }else{
                $this->_storeFieldMap($key, $value);
            }


        }
    }

    private function _storeFieldMap($key, $value, $customvalue = '')
    {
        if ($field = $this->marketplace->channelmappings()->where('field', $key)->first()) {
            return $this->_saveMappingContent($field, $key, $value, $customvalue);
        }

        $newfield = new ChannelMapping();
        return $this->_saveMappingContent($newfield, $key, $value, $customvalue);
    }

    private function _saveMappingContent($field, $key, $value, $customvalue)
    {
        if($this->type == 'feed')
            $field->feed_id = $this->marketplace->id;
        if($this->type == 'marketplce')
            $field->marketplace_id = $this->marketplace->id;

        $field->field = $key;
        $field->source = $value;
        if ($value == 'custom') {
            $field->value = $customvalue[$key];
        }
        return $field->save();
    }

    /**
     * Check if all required fields are filled in!!
     *
     * @return bool
     */
    public function CheckRequiredFields()
    {
        $required = $this->_CheckRequiredFields_Array();
        $mappings = $this->marketplace->channelmappings()->get();
        $mappings = $mappings->map(function ($item) {
            return $item['field'];
        });

        $required->each(function ($item) use ($mappings) {
            if (!in_array($item, $mappings->toArray())) {

                return false;
            }
        });

        return true;
    }

    private function _CheckRequiredFields_Array()
    {
        $required = $this->getRequiredFields()->map(function ($item) {
            if ($item['required'] == 1) {
                return $item['field'];
            }
        });
        $required = $required->filter(function ($item) {
            if ($item) {
                return $item;
            }
        });

        return $required;
    }
}
