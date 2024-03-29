import { Component, OnInit } from '@angular/core';
import Addpaymentmode from './addpaymentmode/addpaymentmode';
import { AddpaymentmodeService } from './addpaymentmode/addpaymentmode.service';
declare var $:any;
import { loginService } from '../../login/login.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-payment-mode',
  templateUrl: './payment-mode.component.html',
  styleUrls: ['./payment-mode.component.css']
})
export class PaymentModeComponent implements OnInit {
  addpaymentmodes: Addpaymentmode[];
  addpaymentmodes1:any;
  paymentdata:any;
  error = '';
  success = '';
  searchText:"";
  p=1;
user={
  name :""
}
roleid;
details:any;
  constructor(private addpaymentmodeService: AddpaymentmodeService,private cookieService: CookieService,private loginService: loginService) { }

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
    this.addpaymentmodeService.getAll().subscribe(
      (res: Addpaymentmode[]) => {
        this.addpaymentmodes = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }
  deletepaymentmode(data: string | number) {
    this.paymentdata=data;
    console.log(this.paymentdata);
    $('.deleteRequest').modal('show');
  }

  deletepaymentdata(){
    $('.deleteRequest').modal('hide');
    this.resetErrors();

    this.addpaymentmodeService.deletepaymentmode(this.paymentdata)
      .subscribe(
        (res: Addpaymentmode[]) => {
          this.addpaymentmodes1 = res;
          if(this.addpaymentmodes1.output==true)
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
