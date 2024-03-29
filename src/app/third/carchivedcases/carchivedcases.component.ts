import { Component, OnInit } from '@angular/core';
import { AddcaseService } from '../addcases/addcase.service';
import Addcases from '../addcases/addcase';
import { Router } from '@angular/router';
declare var $:any;
import { loginService } from '../../login/login.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-carchivedcases',
  templateUrl: './carchivedcases.component.html',
  styleUrls: ['./carchivedcases.component.css']
})
export class CarchivedcasesComponent implements OnInit {
  addcases: Addcases;
  addacase:any;
  casedata:any;
  error = '';
  success = '';
  searchText="";
  p=1;
  cases = {
    title: "",
    case_no: "",
    client_id: "",
    starred_cases:""
  }
  roleid;
details:any;
  constructor(private addcaseService: AddcaseService,private router: Router,private cookieService: CookieService,private loginService: loginService) { }

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
    this.addcaseService.getarchived().subscribe(
      (res: Addcases[]) => {
        this.addcases = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }

  starupdate(id: string | number) {
    this.resetErrors();

    this.addcaseService.starupdate(+id)
      .subscribe(
        (res: Addcases[]) => {
          this.addcases = res;
          this.gettodolist();
        },
        (err) => this.error = err
      );
  }


  deleteacase(data: string | number) {
    this.casedata=data;
    console.log(this.casedata);
    $('.deleteRequest').modal('show');
  }

  deletecases(){
    $('.deleteRequest').modal('hide');
    this.resetErrors();

    this.addcaseService.deleteacases(this.casedata)
      .subscribe(
        (res: Addcases[]) => {
          this.addacase = res;
          if(this.addacase.output==true)
        {
          $('.successmechPopup').modal('show');
         // this.router.navigate(["/main/dashboard"]);
        }
        this.gettodolist();
        },
        (err) => this.error = err
      );
  }

  restoreacase(data: string | number) {
    this.casedata=data;
    console.log(this.casedata);
    $('.restoreRequest').modal('show');
  }

  restorecases(){
    $('.restoreRequest').modal('hide');
    this.resetErrors();

    this.addcaseService.restoreacases(this.casedata)
      .subscribe(
        (res: Addcases[]) => {
          this.addacase = res;
          if(this.addacase.output==true)
        {
          $('.successmechPopup1').modal('show');
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
