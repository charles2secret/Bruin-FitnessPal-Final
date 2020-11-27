import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Daily Workout', cols: 2, rows: 1 },
          { title: 'Calories', cols: 2, rows: 1 },
          { title: 'Diet', cols: 2, rows: 1 },
          { title: 'Health', cols: 2, rows: 1 }
        ];
      }

      return [
        { title: 'Daily Workout', cols: 2, rows: 1 },
        { title: 'Calories', cols: 1, rows: 1 },
        { title: 'Diet', cols: 1, rows: 2 },
        { title: 'Health', cols: 1, rows: 1 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
