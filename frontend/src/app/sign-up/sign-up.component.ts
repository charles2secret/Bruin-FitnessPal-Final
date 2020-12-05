import { Component, OnInit } from '@angular/core';
import { AppService } from "../app.service";
import { Router } from '@angular/router';
import { NotifierService } from '../notifier.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private appService: AppService,private router: Router,private notifierService:NotifierService) { }

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
    this.appService.registerUser(username,password,userID,email,gender).subscribe((data:any)=>{
     
      if (data.status === "X103") {
        this.notifierService.showNotification('Successfully sign up! Login with your new account!','ok')
        this.router.navigate(['login'])
      }
      else if (data.status === "X003"){
        this.notifierService.showNotification(data.message,'ok')
      }
   })
    
  }
}


