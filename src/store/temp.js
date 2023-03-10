idk = [
  {
    image: string,
    name: string,
    variant: {
      item: {
        price: string,
        selling_price: string,
        weight: string,
        qty: number,
        variant_id: number,
        unit: string,
      },
      quantity: number,
    },
    id: number,
  },
];

const x = {
  userid: id,
  shippingAddress: address,
  shippingCharge: deliveryCharge,
  items: [
    {
      image: string,
      name: string,
      variant: {
        item: {
          price: string,
          selling_price: string,
          weight: string,
          qty: number,
          variant_id: number,
          unit: string,
        },
        quantity: number,
      },
      id: number,
    },
  ],
  total_amount: total_amount,
  payment_method: 'online',
  transaction_id: razorpay_payment_id,
};
