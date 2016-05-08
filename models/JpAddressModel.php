<?php
/**
 * JpAddress plugin for Craft CMS
 *
 * JpAddress Model
 *
 * @author    TORU KOKUBUN
 * @copyright Copyright (c) 2016 TORU KOKUBUN
 * @link      http://d-s-b.jp/
 * @package   JpAddress
 * @since     1.0.0
 */

namespace Craft;

class JpAddressModel extends BaseModel
{
    /**
     * @return array
     */
    protected function defineAttributes()
    {
        return array_merge(parent::defineAttributes(), array(
            'postalCode' => array(AttributeType::String, 'default' => ''),
            'prefecture' => array(AttributeType::String, 'default' => ''),
            'cityStreet' => array(AttributeType::String, 'default' => ''),
            'building' => array(AttributeType::String, 'default' => ''),

            'latitude' => array(AttributeType::Mixed, 'default' => ''),
            'longitude' => array(AttributeType::Mixed, 'default' => ''),
            'zoomLevel' => array(AttributeType::Number, 'default' => 16),
        ));
    }

}