import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';

const sampleData:any[]=[
  {data:[1000],label:"consumption"},
  {data:[-500],label:'burned'},
  {data:[500],label:"surplus/deficit"},

];
const labels:string[] = ['date']
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  constructor() { }
  public barChartData: any[] = sampleData;
  public barChartLabels:string[] = labels;
  public barChartType: ChartType ='bar';
  public barChartLegend:any={
    verticalAlignment: 'bottom',
    horizontalAlignment:'center'
  };
  public barChartOptions:any={
    scaleShowVerticalLines:false,
    responsive: true

  };


  ngOnInit(): void {
  }

}
