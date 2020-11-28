import { Component, OnInit } from '@angular/core';

interface Activity {
  Time: string,
  Event: string,
  Location: string
}

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})

export class PlanComponent implements OnInit {

  event: string = "";

  dayPlan : Activity[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  dayClick() {
    
  }

  enter() {
    this.dayPlan = [{Time: "12:00am", Event: this.event, Location: "gym"}];
  }

}
