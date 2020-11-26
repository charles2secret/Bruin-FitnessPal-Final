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
    
    const email=target.querySelector('#email').value
    const username = target.querySelector('#username').value
    const password = target.querySelector('#password').value
    const userID = target.querySelector('#userID').value
    this.appService.registerUser(username,password,userID,email,gender).subscribe((issue)=>{
     
     if (gender == "male") {
       alert("login success")
     }
     else {
       alert("login failed")
     }
   })
    console.log(gender,email,username,password)
  }
}


