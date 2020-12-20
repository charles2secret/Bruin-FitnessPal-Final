import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DataTableHDataSource, DataTableHItem } from './data-table-h-datasource';

@Component({
  selector: 'app-data-table-h',
  templateUrl: './data-table-h.component.html',
  styleUrls: ['./data-table-h.component.css']
})
export class DataTableHComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild(MatTable) table: MatTable<DataTableHItem> | undefined;
  dataSource: DataTableHDataSource | undefined;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngOnInit() {
    this.dataSource = new DataTableHDataSource();
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
