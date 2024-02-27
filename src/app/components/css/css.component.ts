import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-css',
  templateUrl: './css.component.html',
  styleUrls: ['./css.component.css'],
})
export class CSSComponent {
  public path: string = '';
  public safeUrl!: SafeResourceUrl;
  constructor(private sanitizer: DomSanitizer) {}

  async ngOnInit() {}

  stackblitz(path: string) {
    if (path === this.path) {
      this.path = '';
      return;
    }

    this.path = path;
    let stackblitzUrl = `https://stackblitz.com/edit/${this.path}?file=index.ts`;
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(stackblitzUrl);
  }

  calculatedStyle(valueCheck: boolean) {
    let style: string = '';
    switch (valueCheck) {
      case true:
        style = 'background-color: #FCFFD2';
        break;

      case false:
        style = 'background-color: lightgrey';
        break;
    }
    return style;
  }
}
