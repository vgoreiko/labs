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
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [FavoritesListComponent],
  imports: [
    CommonModule,
    FavoritesRoutingModule,
    TranslateModule,
    StoreModule.forFeature(favoritesFeatureKey, reducer),
    MatTableModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  providers: []
})
export class FavoritesModule {
}
