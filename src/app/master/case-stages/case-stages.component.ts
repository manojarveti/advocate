import { Component, OnInit } from '@angular/core';
import Addcasestages from './addcasestages/addcasestages';
import { AddcasestagesService } from './addcasestages/addcasestages.service';
declare var $:any;
import { loginService } from '../../login/login.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-case-stages',
  templateUrl: './case-stages.component.html',
  styleUrls: ['./case-stages.component.css']
})
export class CaseStagesComponent implements OnInit {

  addcasestagess: Addcasestages[];
  addcasestagess1:any;
  casedata:any;
  error = '';
  success = '';
  p=1;
  searchText="";
user={
  name :""
}
roleid;
details:any;

  constructor(private addcasestagesService: AddcasestagesService,private cookieService: CookieService,private loginService: loginService) { }

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
    this.addcasestagesService.getAll().subscribe(
      (res: Addcasestages[]) => {
        this.addcasestagess = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }

  deletecasestages(data: string | number) {
    this.casedata=data;
    console.log(this.casedata);
    $('.deleteRequest').modal('show');
  }

  deletecasedata(){
    $('.deleteRequest').modal('hide');
    this.resetErrors();

    this.addcasestagesService.deletecasestages(this.casedata)
      .subscribe(
        (res: Addcasestages[]) => {
          this.addcasestagess1 = res;
          if(this.addcasestagess1.output==true)
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
