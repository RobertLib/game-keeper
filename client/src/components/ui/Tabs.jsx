import { Link, useLocation } from "react-router-dom";
import cn from "../../utils/cn";

/**
 * @typedef Props
 * @property {string} [className]
 * @property {{ label: string, link: string }[]} items
 * @property {React.CSSProperties} [style]
 * @param {Props} props
 */
export default function Tabs({ className, items, style }) {
  const { pathname } = useLocation();

  return (
    <ul className={cn("tabs", className)} style={style}>
      {items.map((item) => (
        <li
          className={cn(pathname.startsWith(item.link) && "active")}
          key={item.link}
        >
          <Link className="link" to={item.link}>
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
