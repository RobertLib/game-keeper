import "./Timeline.css";
import cn from "../../utils/cn";

/**
 * @typedef TimelineProps
 * @property {string} [className]
 * @property {React.ReactNode} children
 * @property {React.CSSProperties} [style]
 * @param {TimelineProps} props
 */
export default function Timeline({ className, children, style }) {
  return (
    <ul className={cn("Timeline", className)} style={style}>
      {children}
    </ul>
  );
}

/**
 * @typedef TimelineItemProps
 * @property {React.ReactNode} children
 * @property {string} [label]
 * @property {string} [time]
 * @param {TimelineItemProps} props
 */
const TimelineItem = ({ children, label, time }) => {
  return (
    <li className="Timeline-item">
      {time && <div className="Timeline-time">{time}</div>}
      <div className="Timeline-content">
        {label && <div className="Timeline-label">{label}</div>}
        <div className="Timeline-details">{children}</div>
      </div>
    </li>
  );
};

export { Timeline, TimelineItem };
