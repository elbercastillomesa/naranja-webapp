import { useBlockProps, RichText } from "@wordpress/block-editor"
import { ArrowForwardIos, ArrowBackIos } from "../shared/icons"

function Save({ attributes }) {
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

  const blockProps = useBlockProps.save({
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

  const carouselDataAttributes = {
    "data-autoplay": autoplay ? "true" : "false",
    "data-duration": slideDuration,
    "data-desktop-slides": slidesPerView.desktop,
    "data-tablet-slides": slidesPerView.tablet,
    "data-mobile-slides": slidesPerView.mobile,
    "data-loop": "true",
  }

  return (
    <div {...blockProps}>
      <div className="image-carousel-container">
        {title && (
          <RichText.Content tagName={titleLevel} value={title} className="image-carousel-title" style={titleStyle} />
        )}

        <div className="image-carousel-content" {...carouselDataAttributes}>
          {showArrows && images.length > 0 && (
            <button className="image-carousel-arrow image-carousel-prev" aria-label="Previous slide">
              <ArrowBackIos />
            </button>
          )}

          <div className="image-carousel-track-container">
            <div className="image-carousel-track">
              {images.map((image, index) => (
                <div key={index} className="image-carousel-slide">
                  <div className="image-carousel-slide-inner">
                    <img
                      src={image.url || "/placeholder.svg"}
                      alt={image.alt}
                      data-entity-type="file"
                      data-entity-uuid={image.uuid}
                      style={{ height: `${imageHeight}px` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {showArrows && images.length > 0 && (
            <button className="image-carousel-arrow image-carousel-next" aria-label="Next slide">
              <ArrowForwardIos />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Save
