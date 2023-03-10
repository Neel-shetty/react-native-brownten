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

const temp = {
  status: 1,
  data: [
    {
      id: 10,
      user_id: 2,
      order_id: '14089441',
      order_status: 'Delivered',
      username: 'john',
      shipping_address: 'Home, Test Street , ABC 123 Home , Bhopal 462001',

      shipping_charge: '0',
      total_amount: '115',
      payment_method: 'Online',
      payment_status: 'Success',
      transation_id: 'pay_K4Et3GqcIfRwAM',
      created_at: '2022-08-11T01:42:21.000000Z',
      updated_at: '2022-11-08T16:57:16.000000Z',
    },
    {
      id: 11,
      user_id: 2,
      order_id: '14089441',
      order_status: 'Pending',
      username: 'john',
      shipping_address: 'Home, Test Street , ABC 123 Home , Bhopal 462001',
      item_name: 'Moong Dal',

      shipping_charge: '0',
      total_amount: '115',
      payment_method: 'Online',
      payment_status: 'Success',
      transation_id: 'pay_K4Et3GqcIfRwAM',
      created_at: '2022-08-11T01:42:21.000000Z',
      updated_at: '2022-08-11T01:42:21.000000Z',
    },
  ],
};

const temp2 = {
  status: 1,
  data: {
    id: 11,
    user_id: 2,
    order_id: '14089441',
    order_status: 'Pending',
    username: 'john',
    shipping_address: 'Home, Test Street , ABC 123 Home , Bhopal 462001',
    shipping_charge: '0',
    total_amount: '115',
    payment_method: 'Online',
    payment_status: 'Success',
    transation_id: 'pay_K4Et3GqcIfRwAM',
    created_at: '2022-08-11T01:42:21.000000Z',
    updated_at: '2022-08-11T01:42:21.000000Z',
    items: [
      {
        name: 'Moong Dal',
        weight: '1kg',
        quantity: '1',
        price: '65',
        image: ' ',
      },
      {
        name: 'Chana Dal',
        item_weight: '500gm',
        item_qty: '1',
        item_price: '50',
        image: '',
      },
    ],
  },
};
