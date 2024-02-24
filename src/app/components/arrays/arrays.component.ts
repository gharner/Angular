import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Product } from 'src/app/models/product.models';
import { SandboxService } from 'src/app/services/sandbox.service';
import { GregHarner } from 'gregharner';

@Component({
  selector: 'app-arrays',
  templateUrl: './arrays.component.html',
  styleUrls: ['./arrays.component.css'],
})
export class ArraysComponent {
  public path: string = '';
  public prettyProductNames: string = '';
  public productNames: string[] = [];
  public products!: Product[];
  public safeUrl!: SafeResourceUrl;
  public productNamesMap!: Map<any, any>;
  public prettyProductNamesMap: string = '';
  public reduceTotal: any;
  public filterDuplicates: any;
  public setDuplicates: any;
  private gregharnerInstance = new GregHarner();
  constructor(
    private sandboxService: SandboxService,
    private sanitizer: DomSanitizer
  ) {}
  async ngOnInit() {
    this.products = await this.sandboxService.getProducts();
    await this.sortExample();
    await this.mapExample();
    this.reduceTotal = JSON.stringify(this.totalValueOfInventory());
    this.filterDuplicates = JSON.stringify(this.removeDuplicatesByFilter());
    this.setDuplicates = JSON.stringify(this.removeDuplicatesBySet());
  }
  async sortExample() {
    const names = this.products.map((m) => m.name) ?? [];
    this.productNames = [...(names as string[])];
    this.productNames.sort((a, b) => a!.localeCompare(b!));
    this.prettyProductNames = new GregHarner().stringyPretty(names);
  }
  async mapExample() {
    this.productNamesMap = new Map();
    this.productNamesMap.set(1, this.productNames[1]);
    this.productNamesMap.set(2, this.productNames[2]);
    this.productNamesMap.set(3, this.productNames[3]);

    this.prettyProductNamesMap = new GregHarner().stringyPretty(
      Array.from(this.productNamesMap)
    );
  }
  isAnArray(key: string) {
    if (this.productNamesMap) {
      switch (key) {
        case 'isArray':
          return Array.isArray(this.productNamesMap);
        case 'spread':
          return Array.isArray([...this.productNamesMap]);
        case 'from':
          return Array.isArray(Array.from(this.productNamesMap));
        case 'arrayLike':
          return typeof this.productNamesMap[Symbol.iterator] === 'function';
        default:
          return confirm('Error in isAnArray function');
      }
    }
    return;
  }
  copyArray(key: string) {
    const array = [1, 2, 3, { value: 4 }, [[5]], 6, 7];

    switch (key) {
      case 'spread':
        return JSON.stringify([...array]);
      case 'slice':
        return array.slice();
      case 'stringify':
        return JSON.parse(JSON.stringify(array));
      case 'concat':
        return array.concat([8, 9]);
      case 'structured':
        const clone = structuredClone(array);
        return clone;
      default:
        return confirm('Error in copyArray()');
    }
  }
  convertSetToArray() {
    const numSet = new Set([1, '2', 3]);

    const numArr = Array.from(numSet, (val) => {
      if (typeof val === 'string') {
        return Number(val);
      } else {
        return val;
      }
    });

    return this.gregharnerInstance.stringyPretty(Array.from(numArr));
  }
  filterArrays(key: string) {
    let array = [1, 2, 3, 4, 5, 6, 7];

    switch (key) {
      case 'intersection':
        return JSON.stringify(array.filter((f) => [1, 2].includes(f)));
      case 'difference':
        return JSON.stringify(array.filter((f) => ![1, 2].includes(f)));
      default:
        break;
    }
    return JSON.stringify(array);
  }
  totalValueOfInventory() {
    const categoryTotals = this.products.reduce(
      (accumulator: { [key: string]: number }, product) => {
        const category = product.category as string;
        const price = product.price as number;

        if (!accumulator[category]) {
          accumulator[category] = 0;
        }

        accumulator[category] += price;
        return accumulator;
      },
      {} as { [key: string]: number }
    );
    return categoryTotals;
  }
  removeDuplicatesByFilter() {
    const duplicates = this.products.map((m) => m.category);
    return duplicates.filter(
      (element, index, array) => array.indexOf(element) === index
    );
  }
  removeDuplicatesBySet() {
    const uniqueCategories = new Set(
      this.products.map((product) => product.category)
    );
    return Array.from(uniqueCategories);
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
}
