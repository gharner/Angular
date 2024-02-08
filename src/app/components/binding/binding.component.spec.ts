import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { BindingComponent } from './binding.component';
import { NGPrimeModule } from 'src/app/modules/ngprime.module';

describe('BindingComponent', () => {
	let component: BindingComponent;
	let fixture: ComponentFixture<BindingComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [NGPrimeModule],
			declarations: [BindingComponent],
			providers: [],
		}).compileComponents();

		fixture = TestBed.createComponent(BindingComponent);

		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('component properties', () => {
		it('should have property with name propertyBinding', fakeAsync(() => {
			expect(component.propertyBinding).toEqual('[value]=propertyBinding //public propertyBinding: string');
		}));

		it('should have property with name interpolationBinding', fakeAsync(() => {
			expect(component.interpolationBinding).toEqual('value={{interpolationBinding}} //public interpolationBinding: string');
		}));
	});

	describe('html template', () => {
		it('should have input element id=propertybinding', fakeAsync(() => {
			const compiled = fixture.nativeElement as HTMLElement;
			expect(compiled.querySelector('input[id="propertybinding"]')).toBeTruthy();
		}));

		it('should have input element id=interpolationbinding', fakeAsync(() => {
			const compiled = fixture.nativeElement as HTMLElement;
			expect(compiled.querySelector('input[id="interpolationbinding"]')).toBeTruthy();
		}));
	});
});
