import { useEffect, useState } from "react";
import cn from "../../utils/cn";

/**
 * @typedef Props
 * @property {string} [className]
 * @property {React.ReactNode} children
 * @property {React.ReactNode} label
 * @property {React.CSSProperties} [style]
 * @param {Props} props
 */
export default function Dropdown({ className, children, label, style }) {
  const [isOpen, setIsOpen] = useState(false);

  /** @param {MouseEvent} event */
  const handleClickOutside = (event) => {
    if (!(event.target instanceof HTMLElement)) {
      return;
    }

    if (!event.target.closest(".dropdown")) {
      setIsOpen(false);
    } else if (event.target.closest(".dropdown-content")) {
      setTimeout(() => setIsOpen(false), 250);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickToggle = () => setIsOpen((prevState) => !prevState);

  return (
    <div className={cn("dropdown", className)} style={style}>
      <button
        aria-expanded={isOpen}
        className="btn"
        onClick={handleClickToggle}
        title="Open settings"
        type="button"
      >
        {label}
      </button>

      {isOpen && (
        <div
          aria-label="Dropdown content"
          className="dropdown-content"
          role="region"
        >
          {children}
        </div>
      )}
    </div>
  );
}
