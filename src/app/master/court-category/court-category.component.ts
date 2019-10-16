import { Component, OnInit } from '@angular/core';
import Addcourtcategory from './addcourtcategory/addcourtcategory';
import {AddcourtcategoryService} from './addcourtcategory/addcourtcategory.service';
declare var $:any;
import { loginService } from '../../login/login.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-court-category',
  templateUrl: './court-category.component.html',
  styleUrls: ['./court-category.component.css']
})
export class CourtCategoryComponent implements OnInit {
  addcourtcategorys: Addcourtcategory[];
  addcourtcategorys1:any;
  courtcategorydata:any;
  error = '';
  success = '';
  searchText="";
  p=1;
user={
  name :""
}
roleid;
details:any;
  constructor(private addcourtcategoryService: AddcourtcategoryService,private cookieService: CookieService,private loginService: loginService) { }

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
    this.addcourtcategoryService.getAll().subscribe(
      (res: Addcourtcategory[]) => {
        this.addcourtcategorys = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }

  deletecourtcategory(data: string | number) {
    this.courtcategorydata=data;
    $('.deleteRequest').modal('show');
  }

  deletecourtcat(){
    $('.deleteRequest').modal('hide');
    this.resetErrors();

    this.addcourtcategoryService.deletecourtcategory(this.courtcategorydata)
      .subscribe(
        (res: Addcourtcategory[]) => {
          this.addcourtcategorys1 = res;
          if(this.addcourtcategorys1.output==true)
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
