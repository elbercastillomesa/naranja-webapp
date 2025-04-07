/**
 * @file
 * Provides block variations for the Article content type.
 * It's not mandatory but will provide a better UX when editing content.
 * Documentation: https://developer.wordpress.org/block-editor/reference-guides/block-api/block-variations/
 */

((Drupal, wp) => {
  const { blocks } = wp;
  const { registerBlockStyle } = blocks;

  // registerBlockStyle(
  //   'core/image',
  //   {
  //     name: 'something',
  //     label: 'Something',
  //     isDefault: true,
  //   },
  // );
})(Drupal, wp);