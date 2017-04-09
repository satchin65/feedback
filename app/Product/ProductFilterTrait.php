<?php
namespace App\Product;


trait ProductFilterTrait
{


    public function scopeProcessMarketplaceFilters($query, $marketplace)
    {

        $products = $query->get()->toArray();

        $this->processProductsArray($products,$marketplace);
    }

    public function processProductsArray($products, $marketplace)
    {

        $modifiers = $marketplace->modifiers()->get();

        $categories = $marketplace->categoryFilters()->get();

        if($categories)
            $products = $this->setCategoryFields($products, $categories, $marketplace);


        foreach ($modifiers as $mod) {
            $filters = $mod->filters()->get();

            foreach ($mod->actions()->get() as $action){

                switch ($action->action) {
                    case 'exclude':
                        $products = $this->filterRejectedValues($products, $filters);
                    case 'set':
                        $products = $this->setValues($products, $filters, $action);
                    case 'calculate_add':
                        if(is_a($products,'Illuminate\Support\Collection'))
                            $products = $products->toArray();

                        $products = $this->calculateAdd($products, $filters, $action);
                    default:
                        //$products = $this->filterRejectedValues($products, $filters);
                        break;

                        /*set
                        append
                        copy
                        combine
                        find
                        replace
                        textsplit
                        maxlength
                        texttransform*/
                }

            }

        }
        // Returns array of products.

        return $products;
    }



    /**
     * Reject the filters on this modifier / action set
     *
     * @param $query
     * @param $filters
     * @return mixed
     */
    private function filterRejectedValues($products, $filters)
    {

        $products = collect($products);

        foreach ($filters as $filter) {

            $products = $products->reject(function($product) use($filter){
                if($this->filterValue($filter,$product))
                return $this->filterValue($filter,$product);
            });

        }
        return $products;
    }


    private function filterValue($filter,$product)
    {
        $product_attributes = $product['attributes'];
        if($product_attributes){
            foreach($product_attributes as $key => $value) {
                $product = array_add($product, key($value), $value[key($value)]);
            }
        }


        switch ($filter->filter) {
            case 'greater_then' :
                if(isset($product[$filter->field]) && $product[$filter->field] > $filter->value)

                    return true;
            break;
            case 'lower_then' :
                if($product[$filter->field] < $filter->value)

                    return true;
            break;
            case 'equal' :
                if($product[$filter->field] == $filter->value)

                    return true;
            break;
            case 'contains' :
                if(preg_match('/'.$filter->value.'/', $product[$filter->field]))

                    return true;
            break;
            case 'not_contains' :
                if(!preg_match('/'.$filter->value.'/', $product[$filter->field]))

                    return true;
            break;
            case 'is_not' :
                if($product[$filter->field] != $filter->value)
                    return true;
            break;
        }
        return false;
    }

    //////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////

    private function setValues($products, $filters, $action)
    {
        foreach ($filters as $filter) {
            foreach ($products as $key => $value){
                if ($this->filterValue($filter, $products[$key])) {
                    $products[$key][$action->field] = $action->value;
                }
            }
        }

        return $products;
    }

    private function setCategoryFields($products, $categories, $marketplace)
    {
        $gotCat=0;
        foreach ($products as $key => $value){
            foreach ($categories as $category) {
                if ($this->filterValue($category, $products[$key])) {
                    $products[$key]['category'] = $category->category->label;
                    $gotCat=1;
                }

            }
            // else get default
            if($gotCat==0) {
                if ($marketplace->category)
                    $products[$key]['category'] = $marketplace->category->label;
            }

            $gotCat=0;
        }

        return $products;
    }

    private function calculateAdd($products, $filters, $action)
    {
        foreach ($filters as $filter) {

            foreach ($products as $key => $value){
                if ($this->filterValue($filter, $products[$key])) {
                    $products[$key][$action->field] = $products[$key][$action->field]+$action->value;
                }
            }

        }

        return $products;
    }




}
