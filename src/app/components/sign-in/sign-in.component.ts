import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleIdentityService } from 'src/app/services/identity.service';
import { CustomFunctions, throwCustomError } from 'src/app/models/global.model';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  constructor(
    public identityService: GoogleIdentityService,
    public router: Router
  ) {}

  ngOnInit() {}

  async onContinueWithGoogleClick() {
    try {
      await this.identityService.signInPopup();
      this.router.navigate(['home']);
    } catch (error) {
      const arrayFromObject = CustomFunctions.extractUniqueValues(this, [
        'email',
        'projectId',
        'host',
        'href',
      ]);
      arrayFromObject.push({ function: 'accounts-forms=>submit' });
      throwCustomError(error, arrayFromObject);
    }
  }

  async onContinueWithEmailClick(user: string, password: string) {
    try {
      await this.identityService.signInWithEmail(user, password);
      this.router.navigate(['home']);
    } catch (error) {
      const arrayFromObject = CustomFunctions.extractUniqueValues(this, [
        'email',
        'projectId',
        'host',
        'href',
      ]);
      arrayFromObject.push({ function: 'accounts-forms=>submit' });
      throwCustomError(error, arrayFromObject);
    }
  }
}
