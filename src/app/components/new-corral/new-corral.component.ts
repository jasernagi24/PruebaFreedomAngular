import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CorralModel } from '../../models/corral.model';
import { CorralsService } from '../../services/corrals.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-corral',
  templateUrl: './new-corral.component.html',
  styleUrls: ['./new-corral.component.css']
})
export class NewCorralComponent implements OnInit {

  corral = new CorralModel();
  constructor(private _corralsService:CorralsService, private router:Router) { }

  ngOnInit(): void {
  }

  //Funcion que nos purmite guardar un nuevo corral 
  saveCorral(formCorral:NgForm){

    if(formCorral.invalid){
      return;
    }
    try{
      if(this.corral.name == "" || this.corral.capacity == ""){
        alert('Nesecitas ingresar todos los campos')
      }
      else{
      this._corralsService.saveCorral(this.corral).subscribe(resp=>{
        console.log(resp)
        this.router.navigateByUrl('/home')
      })
      Swal.fire({
        allowOutsideClick: false,
        title: 'Corral registrado',
        icon: 'success',
      })
    }
  }
  catch (e){
    console.log(e)
  }
}


}
