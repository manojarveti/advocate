import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddcaseService } from '../addcases/addcase.service';
import Addcases from '../addcases/addcase';
import { Router } from '@angular/router';
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
  listfees:any;
  listreciept:any;
  addrecinvo:any;
  addrec1:any;
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
    totalinv:"",
    case_id:""
  }
  receipt={
    fees_id:"",
    r_date:"",
    r_amount:"",
    case_id:""
  }
  getinvam:any;
  id: number;
  private sub: any;
  constructor(private route: ActivatedRoute,private addcaseService: AddcaseService, private router: Router, ) { 
  
  }
  fetchfee(id: string | number): void {
    this.addcaseService.fetchfees(+id).subscribe(
      (res: Addcases[]) => {
        this.addcases = res;

this.invoice.inv_no =  this.addcases[0].inv_no;
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

  getrecinvoicedetails(id: string | number):void{
    this.addcaseService.getallinvoice(+id).subscribe(
      (res: Addcases[]) => {
        this.addrecinvo = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }

  addinvoice(invoice) {
    this.addcaseService.addinv(invoice)
      .subscribe(
        (res) => {
          // Update the list of to do list
          this.addinvoice1 = res;
          if(this.addinvoice1.output==true)
          {
            $('.successmechPopup').modal('show');
          }

        },
        (err) => {
          return this.error = err;
        }
      );
  }

  addreceipt(receipt){
    this.addcaseService.addrec(receipt)
      .subscribe(
        (res) => {
          // Update the list of to do list
          this.addrec1 = res;
          if(this.addrec1.output==true)
          {
            $('.successmechPopup1').modal('show');
          }

        },
        (err) => {
          return this.error = err;
        }
      );
  }
  amountchange(invoice){
    var x = invoice.amount;
    var y = invoice.amount*(invoice.tax_id/100);
    var result = Number(x) + Number(y);
    this.invoice.totalinv = result.toString();
  }

  invoicechange(receipt){
    var inv=receipt.fees_id;
  //  console.log(receipt);
      this.addcaseService.getinvoiceamt(+inv).subscribe(
        (res:any) => {
          // console.log(res[0].amount);
          this.receipt.r_amount = res[0].amount;
        },
        (err) => {
          this.error = err;
        }
      );
    
}
  redirect(){
    this.router.navigate(["/main/cases/allcases"]);
   }

  gettodolist(id: string | number): void {
    this.addcaseService.getlist(+id).subscribe(
      (res: Addcases[]) => {
        this.listfees = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }

  getrecieptdolist(id: string | number): void {
    this.addcaseService.getreclist(+id).subscribe(
      (res: Addcases[]) => {
        this.listreciept = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.invoice.case_id=this.id.toString();
      this.receipt.case_id=this.id.toString();
      // In a real app: dispatch action to load the details here.
   });
   this.fetchfee(this.id);
   this.getpaydetails();
   this.gettaxdetails();
   this.gettodolist(this.id);
   this.getrecieptdolist(this.id);
   this.getrecinvoicedetails(this.id);
  }


}
