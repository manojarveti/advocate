import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { cdashboard } from './cdashboard.service';
@Component({
  selector: 'app-cdashboard',
  templateUrl: './cdashboard.component.html',
  styleUrls: ['./cdashboard.component.css']
})
export class CdashboardComponent implements OnInit {
  userroll;
  userName;
  profileImage;
  userId;
  cdashboards:any;
  error:"";
  success = '';
  constructor(private cookieService: CookieService,private cdashboard: cdashboard) { }

  get(id: string | number){
    this.cdashboard.getmycase(+id).subscribe(data => {
      this.cdashboards = data;
    },
      (err) => {
        this.error = err;
      }
    );
    
  }
  ngOnInit() {
    this.userroll = this.cookieService.get('loggededInUser');
     this.userName = this.cookieService.get("name");
     this.profileImage = this.cookieService.get('profileImage');
     this.userId = this.cookieService.get('userId');
     console.log(this.userId);
     this.get(this.userId);
  }

}
