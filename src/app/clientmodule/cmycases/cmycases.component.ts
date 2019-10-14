import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { mycaseslist } from './cmycases.service';
@Component({
  selector: 'app-cmycases',
  templateUrl: './cmycases.component.html',
  styleUrls: ['./cmycases.component.css']
})
export class CmycasesComponent implements OnInit {
  p=1;
  searchText;
    user_id;
    error = '';
    success = '';
    cmycaselist:any;
  constructor(private cookieService: CookieService,private mycaselist : mycaseslist) { }

  gettodolist(id: string | number): void {
    this.mycaselist.getAll(+id).subscribe(
      (res: any) => {
        this.cmycaselist = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }

  ngOnInit() {
    this.user_id = this.cookieService.get("userId");
    // console.log(this.user_id);
    this.gettodolist(this.user_id);
  }

}
