import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FavoritesListComponent} from './favorites-list/favorites-list.component';
import {FavoritesRoutingModule} from "./favorites-routing.module";
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [FavoritesListComponent],
  imports: [
    CommonModule,
    FavoritesRoutingModule,
    TranslateModule,
  ],
  providers: []
})
export class FavoritesModule {
}
