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
    alert("helo?")
    this.appService.getIssues().subscribe((issue)=>{
      console.log(issue);
    })

  }

 loginUser(event: any){
   console.log(event)
 }
}
