import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  flush,
  tick,
} from '@angular/core/testing';
import { provideFirebaseApp } from '@angular/fire/app';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { initializeApp } from 'firebase/app';
import { sandboxFirebase } from 'src/environments/enviroment.sandbox';
import { AppComponent } from './app.component';
import { ArraysComponent } from './components/arrays/arrays.component';
import { BatchingComponent } from './components/batching/batching.component';
import { BindingComponent } from './components/binding/binding.component';
import { ContentProjectionComponent } from './components/content/content-projection/content-projection.component';
import { ContentComponent } from './components/content/content.component';
import { ViewchildExample } from './components/content/viewchild-example/viewchild-example.component';
import { CSSComponent } from './components/css/css.component';
import { DirectivesTableComponent } from './components/directives/directives.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ChildComponent } from './components/lifecycles/child/child.component';
import { ParentComponent } from './components/lifecycles/parent.component';
import { PrimeChartsComponent } from './components/prime-charts/prime-charts.component';
import { PromiseExample } from './components/promise-example/promise-example.component';
import { ReactiveFormComponent } from './components/reactive-form/reactive-form.component';
import { RxJsDemo } from './components/experiments/experiments.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { HomeComponent } from './components/home/home.component';
import { SyntaxComponent } from './components/syntax/syntax.component';
import { TwilioComponent } from './components/twilio/twilio.component';
import { AuthGuard } from './guards/auth.guard';
import { MockAuthService } from './models/karma.mock.model';
import { NGPrimeModule } from './modules/ngprime.module';
import { routes } from './routings/app.routing';
import { GoogleIdentityService } from './services/identity.service';

describe('AppComponent and LayoutComponent Tests', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let httpTestingController: HttpTestingController;
  let router: Router;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule,
        NGPrimeModule,
        ReactiveFormsModule,
        RouterTestingModule,
        RouterTestingModule.withRoutes(routes),
        provideFirebaseApp(() => initializeApp(sandboxFirebase.gregharner)),
      ],
      declarations: [
        AppComponent,
        ArraysComponent,
        BatchingComponent,
        BindingComponent,
        CSSComponent,
        ChildComponent,
        ContentComponent,
        ContentProjectionComponent,
        DirectivesTableComponent,
        LayoutComponent,
        ParentComponent,
        PrimeChartsComponent,
        PromiseExample,
        ReactiveFormComponent,
        RxJsDemo,
        SignInComponent,
        HomeComponent,
        SyntaxComponent,
        TwilioComponent,
        ViewchildExample,
      ],
      providers: [
        { provide: Auth, useClass: MockAuthService },
        { provide: GoogleIdentityService, useClass: MockAuthService },
        { provide: AuthGuard, useClass: AuthGuard },
        { provide: Firestore, useValue: MockAuthService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    fixture.detectChanges();
    tick(); // Simulate the passage of time until all pending asynchronous activities finish
  }));

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    //httpTestingController.verify();
  });

  it('should inject and initialize Auth service', () => {
    const authService: Auth = TestBed.inject(Auth);
    expect(authService).toBeTruthy();
  });

  it('should create the AppComponent instance', () => {
    expect(app).toBeTruthy();
  });

  describe('Layout Component Tests', () => {
    it('should have a menu', fakeAsync(() => {
      expect(app.showPrivateMenu).toEqual(true);
    }));

    it('should correctly render layout elements', fakeAsync(() => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('app-layout')?.textContent).toBeTruthy();
      expect(
        compiled.querySelector(
          'input[placeholder="Enter text to enable button"]'
        )
      ).toBeTruthy();
    }));

    it('should initialize test button as disabled', fakeAsync(() => {
      const button = fixture.nativeElement.querySelector(
        'button[name="KarmaTestButton"]'
      ) as HTMLButtonElement;
      expect(button.disabled).toBeTrue();
    }));

    describe('Button Interaction Tests', () => {
      it('should enable button when input has text', fakeAsync(() => {
        setInputValueAndDispatchEvent('Karma sample text');
        const button = getButtonElement();
        expect(button.disabled).toBeFalsy();
      }));

      it('should make an API call when button is clicked', fakeAsync(() => {
        setInputValueAndDispatchEvent('Karma sample text');
        const button = getButtonElement();
        button.click();

        const req = httpTestingController.expectOne(
          'https://api.chucknorris.io/jokes/random'
        );
        expect(req.request.method).toEqual('GET');
      }));
    });

    describe('Input Validation Tests', () => {
      it('should retain input value after focus and blur events', fakeAsync(() => {
        setInputValueAndDispatchEvent('Karma sample text', 'blur');
        const input = getElement();
        expect(input.value).toBe('Karma sample text');
      }));
    });

    const routePaths: { path: string }[] = [
      { path: 'arrays' },
      { path: 'batching' },
      { path: 'binding' },
      { path: 'charts' },
      { path: 'contentProjection' },
      { path: 'css' },
      { path: 'directives' },
      { path: 'form' },
      { path: 'lifecycles' },
      { path: 'promiseX' },
      //{ path: 'rxjsDemo' },
      //{ path: 'sheets' },
      { path: 'start' },
      { path: 'syntax' },
      { path: 'twilio' },
    ];

    describe('menu', () => {
      routePaths.forEach((each) => {
        it(`menu should be ${each.path}`, fakeAsync(() => {
          const compiled = fixture.nativeElement as HTMLElement;
          expect(compiled.querySelector(`li[id="${each.path}"`)).toBeTruthy();
        }));
      });
    });

    describe('routing', () => {
      describe('navigate to a page', () => {
        routePaths.forEach((each) => {
          it(`page should be ${each.path}`, fakeAsync(() => {
            router.navigate([`/${each.path}`]);
            tick();
            fixture.detectChanges();
            expect(router.url).toBe(`/${each.path}`);
            flush();
          }));
        });
      });
    });
  });

  // Helper functions for the tests
  function setInputValueAndDispatchEvent(
    value: string,
    eventType: string = 'input'
  ) {
    const input = getElement();
    input.value = value;
    input.dispatchEvent(new Event(eventType));
    fixture.detectChanges();
    tick();
  }

  function getElement(): HTMLInputElement {
    return fixture.nativeElement.querySelector(
      'input[placeholder="Enter text to enable button"]'
    ) as HTMLInputElement;
  }

  function getButtonElement(): HTMLButtonElement {
    return fixture.nativeElement.querySelector(
      'button[name="KarmaTestButton"]'
    ) as HTMLButtonElement;
  }
});
