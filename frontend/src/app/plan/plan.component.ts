import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
//import {cloneDeep} from 'lodash';

interface Event {
  Time: string,
  Activity: string,
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

  events: Event[] = [
    {Time: "05:00", Activity: ""},
    {Time: "06:00", Activity: ""},
    {Time: "07:00", Activity: ""},
    {Time: "08:00", Activity: ""},
    {Time: "09:00", Activity: ""},
    {Time: "10:00", Activity: ""},
    {Time: "11:00", Activity: ""},
    {Time: "12:00", Activity: ""},
    {Time: "13:00", Activity: ""},
    {Time: "14:00", Activity: ""},
    {Time: "15:00", Activity: ""},
    {Time: "16:00", Activity: ""},
    {Time: "17:00", Activity: ""},
    {Time: "18:00", Activity: ""},
    {Time: "19:00", Activity: ""},
    {Time: "20:00", Activity: ""},
    {Time: "21:00", Activity: ""},
    {Time: "22:00", Activity: ""},
    {Time: "23:00", Activity: ""},   
  ];

  activities: string[] = [
    "running",
    "swimming"
  ];

  //locations: string[];

  tevents: Event[] = JSON.parse(JSON.stringify(this.events));

  constructor() { }

  ngOnInit(): void {
  }

  // openMenu() {
  //   this.trigger.openMenu();
  // }

  editFunc() {
    this.editMode = !this.editMode;
  }

  saveFunc() {
    this.events = JSON.parse(JSON.stringify(this.tevents));
    this.editMode = !this.editMode;
  }

  cancelFunc() {
    this.tevents = JSON.parse(JSON.stringify(this.events));
    this.editMode = !this.editMode;
  }

  clickFunc(event: Event, activity: string) {
    event.Activity = activity;
  }

  addActivity(activity: string) {
    this.activities.push(activity);
  }

  delActivity(activity: string) {
    this.activities = this.activities.filter(item => item != activity);
  }

  test() {
    this.tevents[0].Activity = "whoah";
    console.log(this.events[0].Activity + " ");
    console.log(this.tevents[0].Activity);
  }

}
