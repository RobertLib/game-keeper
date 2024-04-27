import "./snackbar.css";
import { createContext, useCallback, useContext, useState } from "react";
import { Toast } from "../components/ui";

const SnackbarContext = createContext({
  /** @param {string} message @param {import("../components/ui/Toast").Variant} [variant] */
  enqueueSnackbar: (message, variant) => {},
});

/**
 * @typedef Toast
 * @property {string} id
 * @property {string} message
 * @property {import("../components/ui/Toast").Variant} [variant]
 */

/**
 * @typedef Props
 * @property {React.ReactNode} children
 * @param {Props} props
 */
export const SnackbarProvider = ({ children }) => {
  const [toasts, setToasts] = useState(/** @type {Toast[]} */ ([]));

  /** @type {(message: string, variant?: import("../components/ui/Toast").Variant) => void} */
  const enqueueSnackbar = useCallback((message, variant) => {
    const id = Math.random().toString();

    setToasts((prevState) => [...prevState, { id, message, variant }]);

    setTimeout(() => {
      setToasts((prevState) => prevState.filter((toast) => toast.id !== id));
    }, 3000);
  }, []);

  return (
    <SnackbarContext.Provider value={{ enqueueSnackbar }}>
      <div className="snackbar-container">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            variant={toast.variant}
          />
        ))}
      </div>

      {children}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => useContext(SnackbarContext);
