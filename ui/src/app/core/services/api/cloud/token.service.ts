import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Token } from './models/Token.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private http = inject(HttpClient);


  api = environment.api_url+'/services';

  constructor() { }


  get() : Observable<Token[]> {
    return this.http.get<Token[]>(this.api);
  }

  post( newToken : Token ): Observable<Token> {
    return this.http.post<Token>(this.api, newToken);
  }

  put() {

  }

  delete() {

  }


}
