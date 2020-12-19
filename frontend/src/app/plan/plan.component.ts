import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { AppService } from "../app.service";
//import {cloneDeep} from 'lodash';

interface Event {
  time: string,
  activity: string,
  Location?: string
}

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})

export class PlanComponent implements OnInit {
  //@ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  
  editMode: boolean = false;
  showActs: boolean = false;
  activities: string[] = [
    "running",
    "swimming"
  ];

  events: Event[] = [
    {time: "05:00", activity: ""},
    {time: "06:00", activity: ""},
    {time: "07:00", activity: ""},
    {time: "08:00", activity: ""},
    {time: "09:00", activity: ""},
    {time: "10:00", activity: ""},
    {time: "11:00", activity: ""},
    {time: "12:00", activity: ""},
    {time: "13:00", activity: ""},
    {time: "14:00", activity: ""},
    {time: "15:00", activity: ""},
    {time: "16:00", activity: ""},
    {time: "17:00", activity: ""},
    {time: "18:00", activity: ""},
    {time: "19:00", activity: ""},
    {time: "20:00", activity: ""},
    {time: "21:00", activity: ""},
    {time: "22:00", activity: ""},
    {time: "23:00", activity: ""},   
  ];

  //locations: string[];

  tevents: Event[] = JSON.parse(JSON.stringify(this.events));

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.getPlan();
  }

  getPlan() {
    this.appService.getPlan(this.appService.getAccountId()).subscribe((data:any) => {
      if (data.status === "X111") {
        let plan = data.workoutPlan;
        let i: number; let size: number = plan.length;
        this.events = [];
        for (i = 0; i < size; i++) {
          this.events.push({
            time: plan[i].time,
            activity: plan[i].activity
          });
        }
      }
      else {
        console.log("Error getting plan");
      }
    });
  }

  editFunc() {
    this.editMode = !this.editMode;
  }

  savePlan() {
    this.appService.savePlan(this.appService.getAccountId(), this.events).subscribe((data:any) => {
      if (data.status === "X113") {
        console.log(data);
        this.getPlan();
      }
      else {
        console.log("Error getting plan");
      }
    });
    // this.events = JSON.parse(JSON.stringify(this.tevents));
    this.editMode = !this.editMode;
  }

  cancelFunc() {
    this.getPlan();
    console.log(this.events);
    this.editMode = !this.editMode;
  }

  clickFunc(event: Event, activity: string) {
    event.activity = activity;
  }

  addActivity(activity: string) {
    if (activity === "") {
      return;
    }
    let size: number = this.activities.length;
    for (let i = 0; i < size; i++) {
      if (this.activities[i].toLowerCase() === activity.toLowerCase()) {
        return;
      }
    }
    this.activities.push(activity.toLowerCase());
  }

  delActivity(activity: string) {
    this.activities = this.activities.filter(item => item != activity);
  }

  test() {
    this.getPlan();
    console.log(this.events);
  }

}
