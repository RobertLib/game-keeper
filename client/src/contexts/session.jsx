import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

/**
 * @typedef User
 * @property {number} id
 * @property {string} email
 * @property {string} role
 */

const SessionContext = createContext({
  currentUser: /** @type {User?} */ (null),
  /** @param {User?} user */
  setCurrentUser: (user) => {},
});

/**
 * @typedef Props
 * @property {React.ReactNode} children
 * @param {Props} props
 */
export const SessionProvider = ({ children }) => {
  const token = localStorage.getItem("token");

  const [currentUser, setCurrentUser] = useState(
    /** @type {User?} */ (token ? jwtDecode(token) : null)
  );

  return (
    <SessionContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
