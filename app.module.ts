import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';  // Assure-toi que c'est bien importé
import { LoginComponent } from './login/login.component';  // Assure-toi que LoginComponent est importé

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,  // Déclare LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,  // Ajoute AppRoutingModule dans les imports
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
