import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FavoritesListComponent} from './favorites-list/favorites-list.component';
import {FavoritesRoutingModule} from "./favorites-routing.module";
import {TranslateModule} from "@ngx-translate/core";
import {StoreModule} from "@ngrx/store";
import {favoritesFeatureKey, reducer} from "./state";

@NgModule({
  declarations: [FavoritesListComponent],
  imports: [
    CommonModule,
    FavoritesRoutingModule,
    TranslateModule,
    StoreModule.forFeature(favoritesFeatureKey, reducer),
  ],
  providers: []
})
export class FavoritesModule {
}
