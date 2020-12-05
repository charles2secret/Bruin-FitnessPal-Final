import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username: any = this.appService.getUsername()
  accountID: any = this.appService.getAccountId()
  gender: any = this.appService.getgender()
  email: any = this.appService.getemail()
  password: any = this.appService.getpassword()
  sleep: any = null
  water: any = null
  weight: any = null

  constructor(private appService: AppService) { }

  ngOnInit() {
    
  }
    

   


  

}
