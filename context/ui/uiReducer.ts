import { UiState } from "./";

type uiActionType = { type: "[UI] - ToggleMenu" };

export const uiReducer = (state: UiState, action: uiActionType): UiState => {
   switch (action.type) {
      case "[UI] - ToggleMenu":
         return {
            ...state,
            isMenuOpen: !state.isMenuOpen,
         };

      default:
         return state;
   }
};
