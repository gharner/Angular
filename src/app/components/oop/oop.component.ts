import { Component } from '@angular/core';
import { Person } from '../../classes/person.class';

@Component({
  selector: 'app-oop',
  templateUrl: './oop.component.html',
  styleUrls: ['./oop.component.css'],
})
export class oopComponent {
  joe: Person = new Person('Joe', 'Smith', 25, 'Fighter', 100);
  jane: Person = new Person('Jane', 'Doe', 28, 'Doctor', 80);

  constructor() {}

  async ngOnInit() {}

  attack() {
    this.joe.reduceHitPoints(this.jane, 20);
  }
}
