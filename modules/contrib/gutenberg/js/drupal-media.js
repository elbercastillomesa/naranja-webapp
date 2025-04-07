/**
 * Generated by a build script. Do not modify.
 * Check orginal .jsx file.
 */
/* eslint-disable */

(function(wp2, $, Drupal2, drupalSettings2, DrupalGutenberg2) {
  const { blocks, blockEditor, data } = wp2;
  const { dispatch } = data;
  const { RichText } = blockEditor;
  const { DrupalMediaEntity } = DrupalGutenberg2.Components;
  const gutenberg = drupalSettings2.gutenberg || {};
  const isMediaLibraryEnabled = gutenberg["media-library-enabled"] || false;
  const isMediaEnabled = gutenberg["media-enabled"] || false;
  const __ = Drupal2.t;
  const editorSettings = drupalSettings2.editor;
  var gutenbergSettings = null;
  if (editorSettings && editorSettings.formats) {
    Object.keys(editorSettings.formats).forEach(function(key) {
      const editorSetting = editorSettings.formats[key];
      if (editorSetting.editor !== "gutenberg") {
        return;
      }
      gutenbergSettings = editorSetting.editorSettings;
    });
  }
  const registerBlock = () => {
    const blockId = "drupalmedia/drupal-media-entity";
    if (!gutenbergSettings || !gutenbergSettings.allowedDrupalBlocks) {
      return;
    }
    if (!gutenbergSettings.allowedDrupalBlocks.includes(blockId)) {
      return;
    }
    blocks.registerBlockType(blockId, {
      title: Drupal2.t("Media"),
      icon: "admin-media",
      category: "common",
      supports: {
        align: true,
        html: false,
        reusable: false
      },
      attributes: {
        mediaEntityIds: {
          type: "array"
        },
        viewMode: {
          type: "string",
          default: "default"
        },
        caption: {
          type: "string",
          default: ""
        },
        lockViewMode: {
          type: "boolean",
          default: false
        },
        allowedTypes: {
          type: "array",
          default: ["image", "video", "audio", "application"]
        }
      },
      edit({ attributes, className, setAttributes, isSelected, clientId }) {
        const { mediaEntityIds, caption } = attributes;
        return /* @__PURE__ */ React.createElement("figure", { className }, /* @__PURE__ */ React.createElement(
          DrupalMediaEntity,
          {
            attributes,
            className,
            setAttributes,
            isSelected,
            isMediaLibraryEnabled,
            clientId,
            onError: (error) => {
              error = typeof error === "string" ? error : error[2];
              dispatch("core/notices").createWarningNotice(error);
            }
          }
        ), mediaEntityIds && mediaEntityIds.length > 0 && (!RichText.isEmpty(caption) || isSelected) && /* @__PURE__ */ React.createElement(
          RichText,
          {
            tagName: "figcaption",
            placeholder: __("Write caption\u2026"),
            value: caption,
            onChange: (value) => setAttributes({ caption: value })
          }
        ));
      },
      save() {
        return null;
      }
    });
  };
  const registerDrupalMedia = () => new Promise((resolve) => {
    if (isMediaEnabled) {
      registerBlock();
    }
    resolve();
  });
  window.DrupalGutenberg = window.DrupalGutenberg || {};
  window.DrupalGutenberg.registerDrupalMedia = registerDrupalMedia;
})(wp, jQuery, Drupal, drupalSettings, DrupalGutenberg);
