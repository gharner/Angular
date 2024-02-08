import { Component, OnInit } from '@angular/core';
import { GoogleSheetsDbService } from 'ng-google-sheets-db';
import { Observable } from 'rxjs';

const competitorAttributesMapping = {
  givenName: 'First Name',
  familyName: 'Last Name',
  age: 'Age',
  gender: 'Gender',
  height: 'Height',
  recreational: 'Recreational',
  special: 'Special',
  tiny: 'Tiny Tiger',
  rank: 'Rank',
  ataNumber: 'ATA Number',
  email: 'Email',
  school: 'School',
};

interface Competitor {
  givenName: string;
  familyName: string;
  age: string;
  gender: string;
  height: string;
  recreational: string;
  special: string;
  tiny: string;
  rank: string;
  ataNumber: string;
  email: string;
  school: string;
}

@Component({
  selector: 'app-sheets',
  templateUrl: './sheets.component.html',
  styleUrls: ['./sheets.component.css'],
})
export class SheetsComponent implements OnInit {
  characters$!: Observable<Competitor[]>;

  constructor(private googleSheetsDbService: GoogleSheetsDbService) {}

  ngOnInit() {
    this.characters$ = this.googleSheetsDbService.get<Competitor>(
      '1GGdD8_STf1xkwNJXZjqy_BWleJ4V6uXh0R3fWz3XYXA',
      'Competitors',
      competitorAttributesMapping
    );
    this.characters$.subscribe((value) => console.log(value));
  }
}
