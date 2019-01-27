import {NgModule} from "@angular/core";
import {PreloadAllModules, RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  // lazy loading
  {path: 'system', loadChildren: './system/system.module#SystemModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // прелоадинг
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {}