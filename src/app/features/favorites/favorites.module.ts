import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FavoritesListComponent} from './favorites-list/favorites-list.component';
import {FavoritesRoutingModule} from "./favorites-routing.module";
import {TranslateModule} from "@ngx-translate/core";
import {StoreModule} from "@ngrx/store";
import {favoritesFeatureKey} from "./state";
import {reducer} from "./state/favorite.reducer";
import {MatTableModule} from "@angular/material/table";
import {MatCheckboxModule} from "@angular/material/checkbox";

@NgModule({
  declarations: [FavoritesListComponent],
  imports: [
    CommonModule,
    FavoritesRoutingModule,
    TranslateModule,
    StoreModule.forFeature(favoritesFeatureKey, reducer),
    MatTableModule,
    MatCheckboxModule,
  ],
  providers: []
})
export class FavoritesModule {
}
