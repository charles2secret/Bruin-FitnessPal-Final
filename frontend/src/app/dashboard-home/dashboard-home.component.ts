
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
//connect to backend
import { AppService } from "../app.service";
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit {

  constructor(private appService: AppService,private router: Router) { }

 
  ngOnInit() {
    
  }
  
  loginActivity(event: any){
    event.preventDefault()
    const target = event.target
    const activityName = target.querySelector('#activityName').value
    const type = target.querySelector('#type').value
    const duration = target.querySelector('#duration').value
    const calories = target.querySelector('#calories').value
    console.log(activityName,type,duration,calories)

  }
  loginCalories(event: any){
  }
  loginHealth(event: any){
  }
  loginDiet(event: any){
  }
}