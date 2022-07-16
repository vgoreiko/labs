import {createAction, props} from '@ngrx/store';
import {State} from "./favorite.reducer";

export const addToFavorite = createAction(
  '[Favorites] Add To Favorite',
  props<{ favType: keyof State, id: number}>()
);
export const removeFromFavorite = createAction(
  '[Favorites] Remove To Favorite',
  props<{ favType: keyof State, id: number}>()
);
