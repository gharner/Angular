import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleIdentityService } from './services/identity.service';
import { SandboxService } from './services/sandbox.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public showPrivateMenu: boolean = true;
  public disabled: boolean = true;
  public joke: string = '';
  public binding: string = '';

  constructor(
    public router: Router,
    public identityService: GoogleIdentityService,
    private sandboxService: SandboxService
  ) {}

  ngOnInit() {
    this.identityService?.getUser?.subscribe((user) => {
      if (user?.email) {
        this.showPrivateMenu = true;
        this.identityService.initToken(user.email);
      } else {
        this.showPrivateMenu = false;
      }
    });
    this.router.navigate(['home']);
  }
  onKarmaButtonClick() {
    console.log('Button Clicked');
    this.getJokes();
  }

  onInput(event: Event) {
    console.log((event.target as HTMLInputElement).value);
    if ((event.target as HTMLInputElement).value) {
      this.disabled = false;
    } else if (!(event.target as HTMLInputElement).value) {
      this.disabled = true;
    }
  }

  getJokes() {
    const chuckNorrisJoke = this.sandboxService.chuckNorrisJokes();
    chuckNorrisJoke.subscribe({
      next: (joke: any) => {
        this.joke = joke.value;
      },
    });
  }
}
