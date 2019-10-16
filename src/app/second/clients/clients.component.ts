import { Component, OnInit } from '@angular/core';

import Addclient from './addclients/addclient';
import { AddclientService } from './addclients/addclients.service';
import { loginService } from '../../login/login.service';
import { CookieService } from 'ngx-cookie-service';
declare var $:any;
@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  addclients: Addclient[];
  addclients1:any;
  error = '';
  success = '';
  clientdata:any;
  p=1;
user={
  name :"",
  phone:"",
}
searchText;
roleid;
details:any;
  constructor(private addclientService: AddclientService,private cookieService: CookieService,private loginService: loginService) { }

  ngOnInit() {
    this.gettodolist();
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
  
  gettodolist(): void {
    this.addclientService.getAll().subscribe(
      (res: Addclient[]) => {
        this.addclients = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }
  deleteclients(data: string | number) {
    this.clientdata=data;
    console.log(this.clientdata);
    $('.deleteRequest').modal('show');
  }

  deleteclient(){
    $('.deleteRequest').modal('hide');
    this.resetErrors();

    this.addclientService.deleteclient(this.clientdata)
      .subscribe(
        (res: Addclient[]) => {
          this.addclients1 = res;
          if(this.addclients1.output==true)
        {
          $('.successmechPopup').modal('show');
         // this.router.navigate(["/main/dashboard"]);
        }
        this.gettodolist();
        },
        (err) => this.error = err
      );
  }

  private resetErrors(){
    this.success = '';
    this.error   = '';
  }
}