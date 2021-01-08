import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AnimalModel } from '../models/animal.model';

@Injectable({
  providedIn: 'root'
})
export class AnimalsService {

  constructor(private http:HttpClient) { }

  getAllAnimals(){
    return this.http.get<AnimalModel[]>('http://localhost:8000/api/animal');
  }

  saveAnimal(animal:AnimalModel){
    return this.http.post<AnimalModel[]>('http://localhost:8000/api/animal', animal);
  }

  searchAnimalCorral(corral){
    return this.http.post<AnimalModel[]>('http://localhost:8000/api/searchAnimalCorral', corral);
  }

  quantityAnimalCorral(corral){
    return this.http.post<number>('http://localhost:8000/api/quantityAnimalCorral', corral);
  }

  averageyAnimalCorral(corral){
    return this.http.post<number>('http://localhost:8000/api/averageAge', corral);
  }
  
}
