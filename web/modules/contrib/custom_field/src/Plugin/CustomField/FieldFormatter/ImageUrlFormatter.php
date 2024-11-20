<?php

namespace Drupal\custom_field\Plugin\CustomField\FieldFormatter;

use Drupal\Core\Field\FieldItemInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Link;
use Drupal\Core\Url;
use Drupal\custom_field\Plugin\CustomFieldTypeInterface;
use Drupal\file\FileInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Plugin implementation of the 'image_url' formatter.
 *
 * @FieldFormatter(
 *   id = "image_url",
 *   label = @Translation("URL to image"),
 *   field_types = {
 *     "image",
 *   }
 * )
 */
class ImageUrlFormatter extends EntityReferenceFormatterBase {

  /**
   * The image style entity storage.
   *
   * @var \Drupal\image\ImageStyleStorageInterface
   */
  protected $imageStyleStorage;

  /**
   * The current user.
   *
   * @var \Drupal\Core\Session\AccountInterface
   */
  protected $currentUser;

  /**
   * The file url generator.
   *
   * @var \Drupal\Core\File\FileUrlGeneratorInterface
   */
  protected $fileUrlGenerator;

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    $instance = parent::create($container, $configuration, $plugin_id, $plugin_definition);
    $instance->imageStyleStorage = $container->get('entity_type.manager')->getStorage('image_style');
    $instance->currentUser = $container->get('current_user');
    $instance->fileUrlGenerator = $container->get('file_url_generator');

    return $instance;
  }

  /**
   * {@inheritdoc}
   */
  public static function defaultSettings() {
    return [
      'image_style' => '',
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function settingsForm(array $form, FormStateInterface $form_state, array $settings) {
    $element = parent::settingsForm($form, $form_state, $settings);
    $settings += self::defaultSettings();
    $image_styles = image_style_options(FALSE);
    $description_link = Link::fromTextAndUrl(
      $this->t('Configure Image Styles'),
      Url::fromRoute('entity.image_style.collection')
    );
    $element['image_style'] = [
      '#title' => $this->t('Image style'),
      '#type' => 'select',
      '#default_value' => $settings['image_style'],
      '#empty_option' => $this->t('None (original image)'),
      '#options' => $image_styles,
      '#description' => $description_link->toRenderable() + [
        '#access' => $this->currentUser->hasPermission('administer image styles'),
      ],
    ];

    return $element;
  }

  /**
   * {@inheritdoc}
   */
  public function formatValue(FieldItemInterface $item, CustomFieldTypeInterface $field, array $settings) {
    $image = $settings['value'];

    if (!$image instanceof FileInterface) {
      return NULL;
    }

    $access = $this->checkAccess($image);
    if (!$access->isAllowed()) {
      return NULL;
    }

    $formatter_settings = $settings['formatter_settings'] + static::defaultSettings();
    /** @var \Drupal\image\ImageStyleInterface $image_style */
    $image_style = $this->imageStyleStorage->load($formatter_settings['image_style']);
    $image_uri = $image->getFileUri();
    $url = $image_style ? $this->fileUrlGenerator->transformRelative($image_style->buildUrl($image_uri)) : $this->fileUrlGenerator->generateString($image_uri);

    $build = [
      '#markup' => $url,
      '#cache' => [
        'tags' => $image->getCacheTags(),
      ],
    ];

    return $this->renderer->render($build);
  }

}
