import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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
  dataSource: MatTableDataSource<CustomerGridViewModel>;
  displayedColumns = [];
  @ViewChild(MatSort) sort: MatSort;
  columnNames = [
    {
      id: 'code',
      value: 'CODE'
    },
    {
      id: 'name',
      value: 'NAAM'
    },
    {
      id: 'description',
      value: 'OMSCHRIJVING'
    },
    {
      id: 'created',
      value: 'AANGEMAAKT'
    },
    {
      id: 'LICENTIES',
      value: 'LICENTIES'
    },
  ]
  private subscriptions: Subscription;

  constructor(
    private router: Router,
    private datepipe: DatePipe,
    private customerService: CustomerService) {
      this.subscriptions = new Subscription();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.displayedColumns = this.columnNames.map(x => x.id);
    this.dataSource = new MatTableDataSource<CustomerGridViewModel>()
    this.subscriptions.add(
      this.customerService.customerGet().subscribe(
        (result: CustomerGridViewModel[]) => {
          this.dataSource.data = result;
        }
      )
    );
  }

  getDisplayValue(row: CustomerGridViewModel, column: string) {
    
    switch(column) {
      case 'created':
        return this.datepipe.transform(row.created, 'dd-MM-yyyy HH:mm')
      case 'LICENTIES':
        return (row.registeredDevices+'/'+row.maxDevices);
      default:
        return row[column];
    }
  }

  addOmgeving() {
    this.router.navigate(['new']);
  }
}
