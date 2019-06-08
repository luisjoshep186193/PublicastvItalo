import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { ElementsComponent } from './components/admin/elements/elements.component'
import { GroupsComponent } from './components/admin/groups/groups.component'
import { HomeComponent } from './components/shared/home/home.component';
import { ElementComponent } from './components/admin/elements/element/element.component';

const routes: Routes = [
{path: 'elements', component: ElementsComponent},
{path: 'element/:id', component: ElementComponent},
{path: 'groups', component: GroupsComponent},
{path: 'home', component: HomeComponent},
{path: '**', pathMatch: 'full' , redirectTo: 'home'}
];

@NgModule({
  imports: [
    RouterModule.forRoot( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
