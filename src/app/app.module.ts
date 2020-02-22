import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ListadoComponent } from './componentes/listado/listado.component';
import { ContactoComponent } from './componentes/contacto/contacto.component';
import { PerfilUsuarioComponent } from './componentes/perfil-usuario/perfil-usuario.component';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    ListadoComponent,
    ContactoComponent,
    PerfilUsuarioComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
