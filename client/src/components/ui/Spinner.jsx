import cn from "../../utils/cn";

/**
 * @typedef Props
 * @property {string} [className]
 * @property {React.CSSProperties} [style]
 * @param {Props} props
 */
export default function Spinner({ className, style }) {
  return (
    <div className={cn("spinner-container", className)} style={style}>
      <div className="spinner" role="status" />
      <span className="visually-hidden">Loading...</span>
    </div>
  );
}
