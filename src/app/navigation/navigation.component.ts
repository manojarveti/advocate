import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import logins from '../login/login';
import { loginService } from '../login/login.service';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  showSubmenu;
  showSubmenucases;
  showSubmenutasks;
  showSubmenumaster;
  userroll;
  name;
  roleid;
  details:any;
  public loading = false;
  getUrl;
  userName;
  profileImage;
  cookieValue = 'UNKNOWN';
  error = '';
  private _sessionId: string;

constructor(private cookieService: CookieService,private router: Router,private loginService: loginService) {
  this._sessionId = cookieService.get("sessionId");
}


  logout() {
    this.cookieService.deleteAll();
    sessionStorage.clear();
  };
  getdetails(roleid){
    this.loginService.fetchAll(+roleid).subscribe(
      (res) => {
        this.details = res;
        // console.log(res.access);
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
    this.roleid  = this.cookieService.get('roleId');
    if(this.userName == ''){
      this.router.navigate(['/']);
    }
   this.getdetails(this.roleid);
      // this.cookieValue = this.cookieService.get('name'); // To Get Cookie
   
  }

}
