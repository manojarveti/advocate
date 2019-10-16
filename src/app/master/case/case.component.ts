import { Component, OnInit } from '@angular/core';
import Addcasecategory from './addcasecategory/addcasecategory';
import { AddcasecategoryService } from './addcasecategory/addcasecategory.service';
declare var $:any;
import { loginService } from '../../login/login.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.css']
})
export class CaseComponent implements OnInit {
  Addcasecategory:Addcasecategory[];
  addcasecategorys:any;
  casedata:any;
  error = '';
  success = '';
  p=1;
  searchText="";
user={
  name :"",
  category_name:""
}
roleid;
details:any;
  constructor(private addcasecategoryservice: AddcasecategoryService,private cookieService: CookieService,private loginService: loginService) { }

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
    this.addcasecategoryservice.getAll().subscribe(
      (res: Addcasecategory[]) => {
        this.addcasecategorys = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }

  deletecasecat(data: string | number) {
    this.casedata=data;
    $('.deleteRequest').modal('show');
  }

  deletecasedata(){
    $('.deleteRequest').modal('hide');
    this.resetErrors();

    this.addcasecategoryservice.deletecasecategory(this.casedata)
      .subscribe(
        (res: any) => {
          this.addcasecategorys = res;
          if(this.addcasecategorys.output==true)
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
