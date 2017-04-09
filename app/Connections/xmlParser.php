<?php

namespace App\Connections;

use Nathanmac\Utilities\Parser\Parser;

class xmlParser
{

    /**
     * Parse the xml url to an Array
     *
     * @param $feedurl // Url to the XML file
     * @return array
     */
    public function _ParseXmlFile($feedurl)
    {
        $parser = new Parser();
        $file = file_get_contents($feedurl);
        $parsed = $parser->xml($file);

        $results = $this->_getXmlChannel($parsed);
        return $results;
    }


    /**
     * This function gets the potential products from the product feed.
     * It looks up which field has the most ammount of childs being
     * potentially the correct one. This then gets returned.
     *
     * @param $parsed
     * @return mixed
     */
    public function _getXmlChannel($parsed)
    {
        // set current count to 0
        $count = 0;
        // Loop to channels
        foreach ($parsed as $parser) {
        // Get previous count te check deepest channel
            $previous = $count;
            $count = count($parser);
            // if new count is deeper pick that as result
            if ($count > $previous) {
                $result = $parser;
            }
            if (is_array($parser)) {
                foreach ($parser as $second_parser) {
                    $count = count($second_parser);
                    if ($count > $previous) {
                        $result = $second_parser;
                    }
                }
            }
        }

        return $result;
    }
}
