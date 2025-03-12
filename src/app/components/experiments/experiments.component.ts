import { Component, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { SandboxService } from 'src/app/services/sandbox.service';
import { DateTimeUtils } from 'src/app/utilites';

@Component({
  selector: 'experiments',
  templateUrl: './experiments.component.html',
  styleUrls: ['./experiments.component.css'],
})
export class Experiments implements OnInit {
  private scheduleRefreshInProgress = false;
  count = 0; // Counter for observable updates
  private scheduleRefreshSubscription: Subscription | null = null; // Holds the scheduled refresh subscription

  constructor(private sandboxService: SandboxService) {}

  async ngOnInit() {
    // const account = await this.sandboxService.getActiveAccountsAsPromise();
    // console.log(account);

    // const programs = await this.sandboxService.getProgramsAsPromise();
    // console.log(programs);

    this.refreshSchedule(Date.now() + 10000); // Schedule the first refresh in 10 seconds
  }

  private createAndUpdateObs() {
    this.count++; // Increment count
    this.scheduleRefreshInProgress = false; // Allow further scheduling

    if (window.location.hostname === 'localhost') {
      console.log('createAndUpdateObs=>count', this.count);
    }

    // Recursively schedule the next refresh in 10 seconds
    this.refreshSchedule(Date.now() + 10000);
  }

  private refreshSchedule(time: string | number | Date): void {
    if (this.scheduleRefreshInProgress) {
      console.warn('refreshSchedule skipped: already in progress.');
      return;
    }

    this.scheduleRefreshInProgress = true; // Set in-progress flag

    const futureTime = new Date(time).getTime();
    const formattedFutureTime = DateTimeUtils.formatDate(
      new Date(futureTime),
      'friendly'
    );

    if (window.location.hostname === 'localhost') {
      console.log('refreshSchedule=>formattedFutureTime', formattedFutureTime);
    }

    const currentTime = Date.now();
    const formattedCurrentTime = DateTimeUtils.formatDate(
      new Date(currentTime),
      'friendly'
    );

    if (window.location.hostname === 'localhost') {
      console.log(
        'refreshSchedule=>formattedCurrentTime',
        formattedCurrentTime
      );
    }

    const delay = Math.max(futureTime - currentTime, 0);
    const refreshTime = DateTimeUtils.formatDate(
      new Date(currentTime + delay),
      'friendly'
    );

    if (window.location.hostname === 'localhost') {
      console.log('refreshSchedule=>refreshTime', refreshTime);
    }

    // Cancel any existing scheduled refresh before creating a new one
    if (this.scheduleRefreshSubscription) {
      this.scheduleRefreshSubscription.unsubscribe();
    }

    // Schedule the refresh using RxJS `timer`
    this.scheduleRefreshSubscription = timer(delay).subscribe(() => {
      try {
        this.createAndUpdateObs(); // Call the function that increases count
      } catch (error) {
        console.error('Error in timer:', error);
      }
    });
  }
}
