<?php

namespace Drupal\custom_field\Plugin\CustomField\FieldFormatter;

use Drupal\Core\Form\FormStateInterface;
use Drupal\custom_field\Plugin\CustomFieldTypeInterface;

/**
 * Plugin implementation of the 'Custom' formatter for 'datetime' fields.
 *
 * @FieldFormatter(
 *   id = "datetime_custom",
 *   label = @Translation("Custom"),
 *   field_types = {
 *     "datetime"
 *   }
 * )
 */
class DateTimeCustomFormatter extends DateTimeFormatterBase {

  /**
   * {@inheritdoc}
   */
  public static function defaultSettings() {
    return [
      'date_format' => CustomFieldTypeInterface::DATETIME_STORAGE_FORMAT,
    ] + parent::defaultSettings();
  }

  /**
   * {@inheritdoc}
   */
  public function settingsForm(array $form, FormStateInterface $form_state, array $settings) {
    $settings += static::defaultSettings();
    $elements = parent::settingsForm($form, $form_state, $settings);

    $elements['date_format'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Date/time format'),
      '#description' => $this->t('See <a href=":url" target="_blank">the documentation for PHP date formats</a>.', [
        ':url' => 'https://www.php.net/manual/datetime.format.php#refsect1-datetime.format-parameters',
      ]),
      '#default_value' => $settings['date_format'],
    ];

    return $elements;
  }

  /**
   * {@inheritdoc}
   */
  protected function formatDate(object $date, array $settings): string {
    $settings += static::defaultSettings();
    $format = $settings['date_format'];
    $timezone = $settings['timezone_override'] ?: $date->getTimezone()->getName();
    return $this->dateFormatter->format($date->getTimestamp(), 'custom', $format, $timezone != '' ? $timezone : NULL);
  }

}