import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddcaseService } from '../addcases/addcase.service';
import Addcases from '../addcases/addcase';
declare var $:any;

@Component({
  selector: 'app-fees',
  templateUrl: './fees.component.html',
  styleUrls: ['./fees.component.css']
})
export class FeesComponent implements OnInit {
  addcases: Addcases;
  error = '';
  searchText="";
  success = '';
  addtax:any;
  addpay:any;
  addinvoice1:any;
  p=1;
  cases = {
    case_title: "",
    case_no: "",
    total_fees: "",
    amount_paid:"",
    inv_no:""
  }
  invoice={
    inv_no:"",
    payment_mode_id:"",
    date:"",
    amount:"",
    tax_id:"",
    total:""
  }
  id: number;
  private sub: any;
  constructor(private route: ActivatedRoute,private addcaseService: AddcaseService) { }
  fetchfee(id: string | number): void {
    this.addcaseService.fetchfees(+id).subscribe(
      (res: Addcases[]) => {
        this.addcases = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }

  getpaydetails():void{
    this.addcaseService.getpaydetails().subscribe(
      (res: Addcases[]) => {
        this.addpay = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }

  gettaxdetails():void{
    this.addcaseService.gettaxdetails().subscribe(
      (res: Addcases[]) => {
        this.addtax = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }

  addinvoice(invoice) {
    console.log(invoice);
    this.addcaseService.addinv(invoice)
      .subscribe(
        (res) => {
          // Update the list of to do list
          this.addinvoice1 = res;
          console.log(this.addinvoice1);
          if(this.addinvoice1.output==true)
          {
            $('.successmechPopup').modal('show');
           // this.router.navigate(["/main/dashboard"]);
          }
          
        },
        (err) => {
          return this.error = err;
        }
      );
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
   });
   this.fetchfee(this.id);
   this.getpaydetails();
   this.gettaxdetails();
  }

  onModelChange(){
    console.log(this.invoice.total);
  }
}
