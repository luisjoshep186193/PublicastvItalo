import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ElementsComponent } from './components/admin/elements/elements.component';
import { GroupsComponent } from './components/admin/groups/groups.component';
import { ListsComponent } from './components/admin/lists/lists.component';
import { HomeComponent } from './components/shared/home/home.component';
import { ElementComponent } from './components/admin/elements/element/element.component';
import { CreateComponent } from './components/admin/lists/create/create.component';
import { DetailComponent } from './components/admin/lists/detail/detail.component';
import { TvsComponent } from './components/admin/tvs/tvs.component';
import { MytvComponent } from './components/admin/tvs/mytv/mytv.component';
import { MaintvComponent } from './components/admin/tvs/maintv/maintv.component';
import { LoginComponent } from './components/shared/login/login.component';
import { RegistroComponent } from './components/shared/registro/registro.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
{path: 'elements', component: ElementsComponent, canActivate: [AuthGuard]},
{path: 'element/:id', component: ElementComponent},
{path: 'groups', component: GroupsComponent},
{path: 'tvs', component: TvsComponent},
{path: 'mytv', component: MytvComponent},
{path: 'login', component: LoginComponent},
{path: 'register', component: RegistroComponent},
{path: 'maintv', component: MaintvComponent},
{path: 'lists', component: ListsComponent},
{path: 'lists/create', component: CreateComponent},
{path: 'lists/detail/:idx', component: DetailComponent},
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
