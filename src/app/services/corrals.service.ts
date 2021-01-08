import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CorralModel } from '../models/corral.model';

@Injectable({
  providedIn: 'root'
})
export class CorralsService {

  constructor(private http:HttpClient) { }

  getAllCorrals(){
    return this.http.get<CorralModel[]>('http://localhost:8000/api/corral')
  }

  saveCorral(corral:CorralModel){
    return this.http.post<CorralModel[]>('http://localhost:8000/api/corral', corral)
  }
}
