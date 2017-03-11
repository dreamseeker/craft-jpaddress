<?php
/**
 * JpAddress plugin for Craft CMS
 *
 * This is a generic Craft CMS plugin
 *
 * @author    TORU KOKUBUN
 * @copyright Copyright (c) 2016 TORU KOKUBUN
 * @link      http://d-s-b.jp/
 * @package   JpAddress
 * @since     1.0.0
 */

namespace Craft;

class JpAddressPlugin extends BasePlugin
{
    /**
     * @return mixed
     */
    public function init()
    {
    }

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
    public function getDescription()
    {
        return Craft::t('Japanese Address FieldType for Craft CMS');
    }

    /**
     * @return string
     */
    public function getDocumentationUrl()
    {
        return 'https://github.com/dreamseeker/craft-jpaddress/blob/master/README.md';
    }

    /**
     * @return string
     */
    public function getReleaseFeedUrl()
    {
        return 'https://raw.githubusercontent.com/dreamseeker/craft-jpaddress/master/releases.json';
    }

    /**
     * @return string
     */
    public function getVersion()
    {
        return '1.0.1';
    }

    /**
     * @return string
     */
    public function getSchemaVersion()
    {
        return '1.0.0';
    }

    /**
     * @return string
     */
    public function getDeveloper()
    {
        return 'Toru Kokubun';
    }

    /**
     * @return string
     */
    public function getDeveloperUrl()
    {
        return 'https://github.com/dreamseeker';
    }

    /**
     * @return bool
     */
    public function hasCpSection()
    {
        return false;
    }

    /**
     */
    public function onBeforeInstall()
    {
    }

    /**
     */
    public function onAfterInstall()
    {
    }

    /**
     */
    public function onBeforeUninstall()
    {
    }

    /**
     */
    public function onAfterUninstall()
    {
    }

    /**
     * @return array
     */
    protected function defineSettings()
    {
        return array(
            'useGoogleMap' => array(AttributeType::Bool, 'default' => 1, 'required' => true),
            'googleMapsApiKey' => array(AttributeType::String, 'default' => ''),
        );
    }

    /**
     * @return mixed
     */
    public function getSettingsHtml()
    {
        return craft()->templates->render('jpaddress/fields/JpAddressFieldType_Settings', array(
            'settings' => $this->getSettings()
        ));
    }

    /**
     * @param mixed $settings The Widget's settings
     *
     * @return mixed
     */
    public function prepSettings($settings)
    {
        // Modify $settings here...

        return $settings;
    }
}
