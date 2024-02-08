import { Component, OnInit } from '@angular/core';
import { Firebase_Functions_Service } from 'src/app/services/functions.service';
import { GoogleIdentityService } from 'src/app/services/identity.service';

@Component({
	selector: 'app-google',
	templateUrl: './google.component.html',
	styleUrls: ['./google.component.css'],
})
export class GoogleComponent implements OnInit {
	public token: string | { status: number } = { status: 102 };
	constructor(private firebaseFunctions: Firebase_Functions_Service, private identityService: GoogleIdentityService) {}
	async ngOnInit() {
		this.identityService.token$.subscribe(async value => {
			if (!value?.token.refresh_token) {
				await this.handleGoogleSignIn();
				return;
			}

			try {
				const token = await this.firebaseFunctions.getAccessToken(value.token.refresh_token);
				if (token?.status === 400) {
					await this.handleGoogleSignIn();
				} else {
					this.token = token;
				}
			} catch (error) {
				console.error('Error fetching access token:', error);
				await this.handleGoogleSignIn();
			}
		});
	}

	async handleGoogleSignIn() {
		await this.firebaseFunctions.googleSignIn();
	}
}
