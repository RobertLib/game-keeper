import cn from "../../utils/cn";

/**
 * @typedef {"primary" | "danger" | "default"} Variant
 */

/**
 * @typedef Props
 * @property {string} [className]
 * @property {string} message
 * @property {React.CSSProperties} [style]
 * @property {Variant} [variant]
 * @param {Props} props
 */
export default function Toast({
  className,
  message,
  style,
  variant = "primary",
}) {
  return (
    <div
      className={cn("toast", `toast-${variant}`, className)}
      role="alert"
      style={style}
    >
      {message}
    </div>
  );
}
