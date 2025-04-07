# Gutenberg Starter Theme

This theme is intented to be a reference for developing Gutenberg compatible
themes. It shouldn't be used in production environments.

The theme works well with a Drupal's standard installation profile when
enabled.

On this project you'll find comprehensive and commented code examples for the
many features delivered by Drupal Gutenberg editor.

Tooling on this project is kept to its minimal. Only 
[**esbuild**](https://esbuild.github.io/) is used to compile JSX files to ES6
files and only necessary if writing React components. Check `scripts/build.js`
and the example at `js/register-filters.jsx`. Extensions like SASS or PostCSS
**aren't** used for CSS. Just regular CSS.

This theme was generated from starterkit_theme. Additional information on
generating themes can be found in the [Starterkit documentation](https://www.drupal.org/docs/core-modules-and-themes/core-themes/starterkit-theme).

For a full description of the module, visit the
[project page](https://www.drupal.org/project/gutenberg_starter).

Submit bug reports and feature suggestions, or track changes in the
[issue queue](https://www.drupal.org/project/issues/gutenberg_starter).


## Requirements

This module requires the following modules:

[Gutenberg](https://www.drupal.org/project/gutenberg)


## Installation

Install as you would normally install a contributed Drupal module. For further
information, see
[Installing Drupal Modules](https://www.drupal.org/docs/extending-drupal/installing-drupal-modules).


## Configuration

- Gutenberg configuration file (`gutenberg_starter.gutenberg.yml`)
    - Register client libraries on editor and frontend
    - Toggle custom blocks availability from the content type edit form
    - Setup editor configuration
        - Add frontend styles to the editor
        - Add patterns
        - Limit color palette
- Register block variations (`js/register-variations.js`)
- Apply filters to blocks upon block registration (`js/register-filters.jsx`)
- Register block styles (`js/register-styles.js`)


## Maintainers

- Marco Fernandes - [marcofernandes](https://www.drupal.org/u/marcofernandes)
- Thor Andre Gretland - [thorandre](https://www.drupal.org/u/thorandre)