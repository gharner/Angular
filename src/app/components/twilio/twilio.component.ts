import { Component, OnInit } from '@angular/core';
import { Email } from 'src/app/models/global.model';
import { Firebase_Functions_Service } from 'src/app/services/functions.service';

@Component({
	selector: 'app-twilio',
	templateUrl: './twilio.component.html',
	styleUrls: ['./twilio.component.css'],
})
export class TwilioComponent implements OnInit {
	constructor(private functions_Service: Firebase_Functions_Service) {}

	async ngOnInit() {}

	async sendTwilioByFunctions() {
		const payload = {
			to: '+16789033257',
			body: 'Hello from Twilio!',
		};
		//this.functions_Service.sendTwilio(payload);
	}

	async sendEmailByFunctions() {
		const message: Email = {
			sender: 'gh@yongsa.net',
			to: 'gh@yongsa.net',
			subject: 'Attendance Policy Violation',
			text: 'API Text Body',
			html: `<p>API html Body</p>`,
		};
		this.functions_Service.sendEmail(message);
	}
}
