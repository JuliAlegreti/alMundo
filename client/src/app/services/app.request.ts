import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class RequestService {
    //URL del servidor donde se consumen los servicios
    private url:string = "http://localhost:3000/";    

    constructor(private http: Http) {}

    /**
     * Función qué realiza la peticion al servidor via GET
     */
    public get(url:string, parameters?:any) {        
		return this.http.get(this.url + url, {params:parameters})
			.map(this.extractData) 
			.catch(this.handleError);
    }
	
	/**
     * Comprueba la respuesta de la petición, si viene vacio devuelve un objeto vacio {} si no devuelve la respuesta
     * @param res Respuesta de la petición al server 
     */
	private extractData(res: Response) {
        let body = res.json();
        return body || { };
	}

    /**
     * En caso tal de que haya un error en el Observable, crea la excepción
     */
    private handleError(error: Response | any) {        
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }        
        return Promise.reject(errMsg);
    }
}