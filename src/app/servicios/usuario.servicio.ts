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
}
