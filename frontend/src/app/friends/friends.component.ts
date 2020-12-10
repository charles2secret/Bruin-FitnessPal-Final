import { Component, OnInit, Testability } from '@angular/core';
import { IFriend } from '../friend';
import { AppService } from "../app.service";


@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  // friends: {
  //   status: string,
  //   friendList: 
  //     {
  //       _id: string,
  //       friendId: string
  //     }[]
  // };

  newFriend: string;
  friends: string[];

  constructor(private appService: AppService) { 
    this.newFriend = "";
    this.friends = [];
  }

  ngOnInit(): void {
    this.appService.getFriends(this.appService.getAccountId()).subscribe((data:any) => {
      if (data.status === "X111") {
        var i: number; var size: number = data.friendList.length;
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

  // getFriends() {
  //   return this.appService.getFriends();
  // }

  addFriend() {
    this.appService.addFriend(this.newFriend).subscribe((data:any) => {
      if (data.status === "X113") {
        this.friends.push(this.newFriend);
      }
    });
    this.clearFunc();
  }

  delFriend(friend: string) {
    // console.log(friend);
    // this.appService.delFriend(friend).subscribe((data:any) => {
    //   console.log(data.status);
    //   if (data.status === "X114") {
        
    //   }
    // });
    this.friends = this.friends.filter(item => item != friend);    
  }

  clearFunc() {
    this.newFriend = "";
  }

  showProfile() {

  }

  test() {
    // const tfriends = this.appService.getFriends().subscribe(data => {
    //   console.log(data);
    // });

    

    //this.appService.getFriends();
  }

}
