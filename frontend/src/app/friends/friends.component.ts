import { Component, OnInit } from '@angular/core';
import { AppService } from "../app.service";
import { DatePipe } from '@angular/common';


export interface Activity {
  activityName: string;
  activityType: string;
  timeOfDay: string;
  calorieBurned: number;
  duration: number;
}

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css'],
  providers: [DatePipe]
})
export class FriendsComponent implements OnInit {
  newFriend: string;
  friends: string[];
  listMode: boolean = true;
  todayDate: any;
  friendActivities: Activity[] = [];
  isActivity: boolean = false;
  friendExists: boolean = true;

  constructor(private appService: AppService, private datePipe: DatePipe) { 
    this.newFriend = "";
    this.friends = [];
    this.todayDate = new Date();
    this.todayDate = this.datePipe.transform(this.todayDate, 'yyyy-MM-dd');
  }

  ngOnInit(): void {
    this.getFriends();
  }

  getFriends() {
    this.appService.getFriends(this.appService.getAccountId()).subscribe((data:any) => {
      if (data.status === "X111") {
        var i: number; var size: number = data.friendList.length;
        this.friends = [];
        for (i = 0; i < size; i++) {
          this.friends.push(data.friendList[i].friendId);
        }
      }
    });
  }

  addFriend() {

    this.appService.addFriend(this.appService.getAccountId(), this.newFriend).subscribe((data:any) => {
      if (data.status === "X113") {
        this.friendExists = true;
        this.getFriends();
      }
      else {
        this.friendExists = false;
      }
    });
    this.clearFunc();
  }

  delFriend(friend: string) {
    this.appService.delFriend(this.appService.getAccountId(), friend).subscribe((data:any) => {
      if (data.status === "X114") {
        this.getFriends();
      }
    });   
  }

  clearFunc() {
    this.newFriend = "";
  }

  showProfile(friend: string) {
    this.listMode = false;
    this.appService.getActivity(friend, this.todayDate).subscribe((data:any) => {
      if(data.status==="X111"){
        this.isActivity = true;
        for (let i = 0; i < data.activityDiary.activity.length; i++) {
          let activity = data.activityDiary.activity[i];
          this.friendActivities.push({
            activityName: activity.activityName,
            activityType: activity.activityType,
            timeOfDay: activity.timeOfDay,
            calorieBurned: activity.calorieBurned,
            duration: activity.duration
          })
        }
      }
      else{
        this.isActivity = false;
      }
    });
  }

  back() {
    this.friendActivities = [];
    this.listMode = true;
  }
}
