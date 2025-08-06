"use client"

import {
  PanelBody,
  PanelRow,
  RangeControl,
  ToggleControl,
  Button,
  ColorPalette,
  __experimentalBoxControl as BoxControl,
} from "@wordpress/components"

import { useBlockProps, InspectorControls, RichText, MediaUpload } from "@wordpress/block-editor"
import { t } from "drupal"
import { useState, useEffect } from "@wordpress/element"
import { plus, trash } from "@wordpress/icons"
import { ArrowForwardIos, ArrowBackIos } from "../shared/icons"

function Edit({ attributes, setAttributes }) {
  const {
    title,
    titleColor,
    titleFontSize,
    titleLevel,
    backgroundColor,
    padding,
    margin,
    slideDuration,
    slidesPerView,
    images,
    imageHeight,
    showArrows,
    autoplay,
  } = attributes

  const [currentSlide, setCurrentSlide] = useState(0)
  const [autoplayActive, setAutoplayActive] = useState(false)
  const UNIT_OPTIONS = [
    { value: "px", label: "px" },
    { value: "em", label: "em" },
    { value: "rem", label: "rem" },
    { value: "%", label: "%" },
  ]
  const HEADING_OPTIONS = [
    { value: "h1", label: "H1" },
    { value: "h2", label: "H2" },
    { value: "h3", label: "H3" },
    { value: "h4", label: "H4" },
    { value: "h5", label: "H5" },
    { value: "h6", label: "H6" },
  ]

  // Utility to normalize BoxControl output to { value, unit }
  function normalizeBoxValue(val) {
    if (typeof val === 'object' && val !== null && 'value' in val && 'unit' in val) return val;
    if (typeof val === 'string') {
      const match = val.match(/^([\d.]+)([a-z%]+)$/);
      if (match) {
        return { value: parseFloat(match[1]), unit: match[2] };
      }
    }
    return { value: 0, unit: 'px' };
  }
  function normalizeBox(box) {
    return {
      top: normalizeBoxValue(box.top),
      right: normalizeBoxValue(box.right),
      bottom: normalizeBoxValue(box.bottom),
      left: normalizeBoxValue(box.left),
    };
  }
  // Utility to convert { value, unit } to BoxControl string format
  function boxToString(box) {
    const result = {};
    ['top', 'right', 'bottom', 'left'].forEach(side => {
      const val = box?.[side];
      if (val && typeof val === 'object' && 'value' in val && 'unit' in val) {
        result[side] = `${val.value}${val.unit}`;
      } else if (typeof val === 'string') {
        result[side] = val;
      } else {
        result[side] = '';
      }
    });
    return result;
  }

  const getVisibleSlides = () => {
    return Math.min(images.length, slidesPerView.desktop)
  }

  const visibleSlides = getVisibleSlides()
  const totalSlides = images.length

  useEffect(() => {
    let interval

    if (autoplay && autoplayActive && images.length > visibleSlides) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => {
          if (prev >= totalSlides - visibleSlides) {
            return 0
          }
          return prev + 1
        })
      }, slideDuration)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [autoplay, autoplayActive, slideDuration, images.length, visibleSlides, totalSlides])

  const onSelectImages = (newImages) => {
    const imagesArray = newImages.map((image) => {
      return {
        id: image.id,
        url: image.url,
        alt: image.alt || "",
        title: image.title || "",
        uuid: image.data?.entity_uuid || "",
      }
    })

    setAttributes({ images: imagesArray })
  }

  const removeImage = (index) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    setAttributes({ images: newImages })
  }

  const blockProps = useBlockProps({
    className: "image-carousel",
    style: {
      backgroundColor: backgroundColor || "#F3F6F6",
      paddingTop: `${padding.top.value}${padding.top.unit}`,
      paddingRight: `${padding.right.value}${padding.right.unit}`,
      paddingBottom: `${padding.bottom.value}${padding.bottom.unit}`,
      paddingLeft: `${padding.left.value}${padding.left.unit}`,
      marginTop: `${margin.top.value}${margin.top.unit}`,
      marginRight: `${margin.right.value}${margin.right.unit}`,
      marginBottom: `${margin.bottom.value}${margin.bottom.unit}`,
      marginLeft: `${margin.left.value}${margin.left.unit}`,
    },
  })

  const titleStyle = {
    color: titleColor || "#454F5B",
    fontSize: `${titleFontSize.value}${titleFontSize.unit}`,
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => {
      // Loop back to beginning when reaching the end
      if (prev >= totalSlides - visibleSlides) {
        return 0
      }
      return prev + 1
    })
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => {
      // Loop to end when at the beginning
      if (prev <= 0) {
        return Math.max(0, totalSlides - visibleSlides)
      }
      return prev - 1
    })
  }

  return (
    <div {...blockProps} onMouseEnter={() => setAutoplayActive(false)} onMouseLeave={() => setAutoplayActive(true)}>
      <InspectorControls>
        <PanelBody title={t("Title Settings")} initialOpen>
          <PanelRow>
            <fieldset>
              <legend className="blocks-base-control__label">{t("Title Color")}</legend>
              <ColorPalette
                value={titleColor}
                onChange={(color) => setAttributes({ titleColor: color })}
                disableCustomColors={false}
              />
            </fieldset>
          </PanelRow>
          <PanelRow className="image-carousel components-panel__heading">
            <RangeControl
              label={t("Font Size")}
              value={titleFontSize.value}
              onChange={(value) => setAttributes({ titleFontSize: { ...titleFontSize, value } })}
              min={1}
              max={128}
              step={1}
              style={{ flex: 1 }}
            />
            <div className="components-base-control__field">
              <label>{t("Unit")}</label>
              <select
                value={titleFontSize.unit}
                onChange={(e) => setAttributes({ titleFontSize: { ...titleFontSize, unit: e.target.value } })}
                style={{ height: 28 }}
              >
              {UNIT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
              </select>
            </div>
          </PanelRow>
          <PanelRow>
            <label>{t("Title Heading Level")}: </label>
            <select
              value={titleLevel}
              onChange={(e) => setAttributes({ titleLevel: e.target.value })}
              style={{ marginLeft: 8 }}
            >
              {HEADING_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </PanelRow>
        </PanelBody>

        <PanelBody title={t("Carousel Settings")} initialOpen={false}>
          <PanelRow>
            <fieldset>
              <legend className="blocks-base-control__label">{t("Background Color")}</legend>
              <ColorPalette
                value={backgroundColor}
                onChange={(color) => setAttributes({ backgroundColor: color })}
                disableCustomColors={false}
              />
            </fieldset>
          </PanelRow>
          <PanelRow>
            <BoxControl
              label={t("Padding")}
              values={boxToString(padding)}
              onChange={(value) => setAttributes({ padding: normalizeBox(value) })}
              units={UNIT_OPTIONS}
            />
          </PanelRow>
          <PanelRow>
            <BoxControl
              label={t("Margin")}
              values={boxToString(margin)}
              onChange={(value) => setAttributes({ margin: normalizeBox(value) })}
              units={UNIT_OPTIONS}
            />
          </PanelRow>
          <PanelRow>
            <RangeControl
              label={t("Image Height (px)")}
              value={imageHeight}
              onChange={(value) => setAttributes({ imageHeight: value })}
              min={50}
              max={800}
              step={10}
            />
          </PanelRow>
        </PanelBody>

        <PanelBody title={t("Slider Behavior")} initialOpen={false}>
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
                label={t("Slide Duration (ms)")}
                value={slideDuration}
                onChange={(value) => setAttributes({ slideDuration: value })}
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
            <RangeControl
              label={t("Slides Per View (Desktop)")}
              value={slidesPerView.desktop}
              onChange={(value) =>
                setAttributes({
                  slidesPerView: {
                    ...slidesPerView,
                    desktop: value,
                  },
                })
              }
              min={1}
              max={10}
              step={1}
            />
          </PanelRow>
          <PanelRow>
            <RangeControl
              label={t("Slides Per View (Tablet)")}
              value={slidesPerView.tablet}
              onChange={(value) =>
                setAttributes({
                  slidesPerView: {
                    ...slidesPerView,
                    tablet: value,
                  },
                })
              }
              min={1}
              max={6}
              step={1}
            />
          </PanelRow>
          <PanelRow>
            <RangeControl
              label={t("Slides Per View (Mobile)")}
              value={slidesPerView.mobile}
              onChange={(value) =>
                setAttributes({
                  slidesPerView: {
                    ...slidesPerView,
                    mobile: value,
                  },
                })
              }
              min={1}
              max={3}
              step={1}
            />
          </PanelRow>
        </PanelBody>
      </InspectorControls>

      <div className="image-carousel-container">
        <RichText
          tagName={titleLevel}
          className="image-carousel-title"
          value={title}
          onChange={(value) => setAttributes({ title: value })}
          style={titleStyle}
        />

        <div className="image-carousel-content">
          {showArrows && images.length > visibleSlides && (
            <button
              className="image-carousel-arrow image-carousel-prev"
              onClick={prevSlide}
              aria-label={t("Previous slide")}
            >
              <ArrowBackIos />
            </button>
          )}

          <div className="image-carousel-track-container">
            <div
              className="image-carousel-track"
              style={{
                transform: `translateX(-${currentSlide * (100 / visibleSlides)}%)`,
              }}
            >
              {images.length > 0 ? (
                images.map((image, index) => (
                  <div
                    key={index}
                    className="image-carousel-slide"
                    style={{
                      width: `${100 / visibleSlides}%`,
                    }}
                  >
                    <div className="image-carousel-slide-inner">
                      <img
                        src={image.url || "/placeholder.svg"}
                        alt={image.alt}
                        data-entity-type="file"
                        data-entity-uuid={image.uuid}
                        style={{ height: `${imageHeight}px` }}
                      />
                      <Button
                        icon={trash}
                        label={t("Remove image")}
                        onClick={() => removeImage(index)}
                        className="remove-image-button"
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="image-carousel-placeholder">
                  <p>{t("Add images to the carousel")}</p>
                </div>
              )}
            </div>
          </div>

          {showArrows && images.length > visibleSlides && (
            <button
              className="image-carousel-arrow image-carousel-next"
              onClick={nextSlide}
              aria-label={t("Next slide")}
            >
              <ArrowForwardIos />
            </button>
          )}
        </div>

        <div className="image-carousel-actions">
          <MediaUpload
            onSelect={onSelectImages}
            allowedTypes={["image"]}
            multiple
            gallery
            value={images.map((img) => img.id)}
            render={({ open }) => (
              <Button onClick={open} variant="primary" icon={plus}>
                {images.length === 0 ? t("Add Images") : t("Edit Images")}
              </Button>
            )}
          />
        </div>
      </div>
    </div>
  )
}

export default Edit
