import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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

  dataSource: MatTableDataSource<Device>;
  displayedColumns = [];
  @ViewChild(MatSort) sort: MatSort;
  columnNames = [
    {
      id: 'uuid',
      value: 'UUID'
    },
    {
      id: 'description',
      value: 'OMSCHRIJVING'
    },
    {
      id: 'modified',
      value: 'AANGEPAST'
    },
    {
      id: 'lastConnection',
      value: 'LAATSTE VERBINDING'
    },
  ]


  constructor(
    private datepipe: DatePipe,
    private deviceService: DeviceService) { }

  ngOnInit(): void {
    this.displayedColumns = this.columnNames.map(x => x.id);
    this.dataSource = new MatTableDataSource<Device>();
    if(this.devices) {
      this.dataSource.data = this.devices;
    } else {
      this.deviceService
      .deviceGetDevicesByEnvironmentEnvironmentIdGet(this.customerId)
      .subscribe(
        (data: Device[]) => {
          this.devices = data;
          this.dataSource.data = data;
        }
      );
    }
  }

  getDisplayValue(row: Device, column: string) {
    switch(column) {
      case 'modified':
        case 'lastConnection':
        return this.datepipe.transform(row[column], 'dd-MM-yyyy HH:mm')
      default:
        return row[column];
    }
  }

}
