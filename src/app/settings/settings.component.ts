import { Component, OnInit } from '@angular/core';
import Addappointment from './addappointment/addappointment';
import { AddappointmentService } from './addappointment/addappointment.service';
import { loginService } from '../login/login.service';
import { CookieService } from 'ngx-cookie-service';
declare var $:any;
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  addappointments: Addappointment[];
  addappointments1:any;
  error = '';
  success = '';
  p=1;
appointment={
  title :"",
  contact:"",
  motive:"",
  date:"",
  notes:""
}
actdata:any;
searchText;
roleid;
details:any;
  constructor(private addappointmentService: AddappointmentService,private cookieService: CookieService,private loginService: loginService) { }

  ngOnInit() {
    this.getappointment();
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
  getappointment(): void {
    this.addappointmentService.getappointmentall().subscribe(
      (res: Addappointment[]) => {
        this.addappointments = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }


  deleteact(data: string | number) {
    this.actdata=data;
    $('.deleteRequest').modal('show');
  }



  deleteactdata(){
     $('.deleteRequest').modal('hide');
    this.resetErrors();

    this.addappointmentService.deleteappointment(this.actdata)
      .subscribe(
        (res: Addappointment[]) => {
          this.addappointments1 = res;
          if(this.addappointments1.output==true)
          {
            $('.successmechPopup').modal('show');
           // this.router.navigate(["/main/dashboard"]);
          }
          this.getappointment();
          },
          (err) => this.error = err
        );
  }

  private resetErrors(){
    this.success = '';
    this.error   = '';
  }
  
}
