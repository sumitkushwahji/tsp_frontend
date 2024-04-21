import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ItemsComponent } from "./items/items.component";

const routes: Routes = [
  { path: '', component: ItemsComponent },
  // Add more routes as needed
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
/**
 * The routing module for the Items feature.
 */
export class ItemsRoutingModule { }
