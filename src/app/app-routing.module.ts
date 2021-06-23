import { NgModule } from '@angular/core';
import { PreloadAllModules, PreloadingStrategy, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login',loadChildren: () => import('./public/login/login.component')
  .then((r) => r.LoginComponent) 
  .catch((err) => console.log(err))},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules,relativeLinkResolution: 'legacy'}),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
