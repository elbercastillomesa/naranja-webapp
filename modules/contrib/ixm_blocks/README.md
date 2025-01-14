# IXM Blocks

A helper module to get your site up and running in as little time as possible
with all the typical custom Block Types needed from the IXM design department.

### What does this module do?
1. Imports the required configuration files for all the fields needed by a given
custom block type.
2. Initializes a custom theme_hook for a default starter template, which can be
overridden in your theme if you require more or less fields than the defaults.
3. If using the [Block Library](https://www.drupal.org/project/block_library)
module, provides a default Icon when using Layout Builder in the offcanvas menu.

### Block Types (Name/Machine name)

- Accordion `ixm_blocks_accordion`
- Cards `ixm_blocks_cards`
- Carousel `ixm_blocks_carousel`
- CTA Icons `ixm_blocks_cta_icons`
- Hero `ixm_blocks_hero`
- Modal `ixm_blocks_modal`
- Ping-Pong `ixm_blocks_ping_pong`
- Statistics `ixm_blocks_statistics`
- Tables `ixm_blocks_table`
- Tabs `ixm_blocks_tabs`

### Installation Instructions:

```
composer require drupal/ixm_blocks
drush en ixm_blocks_[module_name] -y
```

### Images

Each sub module comes with an icon that can be used with the [block_library](https://www.drupal.org/project/block_library) 
module. The module is shown in the offcanvas tray while using layout builder 
for a more visually appealing UI. 

To keep consistency between your custom block types and the ones in this module,
the recommended font set is [Material Icons](https://fonts.google.com/icons?icon.style=Rounded&icon.platform=web) 
with the following settings;

- Style: Rounded
- Fill: Off
- Weight: 100
- Grade: 200
- Optical Size: 48px

### Contributions:

Want to add a block type to the base set? Have a cool new feature? 

Consider submitting a contribution back to IXM Blocks!
