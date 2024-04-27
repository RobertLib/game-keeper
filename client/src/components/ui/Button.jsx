import cn from "../../utils/cn";

/**
 * @typedef Props
 * @property {boolean} [loading]
 * @property {"sm" | "md" | "lg"} [size]
 * @property {"primary" | "danger" | "warning" | "default" | "link" | "icon"} [variant]
 * @param {Props & React.ButtonHTMLAttributes<HTMLButtonElement>} props
 */
export default function Button({
  children,
  className,
  disabled,
  loading,
  size,
  style,
  type = "button",
  variant = "primary",
  ...rest
}) {
  return (
    <button
      {...rest}
      className={cn(
        "btn",
        `btn-${variant}`,
        size && `btn-${size}`,
        loading && "loading",
        className
      )}
      disabled={disabled}
      style={{ ...style, opacity: disabled ? 0.5 : 1 }}
      type={type}
    >
      {children}
    </button>
  );
}
