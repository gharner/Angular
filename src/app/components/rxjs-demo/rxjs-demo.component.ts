import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  Observable,
  ReplaySubject,
  Subscription,
  interval,
  of,
  range,
  zip,
} from 'rxjs';
import { first, map, take } from 'rxjs/operators';
import { MAS_Schedules_Service } from 'src/app/services/mas-schedules.service';

@Component({
  selector: 'rxjs-demo',
  templateUrl: './rxjs-demo.component.html',
  styleUrls: ['./rxjs-demo.component.css'],
})
export class RxJsDemo implements OnInit, OnDestroy {
  private subscriptionIntervalExample!: Subscription;
  public intervalExample = new Observable();
  public docs: any;
  public logMessages: string[] = [];

  rangeObservable = new Observable();
  replayRange = new ReplaySubject<any>(1);
  of_example = new Observable();

  /*
		from_example = new Observable();
		timer_example = new Observable();
		empty_example = new Observable();
		mapI_example = new Observable();
		mapII_example = new Observable();
		mapTo_example = new Observable();
		filter_example = new Observable();
		pluck_example = new Observable();
	*/

  constructor(private schedules_Service: MAS_Schedules_Service) {
    //interval
    this.intervalExample = interval(1000);

    // blocked for collapsing
    {
      //range
      this.rangeObservable = range(1, 10);

      //of
      this.of_example = of(1, 2, 3, 'four', 5);

      //from
      /*
			this.from_example = from([1, 2, 3, 'four', 5]);			
			//timer
			this.timer_example = timer(5000);
			//empty
			this.empty_example = empty();
			//map
			this.mapI_example = interval(1000);
			//mapReply
			this.mapII_example = interval(1000);
			//mapTo
			this.mapTo_example = interval(1000);
			//filter
			this.filter_example = range(1, 10);
			//pluck
			this.pluck_example = from([
				{ name: 'Joe', age: 30 },
				{ name: 'Sarah', age: 35 },
			]);
			*/
    }
  }

  ngOnInit() {
    //interval
    this.subscriptionIntervalExample = this.intervalExample
      .pipe(take(8))
      .subscribe({
        next: (val) => {
          this.log('intervalExample = interval(1000) => take(8)', val);
        },
        error: (error) => console.error(error),
      });

    this.intervalExample.pipe(first()).subscribe({
      next: (val) => {
        this.log('intervalExample.pipe(first())', val);
      },
      error: (error) => console.error(error),
    });

    // blocked for colapsing
    {
      //range
      this.rangeObservable.subscribe({
        next: (val) => {
          this.log('range(1, 10)', val);
          this.replayRange.next(val);
        },
        error: (error) => console.error(error),
      });

      //of
      this.of_example.subscribe({
        next: (val) => {
          this.log('of(1, 2, 3, "four", 5)', val);
        },
        error: (error) => console.error(error),
      });

      /*
			//from
			this.from_example.subscribe(val => {
				this.log('from: ' + val);
			});

			//timer
			this.timer_example.subscribe(val => {
				this.log('timer: ' + val);
			});

			//empty
			this.empty_example.subscribe(
				val => {
					this.log('empty: ' + val);
				},
				error => {
					this.log('error', error);
				},
				() => {
					this.log('complete');
				}
			);

			//map I
			this.mapI_example.pipe(map((a: number) => a * 2)).subscribe(val => {
				this.log('map I: ' + val);
			});

			//map II
			this.mapII_example.pipe(map((a: number) => a * 2)).subscribe(val => {
				this.log('map II: ' + val);
			});

			//tap
			this.mapII_example
				.pipe(
					map((a: number) => a * 2),
					tap(a => this.log('tap: ' + a)),
					map((a: number) => a + 2)
				)
				.subscribe(val => {
					this.log('map,do,map: ' + val);
				});

			//interesting that this works in the console but not in the view
			this.mapTo_example.pipe(mapTo('MapTo Message')).subscribe(val => {
				this.log('mapTo: ' + val);
			});

			//filter
			this.filter_example.pipe(filter((val: any) => val % 2 === 0)).subscribe(val => {
				this.log('filter: ' + val);
			});

			//pluck
			this.pluck_example.pipe(pluck('name')).subscribe(val => {
				this.log('pluck: ' + val);
			});
			*/
    }
    //this.rxjsZipExample();
  }

  ngOnDestroy(): void {
    this.subscriptionIntervalExample.unsubscribe();
  }
  /*   rxjsZipExample() {
    // Fetch schedules based on the first set of criteria
    const scheduleById = this.schedules_Service.getSchedulesByReference(
      'id',
      '==',
      '00c10t8qc47q7oudk4cimug81c_20210515T163000Z'
    );

    scheduleById.subscribe((data) => {
      this.log('data', data);
    });

    // Fetch schedules based on the second set of criteria
    const scheduleByArray = this.schedules_Service.getSchedulesByReference(
      'id',
      'in',
      ['032tffft8fea6tag7sj9qol406_20201015T213000Z']
    );

    // Use zip to combine the observables
    zip(scheduleById, scheduleByArray)
      .pipe(
        // Concatenate the results from both observables
        map(([firstSchedule, secondSchedule]) =>
          firstSchedule.concat(secondSchedule)
        )
      )
      .subscribe({
        next: (combinedSchedules) => {
          this.docs = combinedSchedules;
        },
        error: (err) => {
          // Proper error handling
          console.error('Error fetching schedules:', err);
        },
      });
  } */

  log(description: string, message: any) {
    if (typeof message === 'object') message = JSON.stringify(message);
    console.log(`*****${description}*****`);
    this.logMessages.push(`*****${description}*****`);
    console.log(message);
    this.logMessages.push(message);
    this.logMessages.push('');
  }
}
