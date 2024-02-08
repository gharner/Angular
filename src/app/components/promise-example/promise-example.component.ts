import { Component } from '@angular/core';
import { SandboxService } from 'src/app/services/sandbox.service';

@Component({
  selector: 'app-promiseX',
  templateUrl: './promise-example.component.html',
  styleUrls: ['./promise-example.component.css'],
})
export class PromiseExample {
  products!: any[];
  constructor(private sandboxService: SandboxService) {}

  async ngOnInit() {
    await this.exampleChainedThen();
    await this.fullExampleUsingService();
  }

  async exampleChainedThen() {
    try {
      this.products = await this.sandboxService.getProducts();
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  }

  async fullExampleUsingService() {
    try {
      const message = await this.sandboxService.waitAndRespond(2000);
      console.log('Success:', message);
    } catch (error) {
      console.error('Error in valid request:', error);
    }

    try {
      const message = await this.sandboxService.waitAndRespond(-1000);
      console.log('Success:', message);
    } catch (error) {
      console.error('Error in invalid request:', error);
    }
  }
}
