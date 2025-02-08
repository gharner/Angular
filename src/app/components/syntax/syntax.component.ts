import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-syntax',
  templateUrl: './syntax.component.html',
  styleUrls: ['./syntax.component.css'],
})
export class SyntaxComponent implements OnInit {
  public path: string = '';
  public safeUrl!: SafeResourceUrl;
  public value: any;
  public functionString!: string;

  private data = [
    {
      projected: 0,
      amount: 400,
      description: 'Renting Maple Room for Battleground ATL in April 2025',
      id: 'ABQx7s6GW4EHwj2nCitX',
      balance: 0,
      timeCreated: '2024-11-15T00:00',
    },
    {
      projected: -438.83,
      amount: -438.83,
      description: "Catering for Competitor's Banquet",
      id: 'Nc16oj7PHr1u1KmiZsQx',
      balance: 0,
      timeCreated: '2024-11-04T00:00',
    },
    {
      projected: -350,
      amount: -350,
      description: 'Rented Room for Grand Master Invitational',
      id: 'RiiG3XZMNVSOanV7kG47',
      balance: 0,
      timeCreated: '2024-10-08T00:00',
    },
    {
      projected: 1085.6,
      amount: 1085.6,
      description: 'Rebate Districts',
      id: 'LlaBhKZ9iEoWEI7s7SSk',
      balance: 0,
      timeCreated: '2024-10-07T00:00',
    },
    {
      projected: 0,
      amount: -725,
      description: 'Community Center for Banquet',
      id: 's98Gsx0ykcsk7MfuP1i5',
      balance: 0,
      timeCreated: '2024-09-10T00:00',
    },
    {
      projected: 0,
      amount: 51,
      description: 'Rebate',
      id: 'umEOf3GZp077mouvErrm',
      balance: 0,
      timeCreated: '2024-09-09T00:00',
    },
    {
      projected: 964.5,
      amount: 964.5,
      description: 'Battle Ground Atlanta',
      id: 'N5e1wU83DHnbY7xA1TBs',
      balance: 0,
      timeCreated: '2024-07-03T00:00',
    },
    {
      projected: 400,
      amount: 400,
      description: 'Grandmaster Invitational',
      id: 'jWWSyeXsF7RqmSlNVSyy',
      balance: 0,
      timeCreated: '2024-04-29T00:00',
    },
    {
      projected: 0,
      amount: 88.04,
      description: 'The Forge VIII',
      id: 'RakFMPuZ47F4pbQizfoo',
      balance: 0,
      timeCreated: '2024-03-29T00:00',
    },
    {
      projected: 0,
      amount: -350,
      description: 'Room Rental Gas South for Battleground ATL',
      id: 'Izv5h3QRs6kSQvR8b6pU',
      balance: 0,
      timeCreated: '2024-03-19T00:00',
    },
    {
      projected: 0,
      amount: -1090.71,
      description: 'Olive Garden',
      id: '3zOuFNhxkIfrRxMu1R1f',
      balance: 0,
      timeCreated: '2023-10-31T00:00',
    },
    {
      projected: 0,
      amount: -27.54,
      description: 'Table Cloths',
      id: 'F70Xd2dWfnrCUgKLlRiP',
      balance: 0,
      timeCreated: '2023-10-31T00:00',
    },
    {
      projected: 0,
      amount: -186.86,
      description: 'McEntyres Bakery',
      id: 'TpSpIgRm0uqBHaobdy2u',
      balance: 0,
      timeCreated: '2023-10-23T00:00',
    },
    {
      projected: 0,
      amount: -200,
      description: 'City of Smyrna Liquor Liscense',
      id: 'MBkwOXzSdTjrY7YemUpT',
      balance: 0,
      timeCreated: '2023-10-20T00:00',
    },
    {
      projected: 0,
      amount: 1030.95,
      description: 'South East Districts',
      id: '6mvIIAQ3AMWHXCcclJRp',
      balance: 0,
      timeCreated: '2023-09-30T00:00',
    },
    {
      projected: 0,
      amount: -1025,
      description: 'Smyrna Community Center',
      id: 'fYI85XNM9Xhj72BZ7yMI',
      balance: 0,
      timeCreated: '2023-09-25T00:00',
    },
    {
      projected: 0,
      amount: 505,
      description: 'Battleground Atlanta',
      id: 'pmrJmYuaIi1Wt6TkRhkW',
      balance: 0,
      timeCreated: '2023-06-11T00:00',
    },
    {
      projected: 0,
      amount: 17,
      description: 'Spring Nationals',
      id: 'KyArwyZauKk7vON1hdB1',
      balance: 0,
      timeCreated: '2023-05-16T00:00',
    },
    {
      projected: 553.75,
      amount: 553.75,
      description: 'Master Church Tournament',
      id: 'LjCI3DXpFYSx4m2U0R9U',
      balance: 0,
      timeCreated: '2023-04-20T00:00',
    },
    {
      projected: 0,
      amount: 626.25,
      description: 'Grandmaster Invitational',
      id: 'IbJ1nLiQ0ZJKibJKyfeD',
      balance: 0,
      timeCreated: '2022-11-12T00:00',
    },
    {
      projected: 586.25,
      amount: 586.25,
      description: 'AIM Battleground',
      id: 'hmLK6lgfY06nq3EtL4om',
      balance: 0,
      timeCreated: '2022-11-07T00:00',
    },
    {
      projected: 0,
      amount: -2171,
      description: 'American Legion',
      id: '0iglkT8TJ7KeS3kTIVby',
      balance: 0,
      timeCreated: '2022-08-08T00:00',
    },
    {
      projected: 0,
      amount: -421.12,
      description: 'David Shoffner',
      id: 'OUrhVLhLNYlDq9kK1p0y',
      balance: 0,
      timeCreated: '2022-08-08T00:00',
    },
    {
      projected: 0,
      amount: -157.9,
      description: 'Bakery',
      id: 'iTPfbdQb1ayRTyAuoySA',
      balance: 0,
      timeCreated: '2022-08-01T00:00',
    },
    {
      projected: 0,
      amount: -875,
      description: 'American Legion',
      id: 'XP6n00va2CHhcySJdkKj',
      balance: 0,
      timeCreated: '2022-07-13T00:00',
    },
    {
      projected: 615,
      amount: 585,
      description: 'Battleground Atlanta',
      id: 'OhlKZsQMeSeMN4TymV0Y',
      balance: 0,
      timeCreated: '2022-04-22T00:00',
    },
    {
      projected: 108,
      amount: 100,
      description: 'Valdosta Super Regional',
      id: 'CT9hfrtyEl1odrAdQLgw',
      balance: 0,
      timeCreated: '2022-02-12T00:00',
    },
    {
      projected: 0,
      amount: 121.5,
      description: 'Top Gun Tournament',
      id: 'WJf8gkPxy2zyS67Zfuru',
      balance: 0,
      timeCreated: '2022-01-07T00:00',
    },
    {
      projected: 0,
      amount: 132,
      description: 'Shlee Tournament',
      id: '7w3Ljtc3gveFaEMy1y3L',
      balance: 0,
      timeCreated: '2021-12-01T00:00',
    },
    {
      projected: 0,
      amount: 335.24,
      description: '2021 Virtual Tournaments',
      id: 't9iooKn2r55vZ6Xs5ijX',
      balance: 0,
      timeCreated: '2021-11-17T00:00',
    },
    {
      projected: 0,
      amount: 127,
      description: '2020 Southeast District Championship',
      id: 'piDkJWc0JknUXECC7WeZ',
      balance: 0,
      timeCreated: '2021-10-04T00:00',
    },
    {
      projected: 221,
      amount: 142,
      description: 'Dragon Warrior Invitational',
      id: '58xpXouIb6B49TLKQPo7',
      balance: 0,
      timeCreated: '2021-05-24T00:00',
    },
    {
      projected: 0,
      amount: 306.09,
      description: '2020 Virtual Tournaments',
      id: 'LXYK9vwbfbe5YiaUb0NF',
      balance: 0,
      timeCreated: '2021-03-03T00:00',
    },
    {
      projected: 0,
      amount: 34,
      description: 'Spring Nationals 2020',
      id: 'GtOAKR0dTL0h6VfRfGA9',
      balance: 0,
      timeCreated: '2020-08-18T00:00',
    },
    {
      projected: 241,
      amount: 241,
      description: 'Karate Kennesaw tournament',
      id: 'iS3wXWYNOEXDDi9s7R9U',
      balance: 0,
      timeCreated: '2020-02-21T00:00',
    },
    {
      projected: 243,
      amount: 243,
      description: 'ATA Taekwondo Championship',
      id: 'A5xgttZ3c77uTYsH7292',
      balance: 0,
      timeCreated: '2020-01-14T00:00',
    },
    {
      projected: 116.25,
      amount: 116.25,
      description: 'Magic City Invitational',
      id: 'feODar5waArgjHxiG95K',
      balance: 0,
      timeCreated: '2020-01-14T00:00',
    },
    {
      projected: 17,
      amount: 17,
      description: 'Fall Nationals Rebate',
      id: 'Uu9vi51bdekGzkIZ0T9S',
      balance: 0,
      timeCreated: '2019-12-16T00:00',
    },
    {
      projected: 428.26,
      amount: 428.26,
      description: 'District Championship Rebate',
      id: '7YJ0y4hqcMAZbxBhDGja',
      balance: 0,
      timeCreated: '2019-10-09T00:00',
    },
    {
      projected: 10,
      amount: 10,
      description: 'Starting Balance',
      id: '7o7hEMkA6WRxMidiDW8Z',
      balance: 0,
      timeCreated: '2019-10-09T00:00',
    },
  ];

  constructor(private sanitizer: DomSanitizer) {
    this.functionString = this.breakAndContinue.toString();
  }

  ngOnInit(): void {}

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

  castingShorthand() {
    const numberString = '123';
    return +numberString;
  }

  getJsonData(): string {
    return JSON.stringify(this.data, null, 2);
  }

  copyToClipboard(textArea: HTMLTextAreaElement) {
    textArea.select();
    document.execCommand('copy');
    alert('Ledger JSON copied to clipboard!');
  }
}
