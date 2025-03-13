import { Component, OnInit } from '@angular/core';
import { Firebase_Functions_Service } from 'src/app/services';

@Component({
  selector: 'experiments',
  templateUrl: './experiments.component.html',
  styleUrls: ['./experiments.component.css'],
})
export class Experiments implements OnInit {
  constructor(private firebase: Firebase_Functions_Service) {}

  async ngOnInit() {
    const schedules = this.firebase.getScheduelsNotClosed();
    schedules.subscribe((schedule) => console.log(schedule));

    // const account = await this.sandboxService.getActiveAccountsAsPromise();
    // console.log(account);
    // const programs = await this.sandboxService.getProgramsAsPromise();
    // console.log(programs);
  }
}
