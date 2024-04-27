import "./Select.css";
import cn from "../../utils/cn";

/**
 * @typedef Props
 * @property {"sm" | "md" | "lg"} [dim]
 * @property {string} [error]
 * @property {boolean} [fullWidth]
 * @property {string} [label]
 * @property {{ label: string, value: string | number }[]} options
 * @param {Props & React.SelectHTMLAttributes<HTMLSelectElement>} props
 */
export default function Select({
  className,
  dim,
  error,
  fullWidth,
  label,
  options,
  required,
  style,
  ...rest
}) {
  return (
    <label className={className} style={style}>
      {label && (
        <span className="Select-label">
          {label}: {required && <span className="text-danger">*</span>}
        </span>
      )}
      <select
        {...rest}
        className={cn(
          "form-control",
          dim && `form-control-${dim}`,
          error && "is-invalid",
          fullWidth && "w-full"
        )}
        required={required}
      >
        {options.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      {error && (
        <div className="Select-error collapse-down text-danger text-sm">
          {error}
        </div>
      )}
    </label>
  );
}
