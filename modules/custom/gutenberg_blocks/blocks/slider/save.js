import { useBlockProps, InnerBlocks } from "@wordpress/block-editor"
import { ArrowForwardIos, ArrowBackIos } from "../shared/icons"

function Save({ attributes }) {
  const { autoplay, autoplaySpeed, showArrows, showDots } = attributes

  const blockProps = useBlockProps.save({
    className: "slider-container",
    "data-autoplay": autoplay ? "true" : "false",
    "data-autoplay-speed": autoplaySpeed,
    "data-show-arrows": showArrows ? "true" : "false",
    "data-show-dots": showDots ? "true" : "false",
  })

  return (
    <div {...blockProps}>
      <div className="slider">
        <div className="slider-track">
          <InnerBlocks.Content />
        </div>

        {showArrows && (
          <>
            <button className="slider-arrow slider-prev" aria-label="Previous slide">
              <ArrowBackIos />
            </button>
            <button className="slider-arrow slider-next" aria-label="Next slide">
              <ArrowForwardIos />
            </button>
          </>
        )}

        {showDots && <div className="slider-dots"></div>}
      </div>
    </div>
  )
}

export default Save
