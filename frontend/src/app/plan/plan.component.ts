import { Component, OnInit } from '@angular/core';
import { AppService } from "../app.service";

interface Event {
  time: string,
  activity: string
}

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})

export class PlanComponent implements OnInit {
  editMode: boolean = false;
  activities: string[] = [
    "walking",
    "jogging",
    "running",
    "swimming",
    "basketball",
    "football",
    "soccer",
    "volleyball",
    "hockey",
    "cycling",
    "skating"
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
    });
  }

  editFunc() {
    this.editMode = !this.editMode;
  }

  savePlan() {
    this.appService.savePlan(this.appService.getAccountId(), this.events).subscribe((data:any) => {
      if (data.status === "X113") {
        this.getPlan();
      }
    });
    this.editMode = !this.editMode;
  }

  cancelFunc() {
    this.getPlan();
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

}
