import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CustomerService } from 'src/app/shared/api/customer.service';
import { CustomerDetailViewModel } from 'src/app/shared/model/customerDetailViewModel';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit, OnDestroy {

  customer: CustomerDetailViewModel;
  private subscriptions: Subscription;

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService) {
      this.subscriptions = new Subscription();
    }


  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    const customerId = +this.route.snapshot.params['id'];
    this.fetchData(customerId);
  }

  fetchData(customerId: number) {
    this.subscriptions.add( 
      this.customerService.customerDetailIdGet(customerId).subscribe(
        (data: CustomerDetailViewModel) => {
          this.customer = data;
        }
      )
    );
  }

  deleteCustomer() {
    //currently not implemented
    // this.subscriptions.add(
    //   this.customerService.
    // );
  }

}
