import { Component, OnInit } from '@angular/core';
import { PdfMakeWrapper, Txt } from 'pdfmake-wrapper';
import { AnimalModel } from '../../models/animal.model';
import { CorralModel } from '../../models/corral.model';
import { AnimalsService } from '../../services/animals.service'
import { CorralsService } from '../../services/corrals.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private animalsPdf:AnimalModel[]=[];
  private corralsPdf:CorralModel[]=[];


  constructor(private _animalService:AnimalsService, private _corralService:CorralsService ) { }

  ngOnInit(): void {
    this.getCorrals()
    this.getAnimals()
  }

  public getAnimals(): void{
    this._animalService.getAllAnimals()
    .subscribe(resAnimals => {
      this.animalsPdf = resAnimals;
    });
  }
  
    public getCorrals(): void{
      this._corralService.getAllCorrals()
      .subscribe(resCorrals => {
        this.corralsPdf = resCorrals;
      });
    }


  generatePDF(){
    console.log(this.animalsPdf)
    const pdf = new PdfMakeWrapper();
    pdf.add(
      new Txt("Reporte de animales por corral").bold().italics().alignment('center').fontSize(18).margin(12).end,
    )
    for (var i = 0; i < this.corralsPdf.length ; i++) {
      pdf.add(
        new Txt("Nombre del corral: "+this.corralsPdf[i].name + " -- Capacidad: "+ this.corralsPdf[i].capacity).bold().italics().margin([8, 8]).fontSize(12).end
        )
        pdf.add(
          new Txt("Animales: ").bold().italics().margin(3).fontSize(10).end
          )

      for(var j = 0; j < this.animalsPdf.length ; j++){
        if(this.corralsPdf[i].id == this.animalsPdf[j].corral_id && this.animalsPdf[j].corral_id != null){

          if(this.animalsPdf[j].classification == "Alta peligrosidad"){
            pdf.add(
            new Txt("Nombre: "+this.animalsPdf[j].name + " -- Edad: "+ this.animalsPdf[j].age + " - Cantidad: " + this.animalsPdf[j].quantity + " - Clasificacion: " + this.animalsPdf[j].classification).margin(3).color('red').end
            )
          }
          else{
            pdf.add(
            new Txt("Nombre: "+this.animalsPdf[j].name + " -- Edad: "+ this.animalsPdf[j].age + " - Cantidad: " + this.animalsPdf[j].quantity + " - Clasificacion: " + this.animalsPdf[j].classification).margin(3).end
            )
          }
        }

      }

    }

    pdf.create().download()
  }
}
