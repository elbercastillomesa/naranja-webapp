/**
 * Shared icons
 */

export const ArrowForwardIos = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="currentColor"
    className={className}
  >
    <path d="M6.23 20.23L8 22l10-10L8 2 6.23 3.77 14.46 12z" />
  </svg>
);

export const ArrowBackIos = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="currentColor"
    className={className}
    style={{ transform: "rotate(180deg)" }}
  >
    <path d="M6.23 20.23L8 22l10-10L8 2 6.23 3.77 14.46 12z" />
  </svg>
);
