import { Component, OnInit } from '@angular/core';
//connect to backend
import { AppService } from "../app.service";
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private appService: AppService, private router: Router) { }


  ngOnInit() {

  }

  loginUser(event: any) {
    event.preventDefault()
    const target = event.target
    const username = target.querySelector('#username').value
    const password = target.querySelector('#password').value
    var message: string;
    this.appService.loginUserByName(username, password).subscribe((data: any) => {

      if (data.status === "X103") {
        message = data.status
        this.router.navigate(['home'])

      }
      else if (data.status === "X003") {


      }

    })

    this.appService.loginUserById(username, password).subscribe((data: any) => {

      if (data.status === "X103") {
        this.router.navigate(['home'])
        
      }
      else if (data.status === "X003") {
        if (message !== "X103") {
          alert(data.message)
        }
      }

    })

  }

}
