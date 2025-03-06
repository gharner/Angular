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
import { SandboxService } from 'src/app/services/sandbox.service';

@Component({
  selector: 'rxjs-demo',
  templateUrl: './rxjs-demo.component.html',
  styleUrls: ['./rxjs-demo.component.css'],
})
export class RxJsDemo implements OnInit {
  constructor(private sandboxService: SandboxService) {}

  async ngOnInit() {
    const account = await this.sandboxService.getActiveAccountsAsPromise();
    console.log(account);

    const programs = await this.sandboxService.getProgramsAsPromise();
    console.log(programs);
  }
}
