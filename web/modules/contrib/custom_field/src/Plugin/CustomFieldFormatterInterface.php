<?php

namespace Drupal\custom_field\Plugin;

use Drupal\Core\Field\FieldItemInterface;
use Drupal\Core\Form\FormStateInterface;

/**
 * Interface definition for field widget plugins.
 *
 * This interface details the methods that most plugin implementations will want
 * to override. See Drupal\Core\Field\WidgetBaseInterface for base
 * wrapping methods that should most likely be inherited directly from
 * Drupal\Core\Field\WidgetBase..
 *
 * @ingroup field_widget
 */
interface CustomFieldFormatterInterface {

  /**
   * Returns a form to configure settings for the widget.
   *
   * Invoked from \Drupal\field_ui\Form\EntityDisplayFormBase to allow
   * administrators to configure the widget. The field_ui module takes care of
   * handling submitted form values.
   *
   * @param array $form
   *   The form where the settings form is being included in.
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *   The current state of the form.
   * @param array $settings
   *   An array of settings passed from parent form.
   *
   * @return array
   *   The form definition for the widget settings.
   */
  public function settingsForm(array $form, FormStateInterface $form_state, array $settings);

  /**
   * Returns a short summary for the current widget settings.
   *
   * If an empty result is returned, a UI can still be provided to display
   * a settings form in case the widget has configurable settings.
   *
   * @return array
   *   A short summary of the widget settings.
   */
  public function settingsSummary();

  /**
   * Returns the field value as formatted.
   *
   * @param \Drupal\Core\Field\FieldItemInterface $item
   *   The field item.
   * @param \Drupal\custom_field\Plugin\CustomFieldTypeInterface $field
   *   The custom field type object.
   * @param array $settings
   *   An array of settings.
   *
   * @return mixed
   *   The formatted value.
   */
  public function formatValue(FieldItemInterface $item, CustomFieldTypeInterface $field, array $settings);

  /**
   * Returns calculated dependencies for formatter plugin.
   *
   * @param array $settings
   *   The formatter settings for the plugin.
   *
   * @return array
   *   The dependencies.
   */
  public function calculateFormatterDependencies(array $settings): array;

  /**
   * Returns the changed settings for formatter plugin.
   *
   * @param array $dependencies
   *   The formatter dependencies array.
   * @param array $settings
   *   The formatter settings for the plugin.
   *
   * @return array
   *   The changed formatter settings.
   */
  public function onFormatterDependencyRemoval(array $dependencies, array $settings): array;

}