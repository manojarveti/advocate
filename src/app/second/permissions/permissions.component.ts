import { Component, OnInit } from '@angular/core';
import { Addpermissionservice } from './permissions.service';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css']
})
export class PermissionsComponent implements OnInit {
  permission={};
  addpermission:any;
  error = '';
  success = '';
  addcount:any;
  addper:any;
  constructor(private addpermissionservice: Addpermissionservice) { }

  // addpremission(accessall,access2,access3,access4,access5,access6,access7,access8,access9,access10,access11,access12,access13,access14,access15,access16,access17,access18,access19,access20,access21,access22,access23,access24,access25,access26,access27,access28,access29,access30,access31,access32,access33,access34,access35,access36,access37,access38,access39,access40,access41,access42,access43,access44,access45,access46,access47,access48,access49,access50,access51,access52,access53,access54,access55,access56,access57,access58,access59,access60,access61,access62,access63,access64,access65,access66,access67,access68,access69,access70,access71,access72,access73,access74,access75,access76,access77,access78,access79,access80,access81,access82,access83,access84,access85,access86,access87,access88,access89,access90,access91,access92,access93,access94,access95,access96,access97,access98,access99,access100,access101,access102,access103,access104,access105,access106,access107,access108,access109,access110,access111,access112,access113,access114,access115,access116,access117,access118,access119,access120,access121,access122,access123,access124,access125,access126,access127,access128,access129,access130,access131,access132,access133,access134,access135,access136,access137,access138,access139,access140,access141,access142) {

  //   console.log(accessall.value,access2.value,access3.value,access4.value,access5.value,access6.value,access7.value,access8.value,access9.value,access10.value,access11.value,access12.value,access13.value,access14.value,access15.value,access16.value,access17.value,access18.value,access19.value,access20.value,access21.value,access22.value,access23.value,access24.value,access25.value,access26.value,access27.value,access28.value,access29.value,access30.value,access31.value,access32.value,access33.value,access34.value,access35.value,access36.value,access37.value,access38.value,access39.value,access40.value,access41.value,access42.value,access43.value,access44.value,access45.value,access46.value,access47.value,access48.value,access49.value,access50.value,access51.value,access52.value,access53.value,access54.value,access55.value,access56.value,access57.value,access58.value,access59.value,access60.value,access61.value,access62.value,access63.value,access64.value,access65.value,access66.value,access67.value,access68.value,access69.value,access70.value,access71.value,access72.value,access73.value,access74.value,access75.value,access76.value,access77.value,access78.value,access79.value,access80.value,access81.value,access82.value,access83.value,access84.value,access85.value,access86.value,access87.value,access88.value,access89.value,access90.value,access91.value,access92.value,access93.value,access94.value,access95.value,access96.value,access97.value,access98.value,access99.value,access100.value,access101.value,access102.value,access103.value,access104.value,access105.value,access106.value,access107.value,access108.value,access109.value,access110.value,access111.value,access112.value,access113.value,access114.value,access115.value,access116.value,access117.value,access118.value,access119.value,access120.value,access121.value,access122.value,access123.value,access124.value,access125.value,access126.value,access127.value,access128.value,access129.value,access130.value,access131.value,access132.value,access133.value,access134.value,access135.value,access136.value,access137.value,access138.value,access139.value,access140.value,access141.value,access142.value);

  // }
  addpremission() {

    console.log(this.addpermission);
    this.addpermissionservice.store(this.addpermission)
    .subscribe(
      (res) => {
        // Update the list of to do list
        this.addper = res;

        // Inform the user
      },
      (err) => this.error = err
    );
  }
  asIsOrder(a, b) {
    return 1;
  }
  getallu(): void {
    this.addpermissionservice.getAll().subscribe(data => {
      console.log(data);
      console.log(data[0].access.access1);  
      this.addpermission = data;
    },
      (err) => {
        this.error = err;
      }
    );
  }
  getallc(): void {
    this.addpermissionservice.getcount().subscribe(data => {
      this.addcount = data;
    },
      (err) => {
        this.error = err;
      }
    );
  }
  ngOnInit() {
    this.getallu();
    this.getallc();
  }

}
