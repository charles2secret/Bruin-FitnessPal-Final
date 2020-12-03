
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
//connect to backend
import { AppService } from "../app.service";
import { Router } from '@angular/router';
import { NotifierService } from '../notifier.service';
@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit {

  constructor(private appService: AppService,private router: Router,private notifierService:NotifierService) { }

 
  ngOnInit() {
    
  }
  
  loginActivity(event: any){
    event.preventDefault()
    const target = event.target
    const date = target.querySelector('#date').value
    const activityName = target.querySelector('#activityName').value
    const type = target.querySelector('#type').value
    const duration = target.querySelector('#duration').value
    const calories = target.querySelector('#calories').value
    const timeOfDay = target.querySelector('#timeOfDay').value
    this.appService.putActivity(this.appService.getAccountId(),date,activityName,type,calories,duration,timeOfDay).subscribe((data:any)=>{
        console.log(this.appService.getAccountId(),date,activityName,type,calories,duration,timeOfDay)
    })
  }
  checkActivity(event:any){
    event.preventDefault()
    const target = event.target
    const date = target.querySelector('#date').value
    this.appService.getActivity(this.appService.getAccountId(),date).subscribe((data:any)=>{
      if(data.status==="X111"){
        this.appService.setActivityDate(date)
        this.router.navigate(['table'])
        
        console.log(data.activityDiary)
      }
      else{
        this.notifierService.showNotification(data.message,'ok')
      }
    }

    )
  }
  checkCalories(event: any){
    event.preventDefault()
    const target = event.target
    const metabolism = target.querySelector('#metabolism').value
    const date = target.querySelector('#date').value
    this.appService.setMetabolism(metabolism)
    
    var message:string=''
    var status1:string=''
    var status2:string=''
    this.appService.getActivity(this.appService.getAccountId(),date).subscribe((data:any)=>{
      if(data.status==="X111"){
        status1="X111"
        console.log(data.activityDiary.dailyCalorieBurned)
        this.appService.setCalorieB(data.activityDiary.dailyCalorieBurned)
      }
      else{
        this.notifierService.showNotification(data.message,'ok')
      }
    }

    )
    this.appService.getFood(this.appService.getAccountId(),date).subscribe((data:any)=>{
      if(data.status==="X111"){
        status2="X111"
        this.appService.setCalorieC(data.foodDiary.dailyCalorieConsumed)
      }
      else{
        this.notifierService.showNotification(data.message,'ok')
      }
    }
    )
    
    if(status1==="X111" && status2==="X111"){
      this.appService.setActivityDate(date)
        this.router.navigate(['chart'])
    }
  }
  
  loginHealth(event: any){
  }
  loginDiet(event: any){
  }
}