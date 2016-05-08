<?php
/**
 * JpAddress plugin for Craft CMS
 *
 * JpAddress FieldType
 *
 * @author    TORU KOKUBUN
 * @copyright Copyright (c) 2016 TORU KOKUBUN
 * @link      http://d-s-b.jp/
 * @package   JpAddress
 * @since     1.0.0
 */

namespace Craft;

class JpAddressFieldType extends BaseFieldType
{
    /**
     * @return mixed
     */
    public function getName()
    {
        return Craft::t('JP Address');
    }

    /**
     * @return mixed
     */
    public function defineContentAttribute()
    {
        return AttributeType::Mixed;
    }

    /**
     * @param string $name
     * @param mixed $value
     * @return string
     */
    public function getInputHtml($name, $value)
    {
        if (!$value)
            $value = new JpAddressModel();

        $id = craft()->templates->formatInputId($name);
        $namespacedId = craft()->templates->namespaceInputId($id);

        $pluginSettings = craft()->plugins->getPlugin('JpAddress')->getSettings();

        /* -- Include our Javascript & CSS */

        if ($pluginSettings['useGoogleMap']) {
            $apiKey = ($pluginSettings['googleMapsApiKey']) ? '?key=' . $pluginSettings['googleMapsApiKey'] : null;
            $apiUrl = 'https://maps.googleapis.com/maps/api/js' . $apiKey;
            craft()->templates->includeJsFile($apiUrl);
            craft()->templates->includeJsResource('jpaddress/js/library/JpAddressFieldType_GoogleMaps.js');
        }

        craft()->templates->includeJsFile('//jpostal-1006.appspot.com/jquery.jpostal.js');
        craft()->templates->includeCssResource('jpaddress/css/fields/JpAddressFieldType.css');
        craft()->templates->includeJsResource('jpaddress/js/fields/JpAddressFieldType.js');

        /* -- Variables to pass down to our field.js */

        $jsonVars = array(
            'id' => $id,
            'name' => $name,
            'namespace' => $namespacedId,
            'prefix' => craft()->templates->namespaceInputId(""),
        );

        $jsonVars = json_encode($jsonVars);
        craft()->templates->includeJs("$('#{$namespacedId}').JpAddressFieldType(" . $jsonVars . ");");

        /* -- Variables to pass down to our rendered template */

        $variables = array(
            'id' => $id,
            'name' => $name,
            'prefix' => craft()->templates->namespaceInputId(""),
            'element' => $this->element,
            'field' => $this->model,
            'values' => $value
        );

        $variables['options']['prefecture'] = $this->setPrefectureSelectOptions();
        $variables['settings']['useMap'] = $pluginSettings['useGoogleMap'];
        $variables['settings']['viewMap'] = ($value['latitude'] && $value['longitude']) ? true : false;

        return craft()->templates->render('jpaddress/fields/JpAddressFieldType.twig', $variables);
    }

    /**
     * @param mixed $value
     * @return mixed
     */
    public function prepValueFromPost($value)
    {
        return $value;
    }

    /**
     * @param mixed $value
     * @return mixed
     */
    public function prepValue($value)
    {
        $value = new JpAddressModel($value);
        return $value;
    }

    /**
     * @return mixed
     */
    public function setPrefectureSelectOptions()
    {
        $options = [[
            'label' => Craft::t('Please select'),
            'value' => ''
        ]];

        $prefecture = craft()->config->get('prefecture', 'jpaddress');

        foreach ($prefecture as $key => $value) {
            $options[] = [
                'label' => Craft::t($key),
                'value' => Craft::t($key)
            ];
        }
        return $options;
    }
}