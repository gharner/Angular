import { Component, OnInit } from '@angular/core';
import { SandboxService } from 'src/app/services/sandbox.service';

@Component({
  selector: 'experiments',
  templateUrl: './experiments.component.html',
  styleUrls: ['./experiments.component.css'],
})
export class Experiments implements OnInit {
  constructor(private sandboxService: SandboxService) {}

  async ngOnInit() {
    const account = await this.sandboxService.getActiveAccountsAsPromise();
    console.log(account);

    const programs = await this.sandboxService.getProgramsAsPromise();
    console.log(programs);
  }
}
