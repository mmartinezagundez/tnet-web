import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainlayoutComponent } from './mainlayout.component';

const routes: Routes = [
  {
    path: '',
    component: MainlayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },    
      { path: 'home', loadChildren: () => import('../pages/home/home.module').then(m => m.HomeModule) },  
      { path: 'search', loadChildren: () => import('../pages/search/search.module').then(m => m.SearchModule) },  
    ]
  }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainlayoutRoutingModule { }
