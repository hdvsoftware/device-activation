import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CustomerService } from 'src/app/shared/api/customer.service';
import { CustomerGridViewModel } from 'src/app/shared/model/customerGridViewModel';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit, OnDestroy {

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
  headElements = ['CODE','NAAM','OMSCHRIJVING','AANGEMAAKT','LICENTIES'];
  private getListSubscription: Subscription;


  constructor(
    private router: Router,
    private customerService: CustomerService) { }


  ngOnDestroy(): void {
    if(this.getListSubscription !== undefined) {
      this.getListSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.fetchData();  
    //this.customers = this.customerService.getCustomers();
  }

  fetchData() {
    if(this.getListSubscription !== undefined) {
      this.getListSubscription.unsubscribe();
      this.getListSubscription = null;
    }
    this.getListSubscription = this.customerService.customerGet().subscribe(
      (result: CustomerGridViewModel[]) => {
        this.customers = result;
      }
    )
  }

  addOmgeving() {
    this.router.navigate(['new']);
  }
}
