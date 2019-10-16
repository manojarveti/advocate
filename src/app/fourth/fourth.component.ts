import { Component, OnInit } from '@angular/core';
import Addcase from './addcase/addcase';
import { AddcaseService } from './addcase/addcase.service';
declare var $:any;
import { loginService } from '../login/login.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-fourth',
  templateUrl: './fourth.component.html',
  styleUrls: ['./fourth.component.css']
})
export class FourthComponent implements OnInit {
  addcasess: Addcase[];
  addcasess1:any;
  casedata:any;
  searchText;
  error = '';
  success = '';
  p=1;
  cases={
    notes:"",
    case_category_id: "",
    result:"",
    title:""
  }
  roleid;
details:any;
  constructor(private addcaseservice: AddcaseService,private cookieService: CookieService,private loginService: loginService) { }

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
    this.addcaseservice.getAll().subscribe(
      (res: Addcase[]) => {
        this.addcasess = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }

  deletecase(data: string | number) {
    this.casedata=data;
    console.log(this.casedata);
    $('.deleteRequest').modal('show');
  }

  deletecasestudy() {
    $('.deleteRequest').modal('hide');
    this.resetErrors();

    this.addcaseservice.deletecase(this.casedata)
      .subscribe(
        (res: Addcase[]) => {
          this.addcasess1 = res;
          if(this.addcasess1.output==true)
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
