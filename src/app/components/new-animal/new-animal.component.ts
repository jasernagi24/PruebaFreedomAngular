import { Component, OnInit } from '@angular/core';
import { AnimalsService } from '../../services/animals.service';
import { CorralsService } from '../../services/corrals.service';
import { AnimalModel } from '../../models/animal.model';
import { CorralModel } from '../../models/corral.model';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-animal',
  templateUrl: './new-animal.component.html',
  styleUrls: ['./new-animal.component.css']
})
export class NewAnimalComponent implements OnInit {

  corrals:CorralModel[]=[];
  animals:AnimalModel[]=[]
  animal = new AnimalModel();

  constructor(private _animalsService:AnimalsService, private _corralService:CorralsService, private router:Router) { }

  ngOnInit(): void {
    this.getCorrals()
  }

  public getCorrals(): void{
    this._corralService.getAllCorrals()
    .subscribe(resCorrals => {
      this.corrals = resCorrals;
      console.log(this.corrals);
    });
  }

  public saveAnimal(formCorral:NgForm){
    if(formCorral.invalid){
      return;
    }
    try{
      if(this.animal.name == "" || this.animal.corral_id == null || this.animal.age == null || this.animal.quantity == null || this.animal.classification == "" ){
        alert('Nesecitas ingresar todos los campos')
      }
      else{
        const corralFind = this.corrals.find( corral => corral.id == this.animal.corral_id);
        var animalsCorral={
          "id":this.animal.corral_id
        }
        this._animalsService.quantityAnimalCorral(animalsCorral).subscribe(resp =>{
          var sumAnimalsCorral = resp + this.animal.quantity
        if(sumAnimalsCorral <= parseInt(corralFind.capacity)){
          this._animalsService.saveAnimal(this.animal).subscribe(resp=>{
            console.log(resp)
            this.router.navigateByUrl('/home')
          })
          Swal.fire({
            allowOutsideClick: false,
            title: 'Animal registrado',
            icon: 'success',
          })
        }
        else{
          alert('La cantidad que se va a registrar superara la capacidad del corral')
        }
        }
        )
      }
    }
    catch(e){
      console.log(e)
    }
      
  }

}
