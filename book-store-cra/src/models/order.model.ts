export interface Order {
  id: number;
  create_at: string;
  address: string;
  receiver: string;
  contact: string;
  book_title: string;
  total_quantity: number;
  total_price: number;
}

export interface OrderSheet {
  items: number[];
  totalQuantity: number;
  totalPrice: number;
  firstBookTitle: string;
  delivery: {
    address: string;
    receiver: string;
    contact: string;
  }
}