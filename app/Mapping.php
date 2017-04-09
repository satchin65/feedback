<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Mapping extends Model
{

    public static function createMapping($connection, $mapping, $basic_columns)
    {
        // Delete all maps
        Mapping::where('connection_id', $connection->id)->delete();


        foreach ($mapping as $xmlkey => $values) {


            if(isset($values['custom']) && $values['custom'] == 1)
            {
                self::_addMapping($connection, $xmlkey, $values['custom_value'],$basic_columns);
            }else {
                self::_addMapping($connection, $xmlkey, $values['value'],$basic_columns);
            }

        }

        $connection->active = 1;
        $connection->save();
        $connection->startImport();
        flash('Mapping saved', 'Mapping has been saved and new import has been started','success');
        return redirect('/connections');
    }



    private static function _checkForDuplicateTargets($id, $target)
    {
        $map = Mapping::where('connection_id', $id)->where('target', $target);
        if ($map->count()) {
            flash('Duplicate fields', 'You used duplicated target fields, which is not allowed','error');
            return redirect('/connections/'.$id.'/mapping');
        }
    }

    public static function getMapping($connection)
    {
        $mappings = Mapping::where('connection_id', $connection->id)->orderBy('custom','ASC')->pluck('source','target');
        if(!$mappings)
            return [];
        return $mappings->toArray();
    }

    private static function _addMapping($connection, $xmlkey, $target, $basic_columns)
    {
        self::_checkForDuplicateTargets($connection->id, $target);

        $new_map = new Mapping;
        $new_map->connection_id = $connection->id;
        $new_map->source = $xmlkey;
        $new_map->target = $target;
        if (in_array($target, $basic_columns)) {
            $new_map->custom = false;
        } else {
            $new_map->custom = true;
        }
        $new_map->save();
    }
}
