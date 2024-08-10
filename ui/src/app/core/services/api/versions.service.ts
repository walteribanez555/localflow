import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Version } from '../../../modules/dashboard/models/version';

@Injectable({
  providedIn: 'root'
})
export class VersionsService {


  private environment = environment;
  private http = inject(HttpClient);

  constructor() { }

  public getVersions() : Observable<Version[]> {
    return this.http.get<Version[]>(`${this.environment.api_url}/versions`);
  }

}
