import { Component, OnInit } from '@angular/core';
import { AdddocumentService } from './adddocuments/adddocuments.service';
import Addddocuments from './adddocuments/adddocuments';
import { Router } from '@angular/router';
declare var $:any;
import { loginService } from '../../login/login.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  searchText:any;
  adddocuments:Addddocuments[];
  adddco:any;
  p=1;
  error="";
  success="";
  document = {
    title: "",
    type: "",
    case: ""
  }
  roleid;
details:any;
  attachdata:any;
  id: number;
  adddocuments2:any;
  private sub: any;
  constructor(private adddocumentservice: AdddocumentService,private router: Router,private cookieService: CookieService,private loginService: loginService) { }

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

  deletedocuments(data: string | number) {
    this.attachdata=data;
    console.log(this.attachdata);
    // console.log(this.id);
    $('.deleteRequest').modal('show');
  }
  deletedoc(){
    $('.deleteRequest').modal('hide');
    this.resetErrors();
    this.adddocumentservice.delete(this.attachdata)
      .subscribe(
        (res: Addddocuments[]) => {
          this.adddocuments2 = res;
          if(this.adddocuments2.output==true)
        {
          $('.successmechPopup1').modal('show');
         // this.router.navigate(["/main/dashboard"]);
        }
        
          this.gettodolist();
        },
        (err) => this.error = err
      );
  }
  gettodolist(): void {
    this.adddocumentservice.getAll().subscribe(
      (res) => {
        this.adddco = res;
        console.log(this.adddco);
      },
      (err) => {
        this.error = err;
      }
    );
  }
  private resetErrors(){
    this.success = '';
    this.error   = '';
  }

}
