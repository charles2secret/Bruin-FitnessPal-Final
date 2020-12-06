import { Component, OnInit } from '@angular/core';
//connect to backend
import { AppService } from "../app.service";
import { Router } from '@angular/router';
import { NotifierService } from '../notifier.service';
import { AuthGuard } from '../auth.guard';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private appService: AppService, private router: Router,private notifierService:NotifierService,private auth:AuthGuard) { }


  ngOnInit() {

  }

  loginUser(event: any) {
    event.preventDefault()
    const target = event.target
    const username = target.querySelector('#username').value
    const password = target.querySelector('#password').value
    var message: string ='';


    

    this.appService.loginUserById(username, password).subscribe((data: any) => {

      if (data.status === "X103") {
        this.appService.getUserById(username,password).subscribe((user: any) => {
          this.appService.setAccountId(user.user.accountId)
          this.appService.setemail(user.user.contact.email)
          this.appService.setpassword(user.user.password)
          this.appService.setgender(user.user.gender)
          this.appService.setUsername(user.user.username)
        })
        this.appService.setLogginStatus(true) 
        this.router.navigate(['home'])


      }
      else if (data.status === "X003") {
        if (message !== "X103") {
          console.log(message)
          this.notifierService.showNotification(data.message,'ok')
        }
      }

    })


  }

}
