import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DataTableDataSource, DataTableItem } from './data-table-datasource';
import {AppService} from "../app.service";
import {Router} from "@angular/router";
import {NotifierService} from "../notifier.service";

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild(MatTable) table: MatTable<DataTableItem> | undefined;
  dataSource: DataTableDataSource | undefined;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['duration', 'activityName', 'activityType', 'timeOfDay', 'calorieBurned'];

  constructor(private appService: AppService, private router: Router,private notifierService:NotifierService) { }

  ngOnInit() {
    // @ts-ignore
    let request: DataTableItem[] = [];
    console.log("1")
    this.appService.getActivity("michael jackson", "2008-10-01").subscribe((obj: any) => {
      console.log(obj.activityDiary.activity)
      for (let i = 0; i < obj.activityDiary.activity.length; i++) {
        request.push(obj.activityDiary.activity[i]);
      }
    })
    this.dataSource = new DataTableDataSource(request);
    this.dataSource.data = request;
  }

  ngAfterViewInit() {
    // @ts-ignore
    this.dataSource.sort = this.sort;
    // @ts-ignore
    this.dataSource.paginator = this.paginator;
    // @ts-ignore
    this.table.dataSource = this.dataSource;
  }
}
