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
  headElements = ['CODE','NAAM','OMSCHRIJVING','AANGEMAAKT','LICENTIES'];
  private subscriptions: Subscription;

  constructor(
    private router: Router,
    private customerService: CustomerService) {
      this.subscriptions = new Subscription();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.customerService.customerGet().subscribe(
        (result: CustomerGridViewModel[]) => {
          this.customers = result;
        }
      )
    );
  }

  addOmgeving() {
    this.router.navigate(['new']);
  }
}
