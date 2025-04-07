/**
 * @file
 * Provides block variations for the Article content type.
 * It's not mandatory but will provide a better UX when editing content.
 * Documentation: https://developer.wordpress.org/block-editor/reference-guides/block-api/block-variations/
 */

((Drupal, wp) => {
  const { blocks } = wp;
  const { registerBlockVariation } = blocks;
  const { t } = Drupal;

  const variations = [
    {
      blockName: 'drupal/simple-text',
      name: 'article-title',
      title: t('Article Title'),
      attributes: {
        className: 'is-article-title',
      },
      scope: [],
      icon: 'heading',
      isActive: (blockAttributes, variationAttributes) => {
        return blockAttributes.className === variationAttributes.className;
      }
    },
    {
      blockName: 'core/image',
      name: 'article-featured-image',
      title: t('Article Featured Image'),
      description: t('This block is mapped to a field. Some attributes like align, image size, duotone filter etc. aren\'t going to be applied when rendering on the frontend.'),
      attributes: {
        className: 'is-article-featured-image',
        align: 'full',
      },
      scope: [],
      icon: 'cover-image',
      isActive: (blockAttributes, variationAttributes) => {
        return blockAttributes.className?.includes(variationAttributes.className);
      }
    },
    {
      blockName: 'drupal/section',
      name: 'article-content',
      title: t('Article Content'),
      attributes: {
        className: 'is-article-content',
      },
      scope: [],
      icon: 'media-document',
      isActive: (blockAttributes, variationAttributes) => {
        return blockAttributes.className === variationAttributes.className;
      }
    },
  ];

  variations.forEach((variation) => {
    registerBlockVariation(
      variation.blockName,
      variation,
    );
  });

})(Drupal, wp);