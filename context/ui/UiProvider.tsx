import { FC, PropsWithChildren, useReducer } from "react";
import { UiContext, uiReducer } from "./";
// InitialState
export interface UiState {
   isMenuOpen: boolean;
}

const UI_INITIAL_STATE: UiState = {
   isMenuOpen: false,
};

export const UiProvider: FC<PropsWithChildren> = ({ children }) => {
   const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

   const toggleSideMenu = () => {
      dispatch({ type: "[UI] - ToggleMenu" });
   };

   return (
      <UiContext.Provider
         value={{
            ...state,

            // Methods
            toggleSideMenu,
         }}
      >
         {children}
      </UiContext.Provider>
   );
};
