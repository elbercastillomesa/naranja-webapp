<?php

namespace Drupal\custom_field\Plugin;

use Drupal\Component\Plugin\Exception\PluginException;
use Drupal\Core\Cache\CacheBackendInterface;
use Drupal\Core\Extension\ModuleHandlerInterface;
use Drupal\Core\Plugin\DefaultPluginManager;
use Drupal\Core\StringTranslation\StringTranslationTrait;

/**
 * Provides the custom field type plugin manager.
 */
class CustomFieldTypeManager extends DefaultPluginManager implements CustomFieldTypeManagerInterface {

  use StringTranslationTrait;

  /**
   * Constructs a new CustomFieldTypeManager object.
   *
   * @param \Traversable $namespaces
   *   An object that implements \Traversable which contains the root paths
   *   keyed by the corresponding namespace to look for plugin implementations.
   * @param \Drupal\Core\Cache\CacheBackendInterface $cache_backend
   *   Cache backend instance to use.
   * @param \Drupal\Core\Extension\ModuleHandlerInterface $module_handler
   *   The module handler to invoke the alter hook with.
   */
  public function __construct(\Traversable $namespaces, CacheBackendInterface $cache_backend, ModuleHandlerInterface $module_handler) {
    parent::__construct(
      'Plugin/CustomField/FieldType',
      $namespaces,
      $module_handler,
      'Drupal\custom_field\Plugin\CustomFieldTypeInterface',
      'Drupal\custom_field\Annotation\CustomFieldType'
    );

    $this->alterInfo('custom_field_info');
    $this->setCacheBackend($cache_backend, 'custom_field_type_plugins');
  }

  /**
   * {@inheritdoc}
   */
  public function getCustomFieldItems(array $settings): array {
    $items = [];
    $field_settings = $settings['field_settings'] ?? [];

    // Table element rows weight property not working so lets
    // sort the data ahead of time in this function.
    $columns = $this->sortFieldsByWeight($settings['columns'], $field_settings);

    foreach ($columns as $name => $column) {
      unset($column['weight']);
      $settings = $field_settings[$name] ?? [];
      $type = $column['type'];

      try {
        $items[$name] = $this->createInstance($type, [
          'name' => $column['name'],
          'max_length' => (int) $column['max_length'],
          'unsigned' => $column['unsigned'] ?? FALSE,
          'data_type' => $column['type'],
          'precision' => (int) $column['precision'],
          'scale' => (int) $column['scale'],
          'size' => $column['size'] ?? 'normal',
          'target_type' => $column['target_type'] ?? NULL,
          'datetime_type' => $column['datetime_type'] ?? 'datetime',
          'check_empty' => $settings['check_empty'] ?? FALSE,
          'widget_settings' => $settings['widget_settings'] ?? [],
          'uri_scheme' => $column['uri_scheme'] ?? NULL,
        ]);
      }
      catch (PluginException $e) {
        // Should we log the error?
      }
    }

    return $items;
  }

  /**
   * {@inheritdoc}
   */
  public function processDefinition(&$definition, $plugin_id) {
    parent::processDefinition($definition, $plugin_id);
    // Ensure that every field type has a category.
    if (empty($definition['category'])) {
      $definition['category'] = $this->t('General');
    }
  }

  /**
   * Sort fields by weight.
   *
   * @param array $columns1
   *   Columns from \Drupal\custom_field\Plugin\Field\FieldType\CustomItem
   *   settings.
   * @param array $field_settings
   *   Field settings \Drupal\custom_field\Plugin\Field\FieldType\CustomItem
   *   settings.
   *
   * @return array
   *   An array of fields sorted by weight.
   */
  private function sortFieldsByWeight(array $columns1, array $field_settings): array {
    $columns = [];
    foreach ($columns1 as $name => $column) {
      $weight = $field_settings[$name]['weight'] ?? 0;
      $column['weight'] = $weight;
      $columns[$name] = $column;
    }
    uasort($columns, function ($item1, $item2) {
      return $item1['weight'] <=> $item2['weight'];
    });

    return $columns;
  }

  /**
   * {@inheritdoc}
   */
  public function dataTypes(): array {
    $definitions = $this->getDefinitions();
    $data_types = [];
    foreach ($definitions as $id => $definition) {
      try {
        /** @var \Drupal\custom_field\Plugin\CustomFieldTypeInterface $plugin */
        $plugin = $this->createInstance($id);
        // @todo Refactor this schema logic only needed for update manager.
        $schema = $plugin->schema(['name' => $id, 'target_type' => 'node']);
        $data_types[$id] = [
          'label' => $plugin->getPluginDefinition()['label'],
          'schema' => $schema,
        ];
      }
      catch (\Exception $e) {
        // Plugin not found.
      }
    }

    return $data_types;
  }

  /**
   * {@inheritdoc}
   */
  public function fieldTypeOptions(): array {
    $options = [];
    $definitions = $this->getDefinitions();
    // Sort the types by category and then by name.
    uasort($definitions, function ($a, $b) {
      if ($a['category'] != $b['category']) {
        return strnatcasecmp($a['category'], $b['category']);
      }
      return strnatcasecmp($a['label'], $b['label']);
    });
    foreach ($definitions as $id => $definition) {
      $category = $definition['category'];
      // Add category grouping for multiple options.
      $options[(string) $category][$id] = $definition['label'];
    }

    return $options;
  }

}