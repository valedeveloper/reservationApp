import { createContext, useReducer } from "react";
const INITIAL_STATE = {
  city: undefined,
  date: [],
  countOptions: {
    adult: undefined,
    children: undefined,
    room: undefined,
  },
};
export const OPTION_ACTIONS = {
  newSearch: "NEW_SEARCH",
  resetSearch: "RESET_SEARCH",
};

export const SearchContext = createContext(INITIAL_STATE);

//En la funciòn se recibe el estado y la acción. Se usa el switch
//Para que dependiendo de cual sea la acción así mismo se comportarán y retornará el estado
const SearchReducer = (state, action) => {
  switch (action.type) {
    case OPTION_ACTIONS.newSearch:
      return action.payload; //Cuando pasamos el dispatch, recordemos que pasamos así: dispatch(action:"newSeacrh",payload:estado o datos nuevos que queremos pasar) El payload, es lo que se está enviando para actualizar el rstado
    case OPTION_ACTIONS.resetSearch:
      return INITIAL_STATE;
    default:
      return state; //El reducer siemrpe devuelve un estado
  }
};

function SearchContextProvider({ children }) {
  //El use reducer es un hook que ayuda a reducir al máximonuestro componentes
  //Por paràmetro recibe una función y el estado
  //El state que se entra por paràmetro es el estado que va a estar cambiando
  //El dispatch es la forma com se envia la acción a nuestra fucniò que pasamos por paràmetro. 
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);
  return (
    <SearchContext.Provider
      value={{
        city: state.city,
        date: state.date,
        countOptions: state.countOptions,
        dispatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
export default SearchContextProvider;
