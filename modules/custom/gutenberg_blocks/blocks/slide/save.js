import { useBlockProps, RichText } from "@wordpress/block-editor";

function Save({ attributes }) {
  const {
    imageUrl,
    imageUuid,
    imageAlt,
    title,
    content,
    buttonText,
    buttonUrl,
    buttonBackgroundColor,
    buttonTextColor,
    overlayPosition,
    metadata,
  } = attributes;

  const blockProps = useBlockProps.save({
    className: `slide overlay-${overlayPosition}`,
  });

  const hasContent = title || content || (buttonText && buttonUrl);
  const buttonStyle = buttonText || buttonUrl ? {
      backgroundColor: buttonBackgroundColor || "#0066ff",
      color: buttonTextColor || "#ffffff",
    } : null;

  return (
    <div {...blockProps}>
      {imageUrl && (
        <img
          data-entity-type="file"
          data-entity-uuid={imageUuid}
          src={imageUrl}
          alt={imageAlt}
        />
      )}

      {hasContent && (
        <div className="slide-overlay">
          <div className="slide-content">
            <RichText.Content tagName="h1" value={title} />
            <RichText.Content tagName="p" value={content} />
            {buttonText && (
              <RichText.Content
                tagName="a"
                value={buttonText}
                className="slide-button"
                style={buttonStyle}
                href={buttonUrl}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Save;
