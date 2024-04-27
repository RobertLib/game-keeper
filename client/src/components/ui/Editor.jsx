import "./Editor.css";
import { useEffect, useRef } from "react";
import Button from "./Button";
import cn from "../../utils/cn";
import sanitizeHTML from "../../utils/sanitizeHTML";

/**
 * @typedef Props
 * @property {string} [className]
 * @property {string} [error]
 * @property {string} [label]
 * @property {string} [name]
 * @property {(value: string, name: string | undefined) => void} [onChange]
 * @property {boolean} [required]
 * @property {React.CSSProperties} [style]
 * @property {string} [value]
 * @param {Props} props
 */
export default function Editor({
  className,
  error,
  label,
  name,
  onChange,
  required,
  style,
  value,
}) {
  const editorRef = useRef(/** @type {HTMLDivElement | null} */ (null));

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = sanitizeHTML(value ?? "");
    }
  }, []);

  /**
   * @param {string} commandId
   * @param {boolean} [showUI]
   * @param {string} [value]
   */
  const formatText = (commandId, showUI, value) => {
    document.execCommand(commandId, showUI, value);
  };

  /** @param {React.MouseEvent<HTMLLabelElement, MouseEvent>} event */
  const handleFocus = (event) => {
    event.preventDefault();
    editorRef.current?.focus();
  };

  const handleInput = () => {
    const sanitizedContent = sanitizeHTML(editorRef.current?.innerHTML ?? "");
    onChange?.(sanitizedContent, name);
  };

  return (
    <label className={className} onClick={handleFocus} style={style}>
      {label && (
        <span className="Editor-label">
          {label}: {required && <span className="text-danger">*</span>}
        </span>
      )}
      <div>
        <header className="Editor-toolbar">
          <Button
            onClick={() => formatText("bold")}
            size="sm"
            variant="default"
          >
            Bold
          </Button>
          <Button
            onClick={() => formatText("italic")}
            size="sm"
            variant="default"
          >
            Italic
          </Button>
          <Button
            onClick={() => formatText("underline")}
            size="sm"
            variant="default"
          >
            Underline
          </Button>
          <Button
            onClick={() => formatText("insertOrderedList")}
            size="sm"
            variant="default"
          >
            OL
          </Button>
          <Button
            onClick={() => formatText("insertUnorderedList")}
            size="sm"
            variant="default"
          >
            UL
          </Button>
        </header>
        <div
          className={cn("Editor-content", error && "is-invalid")}
          contentEditable
          onInput={handleInput}
          ref={editorRef}
        />
        {error && (
          <div className="Editor-error collapse-down text-danger text-sm">
            {error}
          </div>
        )}
      </div>
    </label>
  );
}
