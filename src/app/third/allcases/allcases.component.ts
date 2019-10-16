import { Component, OnInit } from '@angular/core';
import { AddcaseService } from '../addcases/addcase.service';
import Addcases from '../addcases/addcase';
import { Router } from '@angular/router';
import { loginService } from '../../login/login.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-allcases',
  templateUrl: './allcases.component.html',
  styleUrls: ['./allcases.component.css']
})
export class AllcasesComponent implements OnInit {

  addcases: Addcases;
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
  constructor(private cookieService: CookieService,private addcaseService: AddcaseService,private router: Router,private loginService: loginService ) { }

  ngOnInit() {
    this.roleid  = this.cookieService.get('roleId');
    this.gettodolist();
    this.getdetails(this.roleid);
  }

  gettodolist(): void {
    this.addcaseService.getAll().subscribe(
      (res: Addcases[]) => {
        this.addcases = res;
      },
      (err) => {
        this.error = err;
      }
    );
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

  private resetErrors(){
    this.success = '';
    this.error   = '';
  }
}
