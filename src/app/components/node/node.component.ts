import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomFunctions } from 'src/app/models/global.model';
import { SandboxService } from 'src/app/services/sandbox.service';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css'],
})
export class NodeComponent {
  public pretty: string = '';
  public title: string = 'Page Title';
  private readonly nodeEndPoint: string =
    'https://us-central1-mas-development-53ac7.cloudfunctions.net';

  constructor(private sandboxService: SandboxService, public router: Router) {}

  async ngOnInit() {
    try {
      await this.handleRoute(this.router.url);
    } catch (error) {
      console.error('Error during initialization:', error);
    }
  }

  async handleRoute(route: string) {
    try {
      const fullUrl = new URL(`sandbox${route}`, this.nodeEndPoint).toString();
      const result = await this.sandboxService.getExternalAPI(fullUrl);
      this.updateUI(route, result);
    } catch (error) {
      console.error('Error handling route:', error);
    }
  }

  private updateUI(route: string, result: any) {
    const titles: { [key: string]: string } = {
      '/sandbox': 'API Routes',
      '/v1/station': 'API Space Station Location',
    };

    this.pretty = CustomFunctions.stringyPretty(result);
    this.title = titles[route] || 'API Routes';
  }
}
