import {createReducer, on} from "@ngrx/store";
import * as FavoriteActions from "./favorite.actions";

export interface State {
  orders: number[];
  patients: number[];
}

export const initialState: State = {
  orders: [],
  patients: [],
}

export const reducer = createReducer(
  initialState,
  on(FavoriteActions.addToFavorite,
    (state, action) => {
      return {
        ...state,
        [action.favType]: [...state[action.favType], action.id]
      };
    }
  ),
  on(FavoriteActions.removeFromFavorite,
    (state, action) => {
      return {
        ...state,
        [action.favType]: [...state[action.favType].filter(item => item !== action.id)]
      };
    }
  ),
);
