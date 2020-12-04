import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { AppService } from '../app.service';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  
  constructor(private appService: AppService) { }
  public barChartData: any[] = [
    {data:[this.appService.getCalorieC()],label:"consumption"},
    {data:[(-1)*this.appService.getCalorieB()],label:'burned'},
    {data:[(-1)*this.appService.getMetabolism()],label:'metabolism'},
    {data:[this.appService.getCalorieC()-this.appService.getCalorieB()-this.appService.getMetabolism()],label:"surplus/deficit"}
  ];
  public barChartLabels:string[] = [this.appService.getActivityDate()];
  public barChartType: ChartType ='bar';
  public barChartLegend:any={
    verticalAlignment: 'bottom',
    horizontalAlignment:'center'
  };
  public barChartOptions:any={
    scaleShowVerticalLines:false,
    responsive: true

  };
  public colors: any = [
    {
      backgroundColor:"#ffa000"
    },
    {
      backgroundColor:"#03a9f4"
    },
    {
      backgroundColor:"#2196f3"
    },
    {
      backgroundColor:"#3f51b5"
    }
  ]


  ngOnInit(): void {
  }

}
