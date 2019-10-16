import { Component, OnInit } from '@angular/core';
import { Addleaveservice } from './leavenotification.service';
import { Router } from '@angular/router';
import leavenotification from './leavenotification';
import { loginService } from '../../login/login.service';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-leavenotification',
  templateUrl: './leavenotification.component.html',
  styleUrls: ['./leavenotification.component.css']
})
export class LeavenotificationComponent implements OnInit {
  addleaveserv: Addleaveservice[];
  addleaveserv1:any;
  error = '';
  success = '';
  p=1;
leave={
  date :"",
  employee:"",
  leave_type:"",
  reason:"",
  status:""
}
searchText;
roleid;
details:any;
  constructor(private addleaveservice :Addleaveservice,private cookieService: CookieService,private loginService: loginService) { }

  ngOnInit() {
    this.getleavenotify();
    this.roleid  = this.cookieService.get('roleId');
    this.getdetails(this.roleid);
  }

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


  getleavenotify(): void {
    this.addleaveservice.getAll().subscribe(
      (res: Addleaveservice[]) => {
        this.addleaveserv = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }

  statusupdate(id: string | number) {
    this.resetErrors();

    this.addleaveservice.statusupdate(+id)
      .subscribe(
        (res: Addleaveservice[]) => {
          this.addleaveserv = res;
          this.getleavenotify();
        },
        (err) => this.error = err
      );
      
  }

  private resetErrors(){
    this.success = '';
    this.error   = '';
  }
}
