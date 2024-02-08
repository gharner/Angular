import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UIChart } from 'primeng/chart';

@Component({
	selector: 'app-prime-charts',
	templateUrl: './prime-charts.component.html',
	styleUrls: ['./prime-charts.component.css'],
})
export class PrimeChartsComponent implements OnInit, AfterViewInit {
	@ViewChild('myChart') aChart!: UIChart;

	data: any;

	constructor() {}
	ngAfterViewInit(): void {
		console.log(this.aChart);
	}

	ngOnInit() {
		this.data = {
			labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
			datasets: [
				{
					label: 'First Dataset',
					data: [65, 59, 80, 81, 56, 55, 40],
				},
				{
					label: 'Second Dataset',
					data: [28, 48, 40, 19, 86, 27, 90],
				},
			],
		};
	}

	update(event: Event) {}
}
