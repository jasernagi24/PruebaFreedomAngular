import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NewCorralComponent } from './components/new-corral/new-corral.component';
import { NewAnimalComponent } from './components/new-animal/new-animal.component';

const routes: Routes = [
  {path: 'home', component:HomeComponent},
  {path: 'newCorral', component:NewCorralComponent},
  {path: 'newAnimal', component:NewAnimalComponent},
  {path:'**', pathMatch:'full', redirectTo:'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
