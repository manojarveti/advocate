import { Component, OnInit } from '@angular/core';
import Addappointment from './addappointment/addappointment';
import { AddappointmentService } from './addappointment/addappointment.service';
import { loginService } from '../login/login.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  addappointments: Addappointment[];
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

  deleteappointmentadd(id: string | number) {
    this.resetErrors();

    this.addappointmentService.deleteappointment(+id)
      .subscribe(
        (res: Addappointment[]) => {
          this.addappointments = res;
          this.success = 'Deleted successfully';
        },
        (err) => this.error = err
      );
  }

  private resetErrors(){
    this.success = '';
    this.error   = '';
  }
  
}
