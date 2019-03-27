import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DinosaurComponent } from './dinosaur/dinosaur.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DinosaurDetailComponent } from './dinosaur-detail/dinosaur-detail.component';

const routes: Routes = [
  { path: 'detail/:id', component: DinosaurDetailComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'dinosaurs', component: DinosaurComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



