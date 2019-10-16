import { Component, OnInit } from '@angular/core';
import Addtax from './addtax/addtax';
import { AddtaxService } from './addtax/addtax.service';
declare var $:any;
import { loginService } from '../../login/login.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-tax',
  templateUrl: './tax.component.html',
  styleUrls: ['./tax.component.css']
})
export class TaxComponent implements OnInit {
  addtaxs: Addtax[];
  addtaxs1:any;
  taxdata:any;
  error = '';
  success = '';
  searchText="";
  p=1;
user={
  name :"",
  percent:""
}
roleid;
details:any;
  constructor(private addtaxService: AddtaxService,private cookieService: CookieService,private loginService: loginService) { }

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
    this.addtaxService.getAll().subscribe(
      (res: Addtax[]) => {
        this.addtaxs = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }

  deletetax(data: string | number) {
    this.taxdata=data;
    console.log(this.taxdata);
    $('.deleteRequest').modal('show');
  }

  deletetaxdata(){
    $('.deleteRequest').modal('hide');
    this.resetErrors();

    this.addtaxService.deletetax(this.taxdata)
      .subscribe(
        (res: Addtax[]) => {
          this.addtaxs1 = res;
          if(this.addtaxs1.output==true)
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
