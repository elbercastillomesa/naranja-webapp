<?php

namespace Drupal\custom_field\Plugin\CustomField\FieldFormatter;

use Drupal\Core\Datetime\DrupalDateTime;
use Drupal\Core\Field\FieldItemInterface;
use Drupal\custom_field\Plugin\CustomFieldTypeInterface;

/**
 * Plugin implementation of the 'Time ago' formatter for 'datetime' fields.
 *
 * @FieldFormatter(
 *   id = "datetime_time_ago",
 *   label = @Translation("Time ago"),
 *   field_types = {
 *     "datetime"
 *   }
 * )
 */
class DateTimeTimeAgoFormatter extends TimestampAgoFormatter {

  /**
   * {@inheritdoc}
   */
  public function formatValue(FieldItemInterface $item, CustomFieldTypeInterface $field, array $settings) {
    $formatter_settings = $settings['formatter_settings'] + static::defaultSettings();
    $datetime_type = $settings['configuration']['datetime_type'];

    /** @var \Drupal\Core\Datetime\DrupalDateTime $date */
    $date = $this->getDate($settings['value'], $datetime_type);

    if ($date === NULL) {
      return NULL;
    }

    $build = $this->formatDate($date, $formatter_settings);

    return $this->renderer->render($build);
  }

  /**
   * Formats a date/time as a time interval.
   *
   * @param \Drupal\Core\Datetime\DrupalDateTime $date
   *   A date/time object.
   * @param array $settings
   *   The formatter settings.
   *
   * @return array
   *   The formatted date/time string using the past or future format setting.
   */
  protected function formatDate(DrupalDateTime $date, array $settings) {
    return parent::formatTimestamp($date->getTimestamp(), $settings);
  }

  /**
   * Helper function to convert stored value to date object.
   *
   * @param string $value
   *   The storage value as string.
   * @param string $datetime_type
   *   The date type.
   *
   * @return \Drupal\Core\Datetime\DrupalDateTime|null
   *   Return a date object or null.
   */
  protected function getDate(string $value, string $datetime_type) {
    $storage_format = $datetime_type === CustomFieldTypeInterface::DATETIME_TYPE_DATE ? CustomFieldTypeInterface::DATE_STORAGE_FORMAT : CustomFieldTypeInterface::DATETIME_STORAGE_FORMAT;
    $date_object = NULL;
    try {
      $date = DrupalDateTime::createFromFormat($storage_format, $value, CustomFieldTypeInterface::STORAGE_TIMEZONE);
      if ($date instanceof DrupalDateTime && !$date->hasErrors()) {
        $date_object = $date;
        // If the format did not include an explicit time portion, then the
        // time will be set from the current time instead. For consistency, we
        // set the time to 12:00:00 UTC for date-only fields. This is used so
        // that the local date portion is the same, across nearly all time
        // zones.
        // @see \Drupal\Component\Datetime\DateTimePlus::setDefaultDateTime()
        // @see http://php.net/manual/datetime.createfromformat.php
        if ($datetime_type === CustomFieldTypeInterface::DATETIME_TYPE_DATE) {
          $date_object->setDefaultDateTime();
        }
      }
    }
    catch (\Exception $e) {
      // @todo Handle this.
    }

    return $date_object;
  }

}