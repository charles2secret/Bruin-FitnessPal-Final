import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { AppService } from '../app.service';
import { DataTableFoodDataSource, DataTableFoodItem } from './data-table-food-datasource';

@Component({
  selector: 'app-data-table-food',
  templateUrl: './data-table-food.component.html',
  styleUrls: ['./data-table-food.component.css']
})
export class DataTableFoodComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild(MatTable) table: MatTable<DataTableFoodItem> | undefined;
  dataSource: DataTableFoodDataSource | undefined;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['foodName','timeOfDay','totalFat','totalProtein','totalCarbs','totalFiber','calorieConsumed'];
  constructor(private appService:AppService){}
  ngOnInit() {
    let request: DataTableFoodItem[] = [];
    this.appService.getFood(this.appService.getAccountId(), this.appService.getActivityDate()).subscribe((obj: any) => {
      console.log(obj.foodDiary.food)
      for (let i = 0; i < obj.foodDiary.food.length; i++) {
        request.push(obj.foodDiary.food[i]);
      }
    })
    this.dataSource = new DataTableFoodDataSource(request);
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
