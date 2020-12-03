import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import {AppService} from "../app.service";
import { HttpClient} from '@angular/common/http';
import {Router} from "@angular/router";
import {NotifierService} from "../notifier.service";
import {getLocaleDateFormat} from "@angular/common";

// TODO: Replace this with your own data model type
export interface DataTableItem {
  activityName: string;
  activityType: string;
  duration: number;
  calorieBurned: number;
  timeOfDay: string;
}


// TODO: replace this with real data from your application
const EXAMPLE_DATA: DataTableItem[] = [];

/**
 * Data source for the DataTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DataTableDataSource extends DataSource<DataTableItem> {
  //TODO: add data here
  data: DataTableItem[] = EXAMPLE_DATA;
  obj: DataTableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor(obj: DataTableItem[]) {
    super();
    this.obj = obj;
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<DataTableItem[]> {
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
   * Paginate the data (client-duratione). If you're using server-duratione pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: DataTableItem[]) {
    // @ts-ignore
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    // @ts-ignore
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-duratione). If you're using server-duratione sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: DataTableItem[]) {
    // @ts-ignore
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      // @ts-ignore
      const isAsc = this.sort.direction === 'asc';
      // @ts-ignore
      switch (this.sort.active) {
        case 'activityName': return compare(a.activityName, b.activityName, isAsc);
        case 'activityType': return compare(a.activityType, b.activityType, isAsc);
        case 'calorieBurned': return compare(a.calorieBurned, b.calorieBurned, isAsc);
        case 'timeOfDay': return compare(a.timeOfDay, b.timeOfDay, isAsc);
        case 'duration': return compare(+a.duration, +b.duration, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for exampleduration/Name columns (for client-duratione sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}


