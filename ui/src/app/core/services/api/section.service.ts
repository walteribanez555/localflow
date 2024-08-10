import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Section } from '../../../modules/dashboard/models/section';

@Injectable({
  providedIn: 'root',
})
export class SectionService {

  private environment = environment;
  private http = inject(HttpClient);


  constructor() { }


  public getSections() : Observable<Section[]> {
    return this.http.get<Section[]>(`${this.environment.api_url}/sections`);
  }

}
