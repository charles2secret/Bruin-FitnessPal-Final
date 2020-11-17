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
    
  }

 loginUser(event: any){
   event.preventDefault()
   const target = event.target
   const username = target.querySelector('#username').value
   const password = target.querySelector('#password').value
   this.appService.addIssue(username,password).subscribe((issue)=>{
    
    if (username == "123") {
      alert("login success")
    }
    else {
      alert("login failed")
    }
  })
   console.log(username,password)
 }
}
