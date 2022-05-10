import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', loadChildren: () => import('./1-presentation/pages/login/login.module').then(m => m.LoginModule) },  
  { path: 'pages', loadChildren: () => import('./1-presentation/mainlayout/mainlayout.module').then(m => m.MainlayoutModule) },    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
