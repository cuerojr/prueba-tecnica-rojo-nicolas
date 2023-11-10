
export interface Product {
  id: String;
  name: String;
  description: String;
  logo: String;
  date_release: Date | any;
  date_revision: Date | any;
  [key: string]: any
}
