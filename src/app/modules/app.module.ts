import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { connectAuthEmulator, getAuth, provideAuth } from '@angular/fire/auth';
import {
  Firestore,
  connectFirestoreEmulator,
  getFirestore,
  initializeFirestore,
  provideFirestore,
} from '@angular/fire/firestore';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { API_KEY, GoogleSheetsDbService } from 'ng-google-sheets-db';
import { sandboxFirebase } from 'src/environments/environment.sandbox';
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
import { PrimeChartsComponent } from '../components/prime-charts/prime-charts.component';
import { PromiseExample } from '../components/promise-example/promise-example.component';
import { ReactiveFormComponent } from '../components/reactive-form/reactive-form.component';
import { RxJsDemo } from '../components/rxjs-demo/rxjs-demo.component';
import { SignInComponent } from '../components/sign-in/sign-in.component';
import { SyntaxComponent } from '../components/syntax/syntax.component';
import { TwilioComponent } from '../components/twilio/twilio.component';
import { AttributeDirective } from '../directives/attribute.directive';
import { StructuralDirective } from '../directives/structural.directive';
import { AuthGuard } from '../guards/auth.guard';
import { ShortenPipe } from '../pipes/shorten.pipe';
import { IdentityResolverService } from '../resolvers/identity.resolver';
import { AppRoutingModule } from '../routings/app.routing';
import { GoogleIdentityService } from '../services/identity.service';
import { NGPrimeModule } from './ngprime.module';
import { PythonComponent } from '../components/python/python.component';
import { ReactComponent } from '../components/react/react.component';
import { MeComponent } from '../components/me/me.component';
import { NodeComponent } from '../components/node/node.component';

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
    provideAuth(() => {
      const auth = getAuth();
      if (isLocalhost) {
        connectAuthEmulator(auth, 'http://localhost:9099', {
          disableWarnings: true,
        });
      }
      return auth;
    }),
    provideFirebaseApp(() => {
      if (isLocalhost) {
        return initializeApp(sandboxFirebase.emulatorCfg);
      } else {
        return initializeApp(sandboxFirebase.gregharner);
      }
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
    provideMessaging(() => getMessaging()),
    provideStorage(() => getStorage()),
  ],
  declarations: [
    AppComponent,
    ArraysComponent,
    AttributeDirective,
    BatchingComponent,
    BindingComponent,
    CSSComponent,
    ChildComponent,
    ContentComponent,
    ContentProjectionComponent,
    DirectivesTableComponent,
    GoogleComponent,
    HomeComponent,
    LayoutComponent,
    MeComponent,
    NodeComponent,
    ParentComponent,
    PrimeChartsComponent,
    PromiseExample,
    PythonComponent,
    ReactiveFormComponent,
    ReactComponent,
    RxJsDemo,
    ShortenPipe,
    SignInComponent,
    StructuralDirective,
    SyntaxComponent,
    TwilioComponent,
    ViewchildExample,
  ],
  providers: [
    GoogleIdentityService,
    AuthGuard,
    IdentityResolverService,
    {
      provide: API_KEY,
      useValue: 'AIzaSyCntgp0ELEZ8Uca1ypqpopo6yNRF9tQg20',
    },
    GoogleSheetsDbService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
