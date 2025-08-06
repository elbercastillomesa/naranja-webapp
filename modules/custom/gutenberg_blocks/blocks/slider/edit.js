"use client"

import { PanelBody, PanelRow, ToggleControl, RangeControl } from "@wordpress/components"
import { useBlockProps, InspectorControls, InnerBlocks } from "@wordpress/block-editor"
import { ArrowForwardIos, ArrowBackIos } from "../shared/icons"
import { t } from "drupal"; // drupal import is set as external in webpack.config.js
import { __ } from "@wordpress/i18n";

function Edit({ attributes, setAttributes }) {
  const { autoplay, autoplaySpeed, showArrows, showDots } = attributes

  const ALLOWED_BLOCKS = ["gutenberg-blocks/slide"]
  const TEMPLATE = [["gutenberg-blocks/slide", {}]]

  const blockProps = useBlockProps({
    className: "slider-container",
  })

  return (
    <div {...blockProps}>
      <InspectorControls>
        <PanelBody title={t("Slider Settings")} initialOpen>
          <PanelRow>
            <ToggleControl
              label={t("Autoplay")}
              checked={autoplay}
              onChange={(value) => setAttributes({ autoplay: value })}
            />
          </PanelRow>
          {autoplay && (
            <PanelRow>
              <RangeControl
                label={t("Autoplay Speed (ms)")}
                value={autoplaySpeed}
                onChange={(value) => setAttributes({ autoplaySpeed: value })}
                min={1000}
                max={10000}
                step={100}
              />
            </PanelRow>
          )}
          <PanelRow>
            <ToggleControl
              label={t("Show Navigation Arrows")}
              checked={showArrows}
              onChange={(value) => setAttributes({ showArrows: value })}
            />
          </PanelRow>
          <PanelRow>
            <ToggleControl
              label={t("Show Pagination Dots")}
              checked={showDots}
              onChange={(value) => setAttributes({ showDots: value })}
            />
          </PanelRow>
        </PanelBody>
      </InspectorControls>

      <div className="slider-editor">
        <div className="slider-slides">
          <InnerBlocks allowedBlocks={ALLOWED_BLOCKS} template={TEMPLATE} />
        </div>
        <div className="slider-controls-preview">
          {showArrows && (
            <>
              <button className="slider-arrow slider-prev" aria-label={t("Previous slide")}>
                <ArrowBackIos />
              </button>
              <button className="slider-arrow slider-next" aria-label={t("Next slide")}>
                <ArrowForwardIos />
              </button>
            </>
          )}
          {showDots && <div className="slider-dots-preview">•••</div>}
        </div>
      </div>
    </div>
  )
}

export default Edit
