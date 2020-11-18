import { Component, OnInit } from '@angular/core';
import { AppService } from "../app.service";
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private appService: AppService) { }

  ngOnInit() {

  }

  loginUser(event: any){
    event.preventDefault()
    const target = event.target
    const gender = target.querySelector('#gender').value
    const birthday=target.querySelector('#birthday').value
    const email=target.querySelector('#email').value
    const username = target.querySelector('#username').value
    const password = target.querySelector('#password').value
    this.appService.addIssue2(gender,username,password).subscribe((issue)=>{
     
     if (gender == "male") {
       alert("login success")
     }
     else {
       alert("login failed")
     }
   })
    console.log(gender,birthday,email,username,password)
  }
}


