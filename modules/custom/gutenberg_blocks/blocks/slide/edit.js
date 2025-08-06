"use client";

import {
  PanelBody,
  PanelRow,
  TextControl,
  Button,
  Toolbar,
} from "@wordpress/components";

import {
  useBlockProps,
  BlockControls,
  InspectorControls,
  RichText,
  MediaPlaceholder,
  ColorPalette,
} from "@wordpress/block-editor";

// drupal import is set as external in webpack.config.js
import { t } from "drupal";
import { __ } from "@wordpress/i18n";

function Edit({ attributes, setAttributes }) {
  const {
    metadata,
    imageUrl,
    imageAlt,
    imageUuid,
    title,
    content,
    buttonText,
    buttonUrl,
    buttonBackgroundColor,
    buttonTextColor,
    overlayPosition,
  } = attributes;

  function onSelectMedia(media) {
    if (!media?.url || !media?.data?.entity_uuid) return;

    setAttributes({
      imageAlt: media.alt,
      imageUuid: media.data.entity_uuid,
      imageUrl: media.url,
    });
  }

  function clearImage() {
    setAttributes({
      imageUrl: "",
      imageUuid: "",
      imageAlt: "",
    });
  }

  const buttonStyle = {
    backgroundColor: buttonBackgroundColor || "#006aff",
    color: buttonTextColor || "#ffffff",
  }

  const blockProps = useBlockProps({
    className: `slide overlay-${overlayPosition}`,
  });

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div {...useBlockProps()}>
      <BlockControls>
        <Toolbar>
          <Button label={t("Clear image")} icon="no-alt" onClick={clearImage} />
        </Toolbar>
      </BlockControls>
      <InspectorControls>
        <PanelBody title={t("Slide Settings")} initialOpen>
          <PanelRow>
            <TextControl
              label={t("Image Alt Text")}
              value={imageAlt}
              onChange={(value) => setAttributes({ imageAlt: value })}
            />
          </PanelRow>
          <PanelRow>
            <TextControl
              label={t("Button URL")}
              value={buttonUrl}
              onChange={(value) => setAttributes({ buttonUrl: value })}
            />
          </PanelRow>

          <PanelRow>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {["left", "center", "right"].map((pos) => (
                <Button
                  key={pos}
                  isPrimary={overlayPosition === pos}
                  isSecondary={overlayPosition !== pos}
                  onClick={() => setAttributes({ overlayPosition: pos })}
                  style={{
                    borderRadius: "9999px",
                    padding: "0.25rem 1rem",
                    fontWeight: "600",
                  }}
                >
                  {t(pos.charAt(0).toUpperCase() + pos.slice(1))}
                </Button>
              ))}
            </div>
          </PanelRow>
        </PanelBody>
        <PanelBody title={t("Button Colors")} initialOpen={false}>
          <PanelRow>
            <fieldset>
              <legend className="blocks-base-control__label">{t("Background Color")}</legend>
              <ColorPalette
                value={buttonBackgroundColor}
                onChange={(color) => setAttributes({ buttonBackgroundColor: color })}
                disableCustomColors={false}
              />
            </fieldset>
          </PanelRow>
          <PanelRow>
            <fieldset>
              <legend className="blocks-base-control__label">{t("Text Color")}</legend>
              <ColorPalette
                value={buttonTextColor}
                onChange={(color) => setAttributes({ buttonTextColor: color })}
                disableCustomColors={false}
              />
            </fieldset>
          </PanelRow>
        </PanelBody>
      </InspectorControls>

      {!imageUrl ? (
        <MediaPlaceholder
          onSelect={onSelectMedia}
          allowedTypes={["image"]}
          multiple={false}
          labels={{ title: t("Slide Background") }}
        >
          {t("Upload an image or select from media library.")}
        </MediaPlaceholder>
      ) : (
        <img
          data-entity-type="file"
          data-entity-uuid={imageUuid}
          src={imageUrl}
          alt={imageAlt}
          className="slide-preview-image"
        />
      )}

      <div className="slide-overlay">
        <div className="slide-content">
          <RichText
            tagName="h1"
            placeholder={t("Slide Title")}
            value={title}
            onChange={(value) => setAttributes({ title: value })}
          />
          <RichText
            tagName="p"
            placeholder={t("Slide Content")}
            value={content}
            onChange={(value) => setAttributes({ content: value })}
          />
          <RichText
            tagName="a"
            placeholder={t("Button Text")}
            value={buttonText}
            onChange={(value) => setAttributes({ buttonText: value })}
            style={buttonStyle}
            className="slide-button"
          />
        </div>
      </div>
    </div>
  );
}

export default Edit;
