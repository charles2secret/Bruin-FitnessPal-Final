import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface DataTableFoodItem {
  foodName:string;
  calorieConsumed:number;
  timeOfDay:string;
  totalFat:number;
  totalProtein:number;
  totalCarbs:number;
  totalFiber:number;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: DataTableFoodItem[] = [{
  foodName:"temp",
  calorieConsumed: 0,
  timeOfDay:"temp",
  totalFat:0,
  totalProtein:0,
  totalCarbs:0,
  totalFiber:0
}
];

/**
 * Data source for the DataTableFood view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DataTableFoodDataSource extends DataSource<DataTableFoodItem> {
  data: DataTableFoodItem[] = EXAMPLE_DATA;
  obj: DataTableFoodItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor(obj:DataTableFoodItem[]) {
    super();
    this.obj=obj
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<DataTableFoodItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    this.data=this.obj
    const dataMutations = [
      observableOf(this.data),
      // @ts-ignore
      this.paginator.page,
      // @ts-ignore
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: DataTableFoodItem[]) {
    // @ts-ignore
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    // @ts-ignore
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: DataTableFoodItem[]) {
    // @ts-ignore
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      // @ts-ignore
      const isAsc = this.sort.direction === 'asc';
      // @ts-ignore
      switch (this.sort.active) {
        case 'foodName': return compare(a.foodName, b.foodName, isAsc);
        case 'calorieConsumed': return compare(+a.calorieConsumed, +b.calorieConsumed, isAsc);
        case 'timeOfDay': return compare(a.timeOfDay, b.timeOfDay, isAsc);
        case 'totalFat': return compare(+a.totalFat, +b.totalFat, isAsc);
        case 'totalProtein': return compare(a.totalProtein, b.totalProtein, isAsc);
        case 'totalCarbs': return compare(+a.totalCarbs, +b.totalCarbs, isAsc);
        case 'totalFiber': return compare(a.totalFiber, b.totalFiber, isAsc);
        
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
