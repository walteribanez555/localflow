import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KeyWordsService {

  private environment = environment;
  private http = inject(HttpClient);


  constructor() { }


  getKeyWords() {
    return this.http.get(`${this.environment.api_url}/key_words`);
  }

}
