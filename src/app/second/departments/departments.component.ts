import { Component, OnInit } from '@angular/core';
import Adddepartment from './adddepartments/adddepartments';
import { AdddepartmentService } from './adddepartments/adddepartments.service';
declare var $: any;
import { loginService } from '../../login/login.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {
  adddepartments: Adddepartment[];
  adddepartments1:any;
  departmentdata:any; 
  error = '';
  success = '';
  p=1;
user={
  name :"",
  description:"",
  designations:"",
}
searchText;
roleid;
details:any;
constructor(private adddepartmentService: AdddepartmentService,private cookieService: CookieService,private loginService: loginService) { }

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
  this.adddepartmentService.getAll().subscribe(
    (res: Adddepartment[]) => {
      this.adddepartments = res;
    },
    (err) => {
      this.error = err;
    }
  );
}



deletedepartment(data: string | number) {
  this.departmentdata=data;
  console.log(this.departmentdata);
  $('.deleteRequest').modal('show');
}

deletedepartments(){
  $('.deleteRequest').modal('hide');
  this.resetErrors();

  this.adddepartmentService.deletedepartment(this.departmentdata)
    .subscribe(
      (res: Adddepartment[]) => {
        this.adddepartments1 = res;
        if(this.adddepartments1.output==true)
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
