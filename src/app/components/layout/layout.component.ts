import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleIdentityService } from 'src/app/services/identity.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit, OnChanges {
  public items: MenuItem[] = [];
  @Input() showPrivateMenu: boolean = false;
  constructor(
    public identityService: GoogleIdentityService,
    public router: Router
  ) {}
  ngOnChanges(): void {
    this.items = [
      {
        label: 'Projects',
        id: 'projects',
        command: () => {
          this.onMenuClick('/home');
        },
      },
      {
        label: 'Me',
        id: 'me',
        command: () => {
          this.onMenuClick('/me');
        },
      },
      {
        label: 'Sandboxes',
        items: [
          {
            label: 'Angular',
            items: [
              {
                label: 'Batching',
                id: 'batching',
                command: () => {
                  this.onMenuClick('/batching');
                },
              },
              {
                label: 'Binding',
                id: 'binding',
                command: () => {
                  this.onMenuClick('/binding');
                },
              },
              {
                label: 'Charts',
                id: 'charts',
                command: () => {
                  this.onMenuClick('/charts');
                },
              },
              {
                label: 'Content Projection',
                id: 'contentProjection',
                command: () => {
                  this.onMenuClick('/contentProjection');
                },
              },
              {
                label: 'Directives',
                id: 'directives',
                command: () => {
                  this.onMenuClick('/directives');
                },
              },
              {
                label: 'jsPDF',
                command: () => {
                  this.onMenuClick('/batching');
                },
              },
              {
                label: 'Reactive Forms',
                id: 'form',
                command: () => {
                  this.onMenuClick('/form');
                },
              },
              {
                label: 'Life Cycles',
                id: 'lifecycles',
                command: () => {
                  this.onMenuClick('/lifecycles');
                },
              },
              {
                label: 'Promise',
                id: 'promiseX',
                command: () => {
                  this.onMenuClick('/promiseX');
                },
              },
              {
                label: 'RXJS',
                id: 'rxjsDemo',
                command: () => {
                  this.onMenuClick('/rxjsDemo');
                },
              },
            ],
          },
          {
            label: 'React',
            id: 'react',
            command: () => this.openUrl(),
          },
          {
            label: 'Node.js',
            items: [
              {
                label: 'api',
                id: 'api',
                command: () => {
                  this.onMenuClick('/sandbox');
                },
              },
              {
                label: 'station',
                id: 'station',
                command: () => {
                  this.onMenuClick('/v1/station');
                },
              },
            ],
          },
          {
            label: 'Python',
            items: [
              {
                label: 'api',
                id: 'api',
                command: () => {
                  this.onMenuClick('/api');
                },
              },
              {
                label: 'station',
                id: 'station',
                command: () => {
                  this.onMenuClick('/station');
                },
              },
              {
                label: 'cities',
                id: 'cities',
                command: () => {
                  this.onMenuClick('/cities');
                },
              },
            ],
          },
        ],
      },
      {
        label: 'Syntax',
        items: [
          {
            label: 'Typescript',
            items: [
              {
                label: 'Arrays',
                id: 'arrays',
                command: () => {
                  this.onMenuClick('/arrays');
                },
              },
              {
                label: 'Misc.',
                id: 'syntax',
                command: () => {
                  this.onMenuClick('/syntax');
                },
              },
            ],
          },
          {
            label: 'CSS',
            id: 'css',
            command: () => {
              this.onMenuClick('/css');
            },
          },
        ],
      },
      {
        label: 'Private',
        visible: this.showPrivateMenu,
        items: [
          {
            label: 'Sheets',
            id: 'sheets',
            command: () => {
              this.onMenuClick('/sheets');
            },
          },
          {
            label: 'Twilio',
            id: 'twilio',
            command: () => {
              this.onMenuClick('/twilio');
            },
          },
        ],
      },
    ];
  }
  ngOnInit(): void {}

  public onMenuClick(route: string): void {
    this.router.navigate([route]);
  }

  public async onSignOutClick(): Promise<void> {
    await this.identityService.signOut();
    this.router.navigate(['sign-in']);
  }

  public async onSignInClick(): Promise<void> {
    await this.router.navigate(['sign-in']);
  }

  openUrl() {
    window.open('https://react.gregharner.com', '_blank');
  }
}
