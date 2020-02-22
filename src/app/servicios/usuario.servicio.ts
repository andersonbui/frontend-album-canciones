import { Injectable } from '@angular/core';
import { Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
// import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()
export class ServicioUsuario {
    public url: string;

    constructor( private _http: Http) {
        this.url = GLOBAL.url;
    }

    singup(user_to_login, getHash = null) {
        if (getHash != null) {
            user_to_login.gethash = getHash;
        }

        const json = JSON.stringify(user_to_login);
        const params = json;

        const headers = new Headers({'Content-Type': 'application/json'});

        return this._http.post(this.url + 'login', params, {headers: headers})
            .map(res => res.json());
    }

    registrar(user_a_registrar) {
        const params = JSON.stringify(user_a_registrar);
        const headers = new Headers({'Content-Type': 'application/json'});

        return this._http.post(this.url + 'usuarios/registrar', params, {headers: headers})
            .map(res => res.json());
    }

    editar(usuario) {

        const _id = usuario._id;
        const params = JSON.stringify(usuario);
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': this.getToken()
        });

        return this._http.put(this.url + 'usuarios/actualizar/' + _id, params, {headers: headers})
            .map(res => res.json());
    }

    getIdentity() {
        const identity =  JSON.parse(localStorage.getItem('1d3nt1tv'));
        if (typeof identity !== 'undefined') {
            return identity;
        }
        return null;
    }

    setIdentity(identity) {
        localStorage.setItem('1d3nt1tv', JSON.stringify(identity));
    }

    getToken() {
        const token = localStorage.getItem('70k3n');
        if (typeof token !== 'undefined') {
            return token;
        }
        return null;
    }
}
