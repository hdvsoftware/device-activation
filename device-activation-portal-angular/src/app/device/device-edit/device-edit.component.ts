import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DeviceService } from 'src/app/shared/api/device.service';
import { CustomerGridViewModel } from 'src/app/shared/model/customerGridViewModel';
import { AddDeviceRequest, Device, UpdateDeviceRequest, UpdateDeviceViewModel } from 'src/app/shared/model/models';

@Component({
  selector: 'app-device-edit',
  templateUrl: './device-edit.component.html',
  styleUrls: ['./device-edit.component.css']
})
export class DeviceEditComponent implements OnInit, OnDestroy {
  deviceInfo: Device;
  customers: CustomerGridViewModel[];
  deviceForm: FormGroup;
  customerSelectable = false;
  private subscriptions: Subscription;
  isNew = false;
  customerId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private deviceService: DeviceService,
  ) { 
    this.subscriptions = new Subscription();
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  ngOnInit(): void {
    this.deviceForm = new FormGroup({
      'customerId': new FormControl(null, Validators.required),
      'uuid': new FormControl(null, Validators.required),
      'description': new FormControl()
    });
    this.customerId = +this.route.snapshot.params['id'];
    this.deviceForm.patchValue({
      'customerId': this.customerId
    })
    const deviceId = +this.route.snapshot.params['deviceId'];
    if(isNaN(deviceId)) {
      this.isNew = true;
    } else {
      this.loadDeviceInfo(deviceId);
    }
  }

  loadDeviceInfo(deviceId: number) {
    this.subscriptions.add(
      this.deviceService.deviceUpdateDeviceIdGet(deviceId).subscribe(
        (deviceInfo: UpdateDeviceViewModel) => {
          this.deviceInfo = deviceInfo;
          this.customers = deviceInfo.customers;
          this.deviceForm.patchValue({
            'customerId': deviceInfo.customerId,
            'uuid': deviceInfo.uuid,
            'description': deviceInfo.description
          })
        }
      ));
  }

  addNewDevice() {
    const addRequest: AddDeviceRequest = {
      customerId: +this.deviceForm.value.customerId,
      description: this.deviceForm.value.description,
      uuid: this.deviceForm.value.uuid,
    };
    console.log(addRequest);
    this.subscriptions.add(
      this.deviceService.deviceAddDevicePost(addRequest).subscribe(
        () => {
          this.returnToCustomerPage();
        }
      )
    );
  }

  updateDevice() {
    const updateRequest: UpdateDeviceRequest = {
      customerId: +this.deviceForm.value.customerId,
      description: this.deviceForm.value.description,
      uuid: this.deviceForm.value.uuid,
    };
    this.subscriptions.add(
      this.deviceService
        .deviceUpdateDeviceIdPut(this.deviceInfo.id, updateRequest)
        .subscribe(
          () => {
            this.returnToCustomerPage();
          }
        )
    );
  }

  onSubmit() {
    if(this.isNew) {
      this.addNewDevice();
    } else {
      this.updateDevice();
    }
  }

  returnToCustomerPage() {
    this.router.navigate(['../'], { relativeTo: this.route})
  }


}
