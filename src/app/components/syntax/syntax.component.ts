import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { GregHarner } from 'gregharner';

@Component({
  selector: 'app-syntax',
  templateUrl: './syntax.component.html',
  styleUrls: ['./syntax.component.css'],
})
export class SyntaxComponent {
  public path: string = '';
  public safeUrl!: SafeResourceUrl;
  public value: any;
  functionString!: string;

  constructor(private sanitizer: DomSanitizer) {
    this.functionString = this.breakAndContinue.toString();
  }

  breakAndContinue() {
    let breakAndContinue: { break: number[]; continue: number[] } = {
      break: [],
      continue: [],
    };
    for (let i = 0; i < 10; i++) {
      if (i === 3) {
        break;
      }
      breakAndContinue.break.push(i);
    }

    for (let i = 0; i < 10; i++) {
      if (i === 3) {
        continue;
      }
      breakAndContinue.continue.push(i);
    }

    return breakAndContinue;
  }

  curryAddClassic() {
    function add(x: number) {
      return function (y: number) {
        return x + y;
      };
    }

    console.log(add(2)(4));
    const partial = add(2);
    const complete = partial(4);
    return complete;
  }

  curryAddArrow() {
    const add = (x: number) => (y: number) => {
      return x + y;
    };

    console.log(add(2)(4));
    const partial = add(2);
    const complete = partial(4);
    return complete;
  }

  destructuring() {
    const person: {
      name: { givenName: string; familyName: string };
      age: number;
    } = {
      name: { givenName: 'John', familyName: 'Doe' },
      age: 20,
    };

    // givenName has an alias
    let {
      name: { givenName: given, familyName },
    } = person;

    // the destuctured variable is an actual copy and not a reference
    given = 'Jane';
    return [person.name.givenName, given, familyName];
  }

  functionAsParameter() {
    function performOperation(
      x: number,
      y: number,
      operation: Function
    ): number {
      return operation(x, y);
    }

    function add(a: number, b: number): number {
      return a + b;
    }

    function multiply(a: number, b: number): number {
      return a * b;
    }

    console.log(performOperation(5, 3, add));
    return performOperation(5, 3, multiply);
  }
  myDog() {
    const dog: { firstName: string; lastName: string; breed?: string } = {
      firstName: 'Good',
      lastName: 'Girl',
    };

    const label = 'breed';
    dog[label] = 'mutt';
    return JSON.stringify(dog);
  }
  recursive(n: number): number {
    // n = 5
    if (n <= 1) {
      return 1;
    } else {
      return n * this.recursive(n - 1);
    }
  }
  stackblitz(path: string) {
    if (path === this.path) {
      this.path = '';
      return;
    }

    this.path = path;
    let stackblitzUrl = `https://stackblitz.com/edit/${this.path}?file=index.ts`;
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(stackblitzUrl);
  }

  conditionalShorthand() {
    const isTrue = true;

    return isTrue && returnThis();

    function returnThis() {
      return 'The condition is true';
    }
  }
}
