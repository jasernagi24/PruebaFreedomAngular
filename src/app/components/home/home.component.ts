import { Component, OnInit } from '@angular/core';
import { AnimalsService } from '../../services/animals.service';
import { CorralsService } from '../../services/corrals.service';
import { AnimalModel } from '../../models/animal.model'
import { CorralModel } from '../../models/corral.model'
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };

  animals:AnimalModel[]=[];
  corrals:CorralModel[]=[];
  average:number = 0;

  constructor(private _animalService:AnimalsService, private _corralService:CorralsService) { }

  ngOnInit(): void {
    this.getCorrals()
  }

    //Codigo ng2-char del grafico de barras
    public barChartLabels: Label[] = ['Cantidad de animales en el corral'];
    public barChartType: ChartType = 'bar';
    public barChartLegend = true;
    public barChartPlugins = [pluginDataLabels];
  
    public barChartData: ChartDataSets[] = [
      {  data: [0], label: 'Corral no seleccionado'},
    ];
  
    // events
    public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
      console.log(event, active);
    }
  
    public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
      console.log(event, active);
    }
  
    public getAnimals(): void{
    this._animalService.getAllAnimals()
    .subscribe(resAnimals => {
      this.animals = resAnimals;
    });
  }
  
    public getCorrals(): void{
      this._corralService.getAllCorrals()
      .subscribe(resCorrals => {
        this.corrals = resCorrals;
      });
    }

    public selectionCorral(corral_id:number): void{
      this.updateTable(corral_id)
      this.updateBarGrafic(corral_id)
      this.averageAnimals(corral_id)
    }

    public updateTable(corral_id:number): void{
      var corral = {
        'id': corral_id
      }
      this._animalService.searchAnimalCorral(corral)
      .subscribe(resAnimals => {
        this.animals = resAnimals;
      });
    }

    public averageAnimals(corral_id:number){
      var corral = {
        'id': corral_id
      }
      this._animalService.averageyAnimalCorral(corral)
      .subscribe(resAverage => {
        this.average = parseFloat(resAverage.toFixed(2));
      });
    }

    public updateBarGrafic(corral_id:number): void {
      var corral = {
        'id': corral_id
      }
      this._animalService.quantityAnimalCorral(corral)
      .subscribe(quantity => {
        this.barChartData[0].data = [
          quantity
        ]
        this.barChartData[0].label= 'Corral seleccionado'
      });
    }

}
