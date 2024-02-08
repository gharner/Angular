import { Component, OnInit } from '@angular/core';
import { SandboxService } from 'src/app/services/sandbox.service';

@Component({
  selector: 'app-directives',
  templateUrl: './directives.component.html',
  styleUrls: ['./directives.component.css'],
})
export class DirectivesTableComponent implements OnInit {
  public condition: boolean = true;
  public products!: any[];

  constructor(private sandboxService: SandboxService) {}

  async ngOnInit() {
    this.products = await this.sandboxService.getProducts();
  }
}
