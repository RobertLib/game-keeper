import cn from "../../utils/cn";

/**
 * @typedef Props
 * @property {string} [className]
 * @property {React.ReactNode} children
 * @property {React.CSSProperties} [style]
 * @property {string} summary
 * @param {Props} props
 */
export default function Accordion({ className, children, style, summary }) {
  return (
    <details className={cn("details", className)} open style={style}>
      <summary>{summary}</summary>
      <div className="details-content">{children}</div>
    </details>
  );
}
