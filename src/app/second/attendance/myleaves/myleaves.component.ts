import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import myleaves from './myleaves';
import { loginService } from '../../../login/login.service';
import { CookieService } from 'ngx-cookie-service';
import { Myleaveservice } from './myleave.service';
declare var $:any;

@Component({
  selector: 'app-myleaves',
  templateUrl: './myleaves.component.html',
  styleUrls: ['./myleaves.component.css']
})
export class MyleavesComponent implements OnInit {
  myleaveservices:Myleaveservice[];
  myleaveservice2:any;
  myleaveservice3:any;
  error = '';
  success = '';
  p=1;
leave={
  date :"",
  leave_type:"",
  reason:"",
  status:""
}
searchText;
roleid;
details:any;
userId;
  constructor(private myleaveservice :Myleaveservice,private cookieService: CookieService,private loginService: loginService) { }

  ngOnInit() {
    this.roleid  = this.cookieService.get('roleId');
    this.userId  =this.cookieService.get('userId');
    this.getleavenotify(this.userId);
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

  getleavenotify(id: string | number): void  {
    this.myleaveservice.getAll(+id).subscribe(
      (res: Myleaveservice[]) => {
        this.myleaveservices = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }

  deletenotice(data: string | number) {
    this.myleaveservice2=data;
    console.log(this.myleaveservice2);
    $('.deleteRequest').modal('show');
  }

  deletenoticedata(){
    $('.deleteRequest').modal('hide');
    this.resetErrors();

    this.myleaveservice.deleteleavenotify(this.myleaveservice2)
      .subscribe(
        (res) => {
          this.myleaveservice3 = res;
          if(this.myleaveservice3.output==true)
        {
          $('.successmechPopup').modal('show');
         // this.router.navigate(["/main/dashboard"]);
        }
        this.getleavenotify(this.userId);
        },
        (err) => this.error = err
      );
  }  
  private resetErrors(){
    this.success = '';
    this.error   = '';
  }
}
