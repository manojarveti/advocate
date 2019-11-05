import { Component, OnInit } from '@angular/core';
import Addcases from '../addcases/addcase';
import { AddcaseService } from '../addcases/addcase.service';
import { ActivatedRoute, Router } from "@angular/router";
import { loginService } from '../../login/login.service';
import { CookieService } from 'ngx-cookie-service';
declare var $:any;
@Component({
  selector: 'app-hearingdates',
  templateUrl: './hearingdates.component.html',
  styleUrls: ['./hearingdates.component.css']
})
export class HearingdatesComponent implements OnInit {
  addcases: Addcases[];
  addcases1:any;
selectedfile;
error = '';
  success = '';
  searchText="";
  p=1;
user={
  nextdate:"",
  lastdate:"",
  notes:"",
  case_id:""
}
actdata:any;
roleid;
details:any;
subscribedParam = "initial value";
id: number;
private sub: any;
  constructor( private router: Router, private activatedRoute: ActivatedRoute,private addcaseService: AddcaseService,private cookieService: CookieService,private loginService: loginService) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.subscribedParam = params.get("id");
      this.id = +params.get("id");
       this.user.case_id=this.subscribedParam;
    });
   }
   getFileDetails(e) {
     this.selectedfile = <File>e.target.files[0];
   }

   addhearing(user: Addcases) {
    const fd = new FormData();
     fd.append("userEmp", JSON.stringify(user));
     if(this.selectedfile!=undefined){
      fd.append('filename', this.selectedfile,this.selectedfile.name);
     }
    this.addcaseService.addhearing(fd)
    .subscribe(
      (res: Addcases[]) => {
        // Update the list of to do list
        this.addcases = res;
        // Inform the user
        this.success = 'Added successfully';
        // Reset the form
        this.router.navigate(["/main/cases/allcases"]);
      },
      (err) => this.error = err
    );
  }

  fetchtodolist(id: string | number): void {
    this.addcaseService.fetchhearing(+id).subscribe(
      (res: Addcases[]) => {
        this.addcases = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }

  deleteact(data: string | number) {
    this.actdata=data;
    $('.deleteRequest').modal('show');
  }


  deleteactdata(){
    $('.deleteRequest').modal('hide');
   this.resetErrors();

   this.addcaseService.deletehear(this.actdata)
     .subscribe(
       (res: Addcases[]) => {
         console.log(this.actdata);
         this.addcases1 = res;
         if(this.addcases1.output==true)
         {
           $('.successmechPopup').modal('show');
          // this.router.navigate(["/main/dashboard"]);
         }
         this.fetchtodolist(this.id);
         },
         (err) => this.error = err
       );
 }

  // deletehearing(id: string | number) {
  //   this.resetErrors();
  //   this.addcaseService.deletehear(+id)
  //     .subscribe(
  //       (res: Addcases[]) => {
  //         this.addcases = res;
  //         this.fetchtodolist(this.id);
  //       },
  //       (err) => this.error = err
  //     );
  // }

  private resetErrors(){
    this.success = '';
    this.error   = '';
  }
  ngOnInit() {
   this.fetchtodolist(this.id);
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

}
