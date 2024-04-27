import { useEffect, useRef } from "react";
import Button from "./Button";
import cn from "../../utils/cn";

/**
 * @typedef Props
 * @property {string} [className]
 * @property {React.ReactNode} children
 * @property {() => void} [onClose]
 * @property {"sm" | "md" | "lg"} [size]
 * @property {React.CSSProperties} [style]
 * @property {string} [title]
 * @param {Props} props
 */
export default function Dialog({
  className,
  children,
  onClose,
  size,
  style,
  title,
}) {
  const dialogRef = useRef(/** @type {HTMLDialogElement?} */ (null));

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  return (
    <dialog
      className={cn("dialog", size && `dialog-${size}`, className)}
      ref={dialogRef}
      style={style}
    >
      <header>
        {title}
        <form method="dialog">
          <Button
            onClick={onClose}
            style={{ minWidth: 33 }}
            type="submit"
            variant="icon"
          >
            X
          </Button>
        </form>
      </header>
      {children}
    </dialog>
  );
}
