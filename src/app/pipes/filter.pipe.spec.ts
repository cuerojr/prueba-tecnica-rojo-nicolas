import { TestBed } from '@angular/core/testing';
import { FilterPipe } from './filter.pipe';
import { Product } from '../interfaces/interfaces';

describe('FilterPipe', () => {
  let pipe: FilterPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilterPipe],
    });

    pipe = TestBed.inject(FilterPipe);
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the original array if no value is provided', () => {
    const products: Product[] = [{
        id: 'mock-id',
        name: 'mock-name',
        description: 'mock-description',
        logo: 'mock-logo',
        date_release: '2023-01-01',
        date_revision: '2024-01-01',
      },
      {
        id: 'mock-id-2',
        name: 'mock-name',
        description: 'mock-description',
        logo: 'mock-logo',
        date_release: '2023-01-01',
        date_revision: '2024-01-01',
      }];

    const result = pipe.transform(products, null);

    expect(result).toEqual(products);
  });

  it('should return the original array if no filter string is provided', () => {
    const products: Product[] = [{
      id: 'mock-id',
      name: 'mock-name',
      description: 'mock-description',
      logo: 'mock-logo',
      date_release: '2023-01-01',
      date_revision: '2024-01-01',
    },
    {
      id: 'mock-id-2',
      name: 'mock-name',
      description: 'mock-description',
      logo: 'mock-logo',
      date_release: '2023-01-01',
      date_revision: '2024-01-01',
    }];

    const result = pipe.transform(products, '');

    expect(result).toEqual(products);
  });

  it('should filter the array based on the provided filter string', () => {
    const products: Product[] = [{
      id: 'mock-id',
      name: 'mock-name',
      description: 'mock-description',
      logo: 'mock-logo',
      date_release: '2023-01-01',
      date_revision: '2024-01-01',
    },
    {
      id: 'mock-id-2',
      name: 'mock-name',
      description: 'mock-description',
      logo: 'mock-logo',
      date_release: '2023-01-01',
      date_revision: '2024-01-01',
    }];

    const filterString = 'mock-name';

    const result = pipe.transform(products, filterString);

    expect(result).toEqual([{
      id: 'mock-id',
      name: 'mock-name',
      description: 'mock-description',
      logo: 'mock-logo',
      date_release: '2023-01-01',
      date_revision: '2024-01-01',
    },
    {
      id: 'mock-id-2',
      name: 'mock-name',
      description: 'mock-description',
      logo: 'mock-logo',
      date_release: '2023-01-01',
      date_revision: '2024-01-01',
    }]);
  });

  it('should filter the array based on a partial filter string match', () => {
    const products: Product[] = [{
      id: 'mock-id',
      name: 'mock-name',
      description: 'mock-description',
      logo: 'mock-logo',
      date_release: '2023-01-01',
      date_revision: '2024-01-01',
    },
    {
      id: 'mock-id-2',
      name: 'mock-name3',
      description: 'mock-description',
      logo: 'mock-logo',
      date_release: '2023-01-01',
      date_revision: '2024-01-01',
    }];

    const filterString = 'mock';

    const result = pipe.transform(products, filterString);

    expect(result).toEqual([{
      id: 'mock-id',
      name: 'mock-name',
      description: 'mock-description',
      logo: 'mock-logo',
      date_release: '2023-01-01',
      date_revision: '2024-01-01',
    },
    {
      id: 'mock-id-2',
      name: 'mock-name3',
      description: 'mock-description',
      logo: 'mock-logo',
      date_release: '2023-01-01',
      date_revision: '2024-01-01',
    }]);
  });

  it('should return null when the value is not an array', () => {
    const nonArrayValue = 'not an array';
    const filterString = 'mock';

    const result = pipe.transform(nonArrayValue as any, filterString);

    expect(result).toBeNull();
  });

});
