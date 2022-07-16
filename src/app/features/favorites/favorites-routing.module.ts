import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {FavoritesListComponent} from "./favorites-list/favorites-list.component";

const routes: Routes = [
  {
    path: "",
    component: FavoritesListComponent,
    data: {title: "stms.menu.favorites"}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FavoritesRoutingModule {
}
