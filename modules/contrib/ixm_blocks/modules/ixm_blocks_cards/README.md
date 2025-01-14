1. Visit: `/admin/structure/block/block-content/manage/ixm_blocks_cards/fields/block_content.ixm_blocks_cards.field_content_reference`
and set the default bundle types in order to have your autocomplete field
reference the proper content type.
2. Add an image field (optional) to your content type, and let its machine name
be `field_image` that is of the type "Reference > Media", and set it to allow
the "Image" media type. If you cannot use this machine name, make sure you
copy the `block--ixm-blocks-cards.html.twig` template to your theme and adjust
it as necessary.
