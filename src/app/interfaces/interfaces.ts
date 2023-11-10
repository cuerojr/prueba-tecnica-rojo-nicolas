
export interface Product {
  id: string;
  name: string;
  description: string;
  logo: string;
  date_release: Date | any;
  date_revision: Date | any;
  [key: string]: any
}
