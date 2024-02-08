import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleIdentityService } from 'src/app/services/identity.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  constructor(
    public identityService: GoogleIdentityService,
    public router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {}

  async onContinueWithGoogleClick() {
    try {
      await this.identityService.signInPopup();
      this.router.navigate(['home']);
    } catch (error) {
      this.handleError(error, 'onContinueWithGoogleClick');
    }
  }

  async onContinueWithEmailClick(user: string, password: string) {
    try {
      await this.identityService.signInWithEmail(user, password);
      this.router.navigate(['home']);
    } catch (error) {
      this.handleError(error, 'onContinueWithEmailClick');
    }
  }

  private handleError(error: any, context: string) {
    console.error(error);
    this.messageService.add({
      severity: 'error',
      summary: `Something went wrong in ${context}!`,
      detail: error,
      sticky: true,
    });
  }
}
