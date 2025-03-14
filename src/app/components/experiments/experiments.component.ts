import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Firebase_Functions_Service, SandboxService } from 'src/app/services';

@Component({
  selector: 'experiments',
  templateUrl: './experiments.component.html',
  styleUrls: ['./experiments.component.css'],
})
export class Experiments implements OnInit {
  private dataSubscription!: Subscription;
  constructor(
    private firebase: Firebase_Functions_Service,
    private sandboxService: SandboxService
  ) {}

  async ngOnInit() {
    console.info('ngOnInit');
    this.refreshSchedules();
  }

  public async refreshSchedules() {
    const testData = await this.sandboxService.getMAKSchedulesClosed();
    console.log(testData);

    const dataSubscription = this.firebase.getSchedulesNotClosed();
    dataSubscription.subscribe((schedule) => console.log(schedule));

    // const account = await this.sandboxService.getActiveAccountsAsPromise();
    // console.log(account);
    // const programs = await this.sandboxService.getProgramsAsPromise();
    // console.log(programs);
  }

  ngOnDestroy() {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }
}
