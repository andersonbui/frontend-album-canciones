import { Component, OnInit } from '@angular/core';

import { ServicioUsuario } from '../../servicios/usuario.servicio';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css'],
  providers: [ServicioUsuario]
})
export class PerfilUsuarioComponent implements OnInit {

  public titulo: string;
  public usuario: Usuario;
  public identity;
  public token;
  public alertaEditar: string;
  public clave_2: string;
  public clave_1: string;

  constructor (
      private _servicioUsuario: ServicioUsuario
  ) {
  }

  ngOnInit () {
      this.titulo = 'Actualizar mis datos';
      this.identity = this._servicioUsuario.getIdentity();
      this.token = this._servicioUsuario.getToken();
      this.usuario = this.identity;
      console.log(JSON.stringify(this.usuario));
      this.clave_2 = null;
      console.log('user-edit.component.ts cargado');
  }

  public onEditar() {
    if (this.clave_1 != null) {
      if (this.clave_1 === this.clave_2) {
        this.usuario.clave = this.clave_1;
      } else {
        this.alertaEditar = 'Error!, las contrasenas no coinciden.';
        return;
      }
    } else {
      this.usuario.clave = null;
    }
    this._servicioUsuario.editar(this.usuario).subscribe(
      response => {
        console.log(`respuesta : ${JSON.stringify(response)}`);
        const usuario = response.usuario;
        console.log(`usuario editado : ${usuario}`);
        if (!usuario._id) {
          this.alertaEditar = 'Error al editar';
        } else {
          this.alertaEditar = 'Se ha editado exitosamente';
          this.identity = this.usuario;
          this.clave_1 = null;
          this.clave_2 = null;
          this._servicioUsuario.setIdentity(this.identity);
          document.getElementById('nombre_identity').innerHTML = this.identity.nombre + ' ' + this.identity.apellido;
        }
      },
      error => {
        const errorMessagge = <any>error;
        if (errorMessagge != null) {
          this.alertaEditar = error._body;
          console.log(error);
        }
      }
    );
    console.log(this.usuario);
  }
}
