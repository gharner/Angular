import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CustomFunctions } from 'src/app/models/global.model';
import { SandboxService } from 'src/app/services/sandbox.service';

@Component({
  selector: 'app-python',
  templateUrl: './python.component.html',
  styleUrls: ['./python.component.css'],
})
export class PythonComponent {
  public hasReplit: boolean = true;
  public replitUrl: string = '';
  public pretty: string = '';
  public replit: boolean = false;
  public safeUrl!: SafeResourceUrl;
  public title: string = 'Loading';
  public pythonEndPoint: string = 'http://192.168.1.75:8080/';
  constructor(
    private sandboxService: SandboxService,
    public router: Router,
    private sanitizer: DomSanitizer
  ) {}

  async ngOnInit() {
    if (window.location.hostname !== 'localhost') {
      this.pythonEndPoint = 'https://gregharner-iuyjkyshea-uc.a.run.app/';
    } else {
      this.pythonEndPoint = 'http://192.168.1.75:8080';
    }

    await this.handleRoute(this.router.url);
  }

  async handleRoute(route: string) {
    let apiUrl = '';

    if (route === '/api') {
      apiUrl = this.pythonEndPoint;
    } else {
      apiUrl = `${this.pythonEndPoint}/v1${route}`;
    }

    const result = await this.sandboxService.getExternalAPI(apiUrl);

    switch (route) {
      case '/api':
        this.hasReplit = false;
        this.pretty = CustomFunctions.stringyPretty(result);
        this.title = 'API Routes';
        break;

      case '/cities':
        this.hasReplit = false;
        this.pretty = CustomFunctions.stringyPretty(result);
        this.title = 'API Cities from Firestore NoSQL Database';
        break;

      case '/station':
        this.hasReplit = true;
        this.pretty = CustomFunctions.stringyPretty(result);
        this.title = 'API Space Station Location';
        this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          'https://replit.com/@gh50/Space-Station?embed=true'
        );
        break;

      default:
        break;
    }
  }

  handleClick() {
    this.replit = !this.replit;
  }
}
