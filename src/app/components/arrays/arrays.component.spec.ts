import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArraysComponent } from './arrays.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SandboxService } from 'src/app/services/sandbox.service';
import { NGPrimeModule } from 'src/app/modules/ngprime.module';

describe('ArraysComponent', () => {
	let component: ArraysComponent;
	let fixture: ComponentFixture<ArraysComponent>;
	let httpTestingController: HttpTestingController;

	beforeEach(async () => {
		let service: SandboxService;

		await TestBed.configureTestingModule({
			imports: [HttpClientTestingModule, NGPrimeModule],
			declarations: [ArraysComponent],
			providers: [],
		}).compileComponents();

		fixture = TestBed.createComponent(ArraysComponent);
		service = TestBed.inject(SandboxService);
		httpTestingController = TestBed.inject(HttpTestingController);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
