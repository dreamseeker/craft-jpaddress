<?php
/**
 * Address plugin for Craft CMS
 *
 * Address Translation
 *
 * @author    TORU KOKUBUN
 * @copyright Copyright (c) 2016 TORU KOKUBUN
 * @link      http://d-s-b.jp/
 * @package   Address
 * @since     1.0.0
 */

namespace Craft;

$translations = array(
    'JP Address' => '住所',
    'Japanese Address FieldType for Craft CMS' => '住所向けのフィールドタイプを追加します',
    'Postal Code' => '郵便番号',
    'If you enter a postal code, address is automatically inserted.' => '郵便番号を入力すると住所が自動挿入されます',
    'Prefecture name' => '都道府県名',
    'City name, Street Address' => '市区町村、地番',
    'Building name, etc.' => '建物名など',
    'Please select' => '選択してください',
    'Insert the map coordinates from the input address' => '入力した住所から地図座標をセット',
    'Latitude' => '緯度',
    'Longitude' => '経度',
    'Zoom Level' => 'ズームレベル',
    'Use Map?' => '地図の利用',
    'Please turn on if you use Google Map' => 'Google マップを利用して地図座標をセットする場合は、オンにしてください',
    'Please enter the Google Maps API key' => 'Google マップの API キーを入力してください',
    'Updating the map coordinates at the current address' => '現在の住所から地図座標を更新',
    'Delete the map coordinates' => '地図座標を削除',
);

$prefecture = craft()->config->get('prefecture', 'jpaddress');

foreach ($prefecture as $key => $value) {
    $translations[$key] = $value;
}

return $translations;