import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/shared/api/customer.service';
import { CustomerGridViewModel } from 'src/app/shared/model/customerGridViewModel';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  customers: CustomerGridViewModel[];
/*
public id: number,
        public name:string,
        public description:string,
        public code:string,
        public created:Date,
        public modified:Date,
        public deleted:Date
*/
  headElements = ['ID','CODE','NAME','DESCRIPTION','CREATED','MODIFIED'];

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.customerService.customerGet().subscribe(
      (result: CustomerGridViewModel[]) => {
        this.customers = result;
      }
    )
    //this.customers = this.customerService.getCustomers();
  }

}
