/**
 * @file
 * Provides custom filters for blocks.
 * Documentation: https://developer.wordpress.org/block-editor/reference-guides/filters/block-filters/
 */

((Drupal, wp) => {
  const { t } = Drupal;
  const { hooks, blockEditor } = wp;
  const { addFilter } = hooks;
  const { BlockControls } = blockEditor;

  /**
   * Adds a warning label for the featured image block with mapped field.
   */
  function withFieldMappingWarning(Edit) {
    return (props) => {
      const { isSelected, attributes } = props;
      const { className } = attributes;
      const isFeaturedImage = className ? className.includes('is-article-featured-image') : false;
      return (
        <>
          { isSelected && isFeaturedImage && (
            <div className="block-warning-label">⚠️ { t('Some attributes won\'t be applied on frontend.') }</div>
          ) }
          <Edit {...props} />
        </>
      )
    };
  }

  /**
   * This filter will alter image block by removing its styles and extend the Edit component.
   */
  addFilter(
    'blocks.registerBlockType',
    'gutenberg-starter/extended-image',
    (settings, name) => {
      if (name !== 'core/image') {
        return settings;
      }

      return {
        ...settings,
        styles: [],
        edit: withFieldMappingWarning(settings.edit),
      };
    },
  );

  })(Drupal, wp);