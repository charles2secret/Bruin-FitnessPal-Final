import { Component, OnInit } from '@angular/core';
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

  constructor(private appService: AppService) { 
    //this.friends = null;
  }

  ngOnInit(): void {
    
  }

  // getFriends() {
  //   return this.appService.getFriends();
  // }

  addBut() {

    //this.friends.push(this.friend_ID);
    //this.friend_ID = "";
    //console.log(this.friends[0]);
  }

  showProfile() {

  }

  test() {
    // const tfriends = this.appService.getFriends().subscribe(data => {
    //   console.log(data);
    // });

    this.appService.getFriends().subscribe((data:any) => {
      //this.friends = data;
      console.log(data);
    });

    //this.appService.getFriends();
  }

}
