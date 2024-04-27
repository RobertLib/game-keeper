import { Link } from "react-router-dom";
import cn from "../../utils/cn";

/**
 * @typedef Props
 * @property {string} [className]
 * @property {{ label: string, link?: string }[]} items
 * @property {React.CSSProperties} [style]
 * @param {Props} props
 */
export default function Breadcrumb({ className, items, style }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("breadcrumb", className)}
      style={style}
    >
      <ol>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li
              aria-current={isLast ? "page" : undefined}
              className={cn(isLast && "active")}
              key={index}
            >
              {isLast ? (
                item.label
              ) : (
                <Link className="link" to={item.link ?? ""}>
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
