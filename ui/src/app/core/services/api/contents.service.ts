import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Content } from '../../../modules/dashboard/models/content';

@Injectable({
  providedIn: 'root'
})
export class ContentsService {
  private environment = environment;
  private http = inject(HttpClient);

  constructor() { }


  getContents(): Observable<Content[]> {
    return this.http.get<Content[]>(`${this.environment.api_url}/contents`);
  }

}
