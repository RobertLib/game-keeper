import "./Switch.css";
import cn from "../../utils/cn";

/**
 * @typedef Props
 * @property {string} [label]
 * @param {Props & React.InputHTMLAttributes<HTMLInputElement>} props
 */
export default function Switch({ className, label, style, ...rest }) {
  return (
    <label className={cn("Switch", className)} style={style}>
      {label && <span className="font-semibold">{label}:</span>}
      <span className="switch">
        <input {...rest} type="checkbox" />
        <span className="switch-slider" />
      </span>
    </label>
  );
}
