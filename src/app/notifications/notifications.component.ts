import { Component, OnInit } from '@angular/core';
import Addcontact from './addcontact/addcontact';
import { AddcontactService } from './addcontact/addcontact.service';
declare var $:any;
import { loginService } from '../login/login.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  addcontacts: Addcontact[];
  addcontacts1:any;
  error = '';
  success = '';
  contactdata:any;
  p=1;
contacts={
  name :"",
  eamil:"",
  phone :"",
  address:""
}
searchText;
roleid;
details:any;
  constructor(private addcontactService: AddcontactService,private cookieService: CookieService,private loginService: loginService) { }

  ngOnInit() {
    this.getcontact();
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
  
  getcontact(): void {
    this.addcontactService.getcontactAll().subscribe(
      (res: Addcontact[]) => {
        this.addcontacts = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }

  deletecontactAdd(data: string | number) {
    this.contactdata=data;
    $('.deleteRequest').modal('show');
  }

  deletecontact(){
    $('.deleteRequest').modal('hide');
    this.resetErrors();

    this.addcontactService.deletecontact(this.contactdata)
      .subscribe(
        (res: Addcontact[]) => {
          this.addcontacts1 = res;
          if(this.addcontacts1.output==true)
        {
          $('.successmechPopup').modal('show');
         // this.router.navigate(["/main/dashboard"]);
        }
        this.getcontact();
        },
        (err) => this.error = err
      );
  }

  goToview(id) {
    this.addcontactService.navigate(['/main/contacts/view', id]);
  }


  private resetErrors(){
    this.success = '';
    this.error   = '';
  }


}
