import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  width: number = window.innerWidth;
  public showProfilePic: boolean = true;
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  async ngOnInit() {
    this.setSize();
  }

  openUrl(url: string): void {
    window.open(url, '_blank');
  }

  @HostListener('window:resize')
  onResize() {
    this.setSize();
  }

  setSize() {
    this.width = window.innerWidth;
    if (this.width < 600) {
      this.showProfilePic = false;
    } else {
      this.showProfilePic = true;
    }
  }
}
