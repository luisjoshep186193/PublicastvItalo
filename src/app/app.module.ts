import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { ElementsComponent } from './components/admin/elements/elements.component';
import { GroupsComponent } from './components/admin/groups/groups.component';
import { HomeComponent } from './components/shared/home/home.component';

import { ElementComponent } from './components/admin/elements/element/element.component';
import { FirestoreService } from './services/firestore.service';
// firebase
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { NgDropFilesDirective } from './directives/ng-drop-files.directive';
import { ListsComponent } from './components/admin/lists/lists.component';
import { CreateComponent } from './components/admin/lists/create/create.component';
import { DetailComponent } from './components/admin/lists/detail/detail.component';
import { ElementCardComponent } from './components/shared/element-card/element-card.component';
import { TvsComponent } from './components/shared/element-card/components/tvs/tvs.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ElementsComponent,
    GroupsComponent,
    HomeComponent,
    ElementComponent,
    NgDropFilesDirective,
    ListsComponent,
    CreateComponent,
    DetailComponent,
    ElementCardComponent,
    TvsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  providers: [
    FirestoreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
