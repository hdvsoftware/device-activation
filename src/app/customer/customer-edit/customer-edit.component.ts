import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CustomerService } from 'src/app/shared/api/customer.service';
import { AddCustomerRequest } from 'src/app/shared/model/addCustomerRequest';
import { CustomerDetailViewModel } from 'src/app/shared/model/customerDetailViewModel';
import { UpdateCustomerRequest } from 'src/app/shared/model/updateCustomerRequest';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit, OnDestroy {
  private customerId:number;
  customerForm: FormGroup;
  private subscriptions: Subscription;
  isNew = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService
  ) {
    this.subscriptions = new Subscription();
   }


  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.customerForm = new FormGroup(
      {
        'name': new FormControl(null, [Validators.required]),
        'description': new FormControl(null),
        'code': new FormControl(null, [Validators.required]),
        'server': new FormControl(null),
        'maxDevices': new FormControl(null),
      }
    );

    this.customerId = +this.route.snapshot.params['id'];
    if(!isNaN(this.customerId)) {
      this.isNew = false;
      this.subscriptions.add( 
        this.customerService.customerDetailIdGet(this.customerId).subscribe(
          (data: CustomerDetailViewModel) => {
            this.customerForm.patchValue({
              'name': data.name,
              'description': data.description,
              'code': data.code,
              'server': data.server,
              'maxDevices': data.maxDevices
            });
          }
        )
      );
    }
  }

  onSubmit() {
    if(this.isNew) {
      this.insertCustomer();
    } else {
      this.updateCustomer();
    }
  }

  updateCustomer() {
    const reqBody: UpdateCustomerRequest = {
      name: this.customerForm.value.name,
      description: this.customerForm.value.description,
      code: this.customerForm.value.code,
      server: this.customerForm.value.server,
      numberOfDevices: this.customerForm.value.maxDevices
    }
    this.subscriptions.add( 
      this.customerService
        .customerUpdateCustomerIdPut(this.customerId, reqBody)
        .subscribe(
          (data: any) => {
            this.router.navigate(['../'])
          }
        )
    )
  }

  insertCustomer() {
    const reqBody: AddCustomerRequest = {
      name: this.customerForm.value.name,
      description: this.customerForm.value.description,
      code: this.customerForm.value.code,
      server: this.customerForm.value.server,
      numberOfDevices: this.customerForm.value.maxDevices
    };
    this.subscriptions.add( 
      this.customerService
        .customerAddCustomerPost(reqBody)
        .subscribe(
          (data: any) => {
            this.router.navigate(['../'])
          }
        )
    )    
  }

}
