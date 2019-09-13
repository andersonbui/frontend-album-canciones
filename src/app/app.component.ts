import { Component, OnInit } from '@angular/core';
import { Usuario } from './models/usuario';
import { ServicioUsuario } from './servicios/usuario.servicio';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ServicioUsuario]
})
export class AppComponent implements OnInit {
  public title = 'tumusica';
  public usuario: Usuario;
  public usuario_registro: Usuario;
  public identity;
  public token;
  public errorMessage;
  public alertaRegistrar;
  public clave_2;

  constructor(private _servicioUsuario: ServicioUsuario) {
    this.usuario = new Usuario('', '', '', '', '', 'ROLE_USER', '');
    this.usuario_registro = new Usuario('', '', '', '', '', 'ROLE_USER', '');
  }

  ngOnInit(): void {
    this.identity = this._servicioUsuario.getIdentity();
    this.token = this._servicioUsuario.getToken();

    console.log(`token ${this.token}`);
    console.log(`identity ${JSON.stringify(this.identity)}`);
  }

  // ngOnChanges() {

  // }

  public onSubmit(event) {

    // conseguir datos de usuario
    this._servicioUsuario.singup(this.usuario, true).subscribe(
      response => {
        console.log(response.usuario);
        this.identity = response.usuario;
        if (!this.identity._id) {
          alert('Error en la autenticacion');
        } else {
          // Crear elemento en localestorage para mantener identity en sesion
          localStorage.setItem('1d3nt1tv', JSON.stringify(this.identity));
          // conseguir token
          this.token = response.token;
          if (this.token.length <= 0) {
            alert('El token no se ha generado correctamente');
          } else {
            // Crear elemento en localestorage para mantener token en sesion
            localStorage.setItem('70k3n', this.token);

            console.log(`token ${this.token}`);
            console.log(`identity ${this.identity}`);
          }
        }
        // let identity =>
      },
      error => {
        const errorMessagge = <any>error;
        if (errorMessagge != null) {
          console.log('tipo error: ' + typeof error._body);
          if (typeof error._body === 'string') {
            const body = JSON.parse(error._body);
            this.errorMessage = body.message;
            console.log(error);
          }
        }
      }
    );
    // console.log(this.usuario);
  }


  public logout() {
    localStorage.removeItem('70k3n');
    localStorage.removeItem('1d3nt1tv');
    this.identity = null;
    this.token = null;
    localStorage.clear(); 
  }

  public onSubmitRegistrar() {
    this._servicioUsuario.registrar(this.usuario_registro).subscribe(
      response => {
        console.log(`respuesta : ${JSON.stringify(response)}`);
        const usuario = response.usuario;
        this.usuario_registro = usuario;
        console.log(`usuario registrado : ${usuario}`);
        if (!usuario._id) {
          this.alertaRegistrar = 'Error al registrarse';
        } else {
          this.alertaRegistrar = 'Se ha registrado exitosamente';
          this.usuario_registro = new Usuario('', '', '', '', '', 'ROLE_USER', '');
        }
      },
      error => {
        const errorMessagge = <any>error;
        if (errorMessagge != null) {
          this.alertaRegistrar = error._body;
          // this.errorMessage = body.message;
          console.log(error);
        }
      }
    );
    console.log(this.usuario_registro);
  }
}
