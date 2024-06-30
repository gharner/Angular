import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArraysComponent } from '../components/arrays/arrays.component';
import { BatchingComponent } from '../components/batching/batching.component';
import { BindingComponent } from '../components/binding/binding.component';
import { ContentProjectionComponent } from '../components/content/content-projection/content-projection.component';
import { CSSComponent } from '../components/css/css.component';
import { GoogleComponent } from '../components/google/google.component';
import { ParentComponent } from '../components/lifecycles/parent.component';
import { PrimeChartsComponent } from '../components/prime-charts/prime-charts.component';
import { DirectivesTableComponent } from '../components/directives/directives.component';
import { PromiseExample } from '../components/promise-example/promise-example.component';
import { ReactiveFormComponent } from '../components/reactive-form/reactive-form.component';
import { RxJsDemo } from '../components/rxjs-demo/rxjs-demo.component';
import { SignInComponent } from '../components/sign-in/sign-in.component';
import { HomeComponent } from '../components/home/home.component';
import { SyntaxComponent } from '../components/syntax/syntax.component';
import { TwilioComponent } from '../components/twilio/twilio.component';
import { AuthGuard } from '../guards/auth.guard';
import { IdentityResolverService } from '../resolvers/identity.resolver';
import { SheetsComponent } from '../components/sheets/sheets.component';
import { PythonComponent } from '../components/python/python.component';
import { ReactComponent } from '../components/react/react.component';
import { MeComponent } from '../components/me/me.component';
import { NodeComponent } from '../components/node/node.component';
import { oopComponent } from '../components/oop/oop.component';

export const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'arrays', component: ArraysComponent, canActivate: [AuthGuard] },
  { path: 'batching', component: BatchingComponent, canActivate: [AuthGuard] },
  { path: 'binding', component: BindingComponent, canActivate: [AuthGuard] },
  { path: 'charts', component: PrimeChartsComponent, canActivate: [AuthGuard] },
  {
    path: 'contentProjection',
    component: ContentProjectionComponent,
    canActivate: [AuthGuard],
  },
  { path: 'css', component: CSSComponent, canActivate: [AuthGuard] },
  {
    path: 'directives',
    component: DirectivesTableComponent,
    canActivate: [AuthGuard],
  },
  { path: 'form', component: ReactiveFormComponent, canActivate: [AuthGuard] },
  { path: 'google', component: GoogleComponent, canActivate: [AuthGuard] },
  {
    path: 'home',
    component: HomeComponent,
    resolve: { identity: IdentityResolverService },
    canActivate: [AuthGuard],
  },
  { path: 'me', component: MeComponent },
  { path: 'lifecycles', component: ParentComponent, canActivate: [AuthGuard] },
  { path: 'promiseX', component: PromiseExample, canActivate: [AuthGuard] },
  { path: 'react', component: ReactComponent, canActivate: [AuthGuard] },
  { path: 'rxjsDemo', component: RxJsDemo, canActivate: [AuthGuard] },
  { path: 'sheets', component: SheetsComponent, canActivate: [AuthGuard] },
  { path: 'oop', component: oopComponent, canActivate: [AuthGuard] },
  { path: 'sign-in', component: SignInComponent },
  { path: 'syntax', component: SyntaxComponent, canActivate: [AuthGuard] },
  { path: 'twilio', component: TwilioComponent, canActivate: [AuthGuard] },

  // Python API Routes
  //TODO: change this to use a route param
  { path: 'api', component: PythonComponent, canActivate: [AuthGuard] },
  { path: 'station', component: PythonComponent, canActivate: [AuthGuard] },
  { path: 'cities', component: PythonComponent, canActivate: [AuthGuard] },
  { path: 'users', component: PythonComponent, canActivate: [AuthGuard] },
  { path: 'products', component: PythonComponent, canActivate: [AuthGuard] },

  // Node API Routes
  //TODO: change this to use a route param
  { path: 'sandbox', component: NodeComponent, canActivate: [AuthGuard] },
  { path: 'v1/station', component: NodeComponent, canActivate: [AuthGuard] },
];
@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
