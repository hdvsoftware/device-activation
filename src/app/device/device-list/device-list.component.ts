import { Component, Input, OnInit } from '@angular/core';
import { DeviceService } from 'src/app/shared/api/device.service';
import { Device } from 'src/app/shared/model/models';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit {

  @Input() customerId: number;
  @Input() devices: Device[];
  headElements = ['UUID', 'OMSCHRIJVING', 'AANGEPAST', 'LAATSTE VERBINDING']

  constructor(private deviceService: DeviceService) { }

  ngOnInit(): void {
    if(!this.devices) {
      this.deviceService
      .deviceGetDevicesByEnvironmentEnvironmentIdGet(this.customerId)
      .subscribe(
        (data: Device[]) => {
          console.log('fetched devices')
          this.devices = data;
        }
      );
    }
    
  }

  addDevice() {

  }
}
