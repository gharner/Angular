import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { connectAuthEmulator, getAuth, provideAuth } from '@angular/fire/auth';
import {
  Firestore,
  connectFirestoreEmulator,
  getFirestore,
  initializeFirestore,
  provideFirestore,
} from '@angular/fire/firestore';
import {
  Functions,
  connectFunctionsEmulator,
  getFunctions,
  provideFunctions,
} from '@angular/fire/functions';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { API_KEY, GoogleSheetsDbService } from 'ng-google-sheets-db';
import { MessageService } from 'primeng/api';
import { sandboxFirebase } from 'src/environments/environment.sandbox';
import { gapiSettings } from '../../environments/gapisettings';
import { AppComponent } from '../app.component';
import { ArraysComponent } from '../components/arrays/arrays.component';
import { BatchingComponent } from '../components/batching/batching.component';
import { BindingComponent } from '../components/binding/binding.component';
import { ContentProjectionComponent } from '../components/content/content-projection/content-projection.component';
import { ContentComponent } from '../components/content/content.component';
import { ViewchildExample } from '../components/content/viewchild-example/viewchild-example.component';
import { CSSComponent } from '../components/css/css.component';
import { DirectivesTableComponent } from '../components/directives/directives.component';
import { GoogleComponent } from '../components/google/google.component';
import { HomeComponent } from '../components/home/home.component';
import { LayoutComponent } from '../components/layout/layout.component';
import { ChildComponent } from '../components/lifecycles/child/child.component';
import { ParentComponent } from '../components/lifecycles/parent.component';
import { MeComponent } from '../components/me/me.component';
import { NodeComponent } from '../components/node/node.component';
import { PrimeChartsComponent } from '../components/prime-charts/prime-charts.component';
import { PromiseExample } from '../components/promise-example/promise-example.component';
import { PythonComponent } from '../components/python/python.component';
import { ReactComponent } from '../components/react/react.component';
import { ReactiveFormComponent } from '../components/reactive-form/reactive-form.component';
import { Experiments } from '../components/experiments/experiments.component';
import { SignInComponent } from '../components/sign-in/sign-in.component';
import { SyntaxComponent } from '../components/syntax/syntax.component';
import { TwilioComponent } from '../components/twilio/twilio.component';
import { AttributeDirective } from '../directives/attribute.directive';
import { StructuralDirective } from '../directives/structural.directive';
import { AuthGuard } from '../guards/auth.guard';
import { ShortenPipe } from '../pipes/shorten.pipe';
import { IdentityResolverService } from '../resolvers/identity.resolver';
import { AppRoutingModule } from '../routings/app.routing';
import { GlobalErrorHandler } from '../services/error-handler.service';
import { ErrorInterceptor } from '../services/http-interceptor.service';
import { GoogleIdentityService } from '../services/identity.service';
import { NGPrimeModule } from './ngprime.module';
import { oopComponent } from '../components/oop/oop.component';

const isLocalhost = window.location.hostname === 'localhost';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NGPrimeModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(sandboxFirebase.gregharner)),
    provideAuth(() => {
      const auth = getAuth();
      if (isLocalhost) {
        connectAuthEmulator(auth, 'http://localhost:9099', {
          disableWarnings: true,
        });
      }
      return auth;
    }),
    provideFirestore(() => {
      let firestore: Firestore;
      if (isLocalhost) {
        firestore = initializeFirestore(getApp(), {
          experimentalForceLongPolling: true,
        });
        connectFirestoreEmulator(firestore, 'localhost', 8080);
      } else {
        firestore = getFirestore();
      }
      return firestore;
    }),
    provideFunctions(() => {
      let functions: Functions;
      if (isLocalhost) {
        functions = getFunctions();
        connectFunctionsEmulator(functions, 'localhost', 5001);
      } else {
        functions = getFunctions();
      }
      return functions;
    }),
    provideMessaging(() => getMessaging()),
    provideStorage(() => getStorage()),
  ],
  declarations: [
    AppComponent,
    ArraysComponent,
    AttributeDirective,
    BatchingComponent,
    BindingComponent,
    ChildComponent,
    ContentComponent,
    ContentProjectionComponent,
    CSSComponent,
    DirectivesTableComponent,
    GoogleComponent,
    HomeComponent,
    LayoutComponent,
    MeComponent,
    NodeComponent,
    oopComponent,
    ParentComponent,
    PrimeChartsComponent,
    PromiseExample,
    PythonComponent,
    ReactComponent,
    ReactiveFormComponent,
    Experiments,
    ShortenPipe,
    SignInComponent,
    StructuralDirective,
    SyntaxComponent,
    TwilioComponent,
    ViewchildExample,
  ],
  providers: [
    { provide: API_KEY, useValue: gapiSettings.Sheets },
    AuthGuard,
    GoogleIdentityService,
    GoogleSheetsDbService,
    IdentityResolverService,
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    MessageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
