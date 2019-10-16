import { Component, OnInit } from '@angular/core';
import Addlocation from './addlocation/addlocation';
import { AddlocationService } from './addlocation/addlocation.service';
declare var $:any;
import { loginService } from '../../login/login.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  addlocations: Addlocation[];
  addlocations1:any;
  locadata:any;
  error = '';
  searchText="";
  p= 1;
  success = '';
user={
  location :""
}
roleid;
details:any;
  constructor(private addlocationService: AddlocationService,private cookieService: CookieService,private loginService: loginService) { }

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
    this.addlocationService.getAll().subscribe(
      (res: Addlocation[]) => {
        this.addlocations = res;
        this.addlocations.push();
      },
      (err) => {
        this.error = err;
      }
    );
  }

  deletelocation(data: string | number) {
    this.locadata=data;
    console.log(this.locadata);
    $('.deleteRequest').modal('show');
  }

  deleteloc(){
    $('.deleteRequest').modal('hide');
    this.resetErrors();

    this.addlocationService.deletelocation(this.locadata)
      .subscribe(
        (res: Addlocation[]) => {
          this.addlocations1 = res;
          if(this.addlocations1.output==true)
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
