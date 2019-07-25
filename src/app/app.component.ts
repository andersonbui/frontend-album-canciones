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
  public identity = true;
  public token = true;

  constructor(private _servicioUsuario: ServicioUsuario) {
    this.usuario = new Usuario('', '', '', '', '', 'ROLE_USER', '');
  }

  ngOnInit(): void {
  }

  // ngOnChanges() {

  // }

  public onSubmit(event) {
    this._servicioUsuario.singup(this.usuario).subscribe(
      response => {
        console.log(response);
        // let identity =>
      },
      error => {
        const errorMessagge = <any>error;
        if (errorMessagge != null) {
          console.log(error);
        }
      }
    );
    // console.log(this.usuario);
  }
}
