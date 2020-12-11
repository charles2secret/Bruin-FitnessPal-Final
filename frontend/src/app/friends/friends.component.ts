import { Component, OnInit, Testability } from '@angular/core';
import { AppService } from "../app.service";


@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  newFriend: string;
  friends: string[];
  listMode: boolean = true;

  constructor(private appService: AppService) { 
    this.newFriend = "";
    this.friends = [];
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
      else if (data.status === "001") {

      }
      else if (data.status === "X001") {

      }
    });
  }

  addFriend() {
    this.appService.addFriend(this.newFriend).subscribe((data:any) => {
      if (data.status === "X113") {
        this.getFriends();
      }
    });
    this.clearFunc();
  }

  delFriend(friend: string) {
    console.log(friend);
    this.appService.delFriend(friend).subscribe((data:any) => {
      console.log(data.status);
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
    this.appService.getActivity(friend, this.appService.getActivityDate()).subscribe((data:any) => {
      console.log(data);
    })
  }

  test() {
  }

}
