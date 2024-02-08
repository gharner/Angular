import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-binding',
  templateUrl: './binding.component.html',
  styleUrls: ['./binding.component.css'],
})
export class BindingComponent implements OnInit {
  public propertyBinding: string = '[value]="propertyBinding"';
  public interpolationBinding: string = 'value="{{ interpolationBinding }}"';
  public title = 'Angular Binding';
  constructor() {}

  ngOnInit() {}

  testValue() {
    return '[value]="testValue()"';
  }
}
