import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private _apiService: ApiService) { }


  getCompanyId(): number
  {
    return localStorage['companyId'] ?? 1;
  }
}
