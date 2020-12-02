import { Component, OnInit } from '@angular/core';
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
  editMode: boolean = false;

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

  tevents: Event[] = JSON.parse(JSON.stringify(this.events));
  //tevents: Event[] = this.events.slice(0);
  // events.forEach(val => tevents.push(Object.assign({}, val)));
  // tevents: Event[] = this.events.slice();

  // dayPlan : Activity[] = [];

  

  constructor() { }

  ngOnInit(): void {
  }

  // dayClick() {
    
  // }

  // enter() {
  //   this.dayPlan = [{Time: "12:00am", Event: this.event}];
  // }

  editBut() {
    this.editMode = !this.editMode;
  }

  saveBut() {
    //this.tevents[0].Activity = "lol";
    console.log(this.tevents[0].Activity);
    this.events = JSON.parse(JSON.stringify(this.tevents));
    //this.events = this.tevents.slice(0);
    //this.events = this.tevents;
    this.editMode = !this.editMode;
  }

  cancelBut() {
    //this.tevents = this.events.slice(0);
    this.tevents = JSON.parse(JSON.stringify(this.events));
    this.editMode = !this.editMode;
    
  }

  test() {
    this.tevents[0].Activity = "whoah";
    console.log(this.events[0].Activity + " ");
    console.log(this.tevents[0].Activity);
  }

}
