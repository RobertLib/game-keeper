import { Fragment } from "react";
import cn from "../../utils/cn";

/**
 * @typedef Props
 * @property {string} [className]
 * @property {{term: string, description: React.ReactNode}[]} items
 * @property {React.CSSProperties} [style]
 * @param {Props} props
 */
export default function DescriptionList({ className, items, style }) {
  return (
    <dl className={cn("description-list", className)} style={style}>
      {items.map((item, index) => (
        <Fragment key={index}>
          <dt>{item.term}:</dt>
          <dd>{item.description}</dd>
        </Fragment>
      ))}
    </dl>
  );
}
