import { Component, OnInit } from '@angular/core';
//connect to backend
import { AppService } from "../app.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private appService: AppService) { }

  /*
  ngOnInit(): void {
  }

   */
  // a test case for login
  ngOnInit() {
    this.appService.addIssue("abs","edb").subscribe((issue)=>{
      const temp = {
        name: "10",
        age: "20",
      }
      if (issue == true) {
        alert("login success")
      }
      else {
        alert("login failed")
      }
    })
  }

 loginUser(event: any){
   console.log(event)
 }
}
