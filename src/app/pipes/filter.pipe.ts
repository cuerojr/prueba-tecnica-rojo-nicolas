import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/interfaces';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(value: Product[] | null, args: any): Product[] | null {
    if (!value || !Array.isArray(value)) return null;
    if (!args) return value;

    args = args.toLowerCase();

    return value.filter((item: Product) => {
      // Adjust the filtering logic based on your needs
      return (
        JSON.stringify(item).toLowerCase().includes(args) ||
        item.name.toLowerCase().includes(args) ||
        item.description.toLowerCase().includes(args)
      );
    });
  }
}
