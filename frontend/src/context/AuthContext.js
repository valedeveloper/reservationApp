import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
  user: window.localStorage.getItem("stateUser") ?? null,
  loading: false,
  error: null,
};
const OPTION_LOGIN={
  start:"LOGIN_START",
  success:"LOGIN_SUCCESS",
  error:"LOGIN_FAILURE",
  end:"LOGOUT"
}
export const AuthContext = createContext();

const AuthReducer = (action, state) => {
  switch (action.type) {
    case OPTION_LOGIN.start:
      return {
        user: null,
        loading: true,
        error: null,
      };
    case OPTION_LOGIN.success:
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case OPTION_LOGIN.error:
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case OPTION_LOGIN.end:
      return {
        user: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    window.localStorage.setItem("stateUser", state.user);
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        dispatch,
        OPTION_LOGIN,
        user: state.user,
        loading: state.loading,
        error: state.error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export default AuthContextProvider;
