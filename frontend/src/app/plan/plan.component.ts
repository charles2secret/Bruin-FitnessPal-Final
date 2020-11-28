import { Component, OnInit } from '@angular/core';

// interface Activity {
//   Time: string,
//   Event: string,
//   Location?: string
// }

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})

export class PlanComponent implements OnInit {
  editMode: boolean = false;

  tevent: string = "temporary";
  event: string = "Event Works";

  // dayPlan : Activity[] = [];

  // constructor() { }

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

  cancelBut() {
    this.editMode = !this.editMode;
    this.tevent = this.event;
  }

  saveBut() {
    this.event = this.tevent;
    this.editMode = !this.editMode;
  }

  test() {
    console.log("test done");
  }

}
