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



const abc = {"config": {"adapter": ["xhr", "http"], "baseURL": "https://brownten.com/api", "data": "{\"userid\":\"32\",\"shippingAddress\":1,\"shippingCharge\":0,\"items\":[{\"id\":747,\"image\":\"https://brownten.com/public/uploads/products/9430297929.jpg\",\"name\":\"Jaipatri (Mace)\",\"variant\":{\"item\":{\"price\":\"136\",\"selling_price\":\"104\",\"weight\":\"20\",\"unit\":\"gm\",\"qty\":1,\"variant_id\":864},\"quantity\":1}},{\"id\":734,\"image\":\"https://brownten.com/public/uploads/products/8276563223.jpg\",\"name\":\"Ajma\",\"variant\":{\"item\":{\"price\":\"120\",\"selling_price\":\"94\",\"weight\":\"200\",\"unit\":\"gm\",\"qty\":0,\"variant_id\":848},\"quantity\":1}},{\"id\":832,\"image\":\"https://brownten.com/public/uploads/products/9446319424.jpeg\",\"name\":\"Himalaya Moisturizing Aloe Vera Facewash: 200 ml\",\"variant\":{\"item\":{\"price\":\"235\",\"selling_price\":\"219\",\"weight\":\"200\",\"unit\":\"ml\",\"qty\":50,\"variant_id\":988},\"quantity\":3}},{\"id\":748,\"image\":\"https://brownten.com/public/uploads/products/8609051477.jpg\",\"name\":\"jeera\",\"variant\":{\"item\":{\"price\":\"48\",\"selling_price\":\"39\",\"weight\":\"100\",\"unit\":\"kg\",\"qty\":0,\"variant_id\":865},\"quantity\":1}},{\"id\":748,\"image\":\"https://brownten.com/public/uploads/products/8609051477.jpg\",\"name\":\"jeera\",\"variant\":{\"item\":{\"price\":\"100\",\"selling_price\":\"74\",\"weight\":\"200\",\"unit\":\"gm\",\"qty\":0,\"variant_id\":866},\"quantity\":1}}],\"total_amount\":968,\"payment_method\":\"online\",\"transaction_id\":\"pay_LRLa8zqBnrfeMd\"}", "env": {"Blob": [Function Blob], "FormData": [Function FormData]}, "headers": [Object], "maxBodyLength": -1, "maxContentLength": -1, "method": "post", "timeout": 0, "transformRequest": [[Function transformRequest]], "transformResponse": [[Function transformResponse]], "transitional": {"clarifyTimeoutError": false, "forcedJSONParsing": true, "silentJSONParsing": true}, "url": "/order/insert", "validateStatus": [Function validateStatus], "xsrfCookieName": "XSRF-TOKEN", "xsrfHeaderName": "X-XSRF-TOKEN"}, "data": {"exception": "ErrorException", "file": "/home/u620909294/domains/brownten.com/public_html/app/Http/Controllers/APIController.php", "line": 1442, "message": "Undefined index: user_id", "trace": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]]}, "headers": {"access-control-allow-origin": "*", "cache-control": "no-cache, private", "content-security-policy": "upgrade-insecure-requests", "content-type": "application/json", "date": "Tue, 14 Mar 2023 09:00:13 GMT", "platform": "hostinger", "server": "LiteSpeed", "vary": "Accept-Encoding", "x-powered-by": "PHP/7.4.33", "x-ratelimit-limit": "60", "x-ratelimit-remaining": "58"}, "request": {"DONE": 4, "HEADERS_RECEIVED": 2, "LOADING": 3, "OPENED": 1, "UNSENT": 0, "_aborted": false, "_cachedResponse": undefined, "_hasError": false, "_headers": {"accept": "application/json, text/plain, */*", "content-type": "application/json"}, "_incrementalEvents": false, "_lowerCaseResponseHeaders": {"access-control-allow-origin": "*", "cache-control": "no-cache, private", "content-security-policy": "upgrade-insecure-requests", "content-type": "application/json", "date": "Tue, 14 Mar 2023 09:00:13 GMT", "platform": "hostinger", "server": "LiteSpeed", "vary": "Accept-Encoding", "x-powered-by": "PHP/7.4.33", "x-ratelimit-limit": "60", "x-ratelimit-remaining": "58"}, "_method": "POST", "_perfKey": "network_XMLHttpRequest_https://brownten.com/api/order/insert", "_performanceLogger": {"_closed": false, "_extras": [Object], "_pointExtras": [Object], "_points": [Object], "_timespans": [Object]}, "_requestId": null, "_response": "{
    \"message\": \"Undefined index: user_id\",
    \"exception\": \"ErrorException\",
    \"file\": \"/home/u620909294/domains/brownten.com/public_html/app/Http/Controllers/APIController.php\",
    \"line\": 1442,
    \"trace\": [
        {
            \"file\": \"/home/u620909294/domains/brownten.com/public_html/app/Http/Controllers/APIController.php\",
            \"line\": 1442,
            \"function\": \"handleError\",
            \"class\": \"Illuminate\\\\Foundation\\\\Bootstrap\\\\HandleExceptions\",
            \"type\": \"->\"
        },
        {
            \"file\": \"/home/u620909294/domains/brownten.com/public_html/vendor/laravel/framework/src/Illuminate/Routing/Controller.php\",
            \"line\": 54,
            \"function\": \"OrderInsert\",
            \"class\": \"App\\\\Http\\\\Controllers\\\\APIController\",
            \"type\": \"->\"
        },
        {
            \"file\": \"/home/u620909294/domains/brownten.com/public_html/vendor/laravel/framework/src/Illuminate/Routing/ControllerDispatcher.php\",
            \"line\": 45,
            \"function\": \"callAction\",
            \"class\": \"Illuminate\\\\Routing\\\\Controller\",
            \"type\": \"->\"
        },
        {
            \"file\": \"/home/u620909294/domains/brownten.com/public_html/vendor/laravel/framework/src/Illuminate/Routing/Route.php\",
            \"line\": 262,
            \"function\": \"dispatch\",
            \"class\": \"Illuminate\\\\Routing\\\\ControllerDispatcher\",
            \"type\": \"->\"
        },
        {
            \"file\": \"/home/u620909294/domains/brownten.com/public_html/vendor/laravel/framework/src/Illuminate/Routing/Route.php\",
            \"line\": 205,
            \"function\": \"runController\",
            \"class\": \"Illuminate\\\\Routing\\\\Route\",
            \"type\": \"->\"
        },
        {
            \"file\": \"/home/u620909294/domains/brownten.com/public_html/vendor/laravel/framework/src/Illuminate/Routing/Router.php\",
            \"line\": 721,
            \"function\": \"run\",
            \"class\": \"Illuminate\\\\Routing\\\\Route\",
            \"type\": \"->\"
        },
        {
            \"file\": \"/home/u620909294/domains/brownten.com/public_html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php\",
            \"line\": 128,
            \"function\": \"Illuminate\\\\Routing\\\\{closure}\",
            \"class\": \"Illuminate\\\\Routing\\\\Router\",
            \"type\": \"->\"
        },
        {
            \"file\": \"/home/u620909294/domains/brownten.com/public_html/vendor/laravel/framework/src/Illuminate/Routing/Middleware/SubstituteBindings.php\",    
            \"line\": 50,
            \"function\": \"Illuminate\\\\Pipeline\\\\{closure}\",
            \"class\": \"Illuminate\\\\Pipeline\\\\Pipeline\",
            \"type\": \"->\"
        },
        {
            \"file\": \"/home/u620909294/domains/brownten.com/public_html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php\",
            \"line\": 167,
            \"function\": \"handle\",
            \"class\": \"Illuminate\\\\Routing\\\\Middleware\\\\SubstituteBindings\",
            \"type\": \"->\"
        },
        {
            \"file\": \"/home/u620909294/domains/brownten.com/public_html/vendor/laravel/framework/src/Illuminate/Routing/Middleware/ThrottleRequests.php\",      
            \"line\": 127,
            \"function\": \"Illuminate\\\\Pipeline\\\\{closure}\",
            \"class\": \"Illuminate\\\\Pipeline\\\\Pipeline\",
            \"type\": \"->\"
        },
        {
            \"file\": \"/home/u620909294/domains/brownten.com/public_html/vendor/laravel/framework/src/Illuminate/Routing/Middleware/ThrottleRequests.php\",      
            \"line\": 103,
            \"function\": \"handleRequest\",
            \"class\": \"Illuminate\\\\Routing\\\\Middleware\\\\ThrottleRequests\",
            \"type\": \"->\"
        },
        {
            \"file\": \"/home/u620909294/domains/brownten.com/public_html/vendor/laravel/framework/src/Illuminate/Routing/Middleware/ThrottleRequests.php\",
            \"line\": 55,
            \"function\": \"handleRequestUsingNamedLimiter\",
            \"class\": \"Illuminate\\\\Routing\\\\Middleware\\\\ThrottleRequests\",
            \"type\": \"->\"
        },
        {
            \"file\": \"/home/u620909294/domains/brownten.com/public_html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php\",
            \"line\": 167,
            \"function\": \"handle\",
            \"class\": \"Illuminate\\\\Routing\\\\Middleware\\\\ThrottleRequests\",
            \"type\": \"->\"
        },
        {
            \"file\": \"/home/u620909294/domains/brownten.com/public_html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php\",
            \"line\": 103,
            \"function\": \"Illuminate\\\\Pipeline\\\\{closure}\",
            \"class\": \"Illuminate\\\\Pipeline\\\\Pipeline\",
            \"type\": \"->\"
        },
        {
            \"file\": \"/home/u620909294/domains/brownten.com/public_html/vendor/laravel/framework/src/Illuminate/Routing/Router.php\",
            \"line\": 723,
            \"function\": \"then\",
            \"class\": \"Illuminate\\\\Pipeline\\\\Pipeline\",
            \"type\": \"->\"
        },
        {
            \"file\": \"/home/u620909294/domains/brownten.com/public_html/vendor/laravel/framework/src/Illuminate/Routing/Router.php\",
            \"line\": 698,
            \"function\": \"runRouteWithinStack\",
            \"class\": \"Illuminate\\\\Routing\\\\Router\",
            \"type\": \"->\"
        },
        {
            \"file\": \"/home/u620909294/domains/brownten.com/public_html/vendor/laravel/framework/src/Illuminate/Routing/Router.php\",
            \"line\": 662,
            \"function\": \"runRoute\",
            \"class\": \"Illuminate\\\\Routing\\\\Router\",
            \"type\": \"->\"
        },
        {
            \"file\": \"/home/u620909294/domains/brownten.com/public_html/vendor/laravel/framework/src/Illuminate/Routing/Router.php\",
            \"line\": 651,
            \"function\": \"dispatchToRoute\",
            \"class\": \"Illuminate\\\\Routing\\\\Router\",
            \"type\": \"->\"
        },
        {
            \"file\": \"/home/u620909294/domains/brownten.com/public_html/vendor/laravel/framework/src/Illuminate/Foundation/Http/Kernel.php\",
            \"line\": 167,
            \"function\": \"dispatch\",
            \"class\": \"Illuminate\\\\Routing\\\\Router\",
            \"type\": \"->\"
        },
        {
            \"file\": \"/home/u620909294/domains/brownten.com/public_html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php\",
            \"line\": 128,
            \"function\": \"Illuminate\\\\Foundation\\\\Http\\\\{closure}\",
            \"class\": \"Illuminate\\\\Foundation\\\\Http\\\\Kernel\",
            \"type\": \"->\"
        },
        {
            \"file\": \"/home/u620909294/domains/brownten.com/public_html/vendor/laravel/framework/src/Illuminate/Foundation/Http/Middleware/TransformsRequest.php\",
            \"line\": 21,
            \"function\": \"Illuminate\\\\Pipeline\\\\{closure}\",
            \"class\": \"Illuminate\\\\Pipeline\\\\Pipeline\",
            \"type\": \"->\"
        },
        {
            \"file\": \"/home/u620909294/domains/brownten.com/public_html/vendor/laravel/framework/src/Illuminate/Foundation/Http/Middleware/ConvertEmptyStringsToNull.php\",
            \"line\": 31,
            \"function\": \"handle\",
            \"class\": \"Illuminate\\\\Foundation\\\\Http\\\\Middleware\\\\TransformsRequest\",
            \"type\": \"->\"
        },
        {
            \"file\": \"/home/u620909294/domains/brownten.com/public_html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php\",
            \"line\": 167,
            \"function\": \"handle\",
            \"class\": \"Illuminate\\\\Foundation\\\\Http\\\\Middleware\\\\ConvertEmptyStringsToNull\",
            \"type\": \"->\"
        },
        {
            \"file\": \"/home/u620909294/domains/brownten.com/public_html/vendor/laravel/framework/src/Illuminate/Foundation/Http/Middleware/TransformsRequest.php\",
            \"line\": 21,
            \"function\": \"Illuminate\\\\Pipeline\\\\{closure}\",
            \"class\": \"Illuminate\\\\Pipeline\\\\Pipeline\",
            \"type\": \"->\"
        },
        {
            \"file\": \"/home/u620909294/domains/brownten.com/public_html/vendor/laravel/framework/src/Illuminate/Foundation/Http/Middleware/TrimStrings.php\",   
            \"line\": 40,
            \"function\": \"handle\",
            \"class\": \"Illuminate\\\\Foundation\\\\Http\\\\Middleware\\\\TransformsRequest\",
            \"type\": \"->\"
        },
        {
            \"file\": \"/home/u620909294/domains/brownten.com/public_html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php\",
            \"line\": 167,
            \"function\": \"handle\",
            \"class\": \"Illuminate\\\\Foundation\\\\Http\\\\Middleware\\\\TrimStrings\",
            \"type\": \"->\"
        },
        {
            \"file\": \"/home/u620909294/domains/brownten.com/public_html/vendor/laravel/framework/src/Illuminate/Foundation/Http/Middleware/ValidatePostSize.php\",
            \"line\": 27,
            \"function\": \"Illuminate\\\\Pipeline\\\\{closure}\",
            \"class\": \"Illuminate\\\\Pipeline\\\\Pipeline\",
            \"type\": \"->\"
        },
        {
            \"file\": \"/home/u620909294/domains/brownten.com/public_html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php\",
            \"line\": 167,
            \"function\": \"handle\",
            \"class\": \"Illuminate\\\\Foundation\\\\Http\\\\Middleware\\\\ValidatePostSize\",
            \"type\": \"->\"
        },
        {
            \"file\": \"/home/u620909294/domains/brownten.com/public_html/vendor/laravel/framework/src/Illuminate/Foundation/Http/Middleware/PreventRequestsDuringMaintenance.php\",
            \"line\": 86,
            \"function\": \"Illuminate\\\\Pipeline\\\\{closure}\",
            \"class\": \"Illuminate\\\\Pipeline\\\\Pipeline\",
            \"type\": \"->\"
        },
        {
            \"file\": \"/home/u620909294/domains/brownten.com/public_html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php\",
            \"line\": 167,
            \"function\": \"handle\",
            \"class\": \"Illuminate\\\\Foundation\\\\Http\\\\Middleware\\\\PreventRequestsDuringMaintenance\",
            \"type\": \"->\"
        },
        {
            \"file\": \"/home/u620909294/domains/brownten.com/public_html/vendor/fruitcake/laravel-cors/src/HandleCors.php\",
            \"line\": 52,
            \"function\": \"Illuminate\\\\Pipeline\\\\{closure}\",
            \"class\": \"Illuminate\\\\Pipeline\\\\Pipeline\",
            \"type\": \"->\"
        },
        {
            \"file\": \"/home/u620909294/domains/brownten.com/public_html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php\",
            \"line\": 167,
            \"function\": \"handle\",
            \"class\": \"Fruitcake\\\\Cors\\\\HandleCors\",
            \"type\": \"->\"
        },
        {
            \"file\": \"/home/u620909294/domains/brownten.com/public_html/vendor/laravel/framework/src/Illuminate/Http/Middleware/TrustProxies.php\",
            \"line\": 39,
            \"function\": \"Illuminate\\\\Pipeline\\\\{closure}\",
            \"class\": \"Illuminate\\\\Pipeline\\\\Pipeline\",
            \"type\": \"->\"
        },
        {
            \"file\": \"/home/u620909294/domains/brownten.com/public_html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php\",
            \"line\": 167,
            \"function\": \"handle\",
            \"class\": \"Illuminate\\\\Http\\\\Middleware\\\\TrustProxies\",
            \"type\": \"->\"
        },
        {
            \"file\": \"/home/u620909294/domains/brownten.com/public_html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php\",
            \"line\": 103,
            \"function\": \"Illuminate\\\\Pipeline\\\\{closure}\",
            \"class\": \"Illuminate\\\\Pipeline\\\\Pipeline\",
            \"type\": \"->\"
        },
        {
            \"file\": \"/home/u620909294/domains/brownten.com/public_html/vendor/laravel/framework/src/Illuminate/Foundation/Http/Kernel.php\",
            \"line\": 142,
            \"function\": \"then\",
            \"class\": \"Illuminate\\\\Pipeline\\\\Pipeline\",
            \"type\": \"->\"
        },
        {
            \"file\": \"/home/u620909294/domains/brownten.com/public_html/vendor/laravel/framework/src/Illuminate/Foundation/Http/Kernel.php\",
            \"line\": 111,
            \"function\": \"sendRequestThroughRouter\",
            \"class\": \"Illuminate\\\\Foundation\\\\Http\\\\Kernel\",
        {
            \"file\": \"/home/u620909294/domains/brownten.com/public_html/public/index.php\",
            \"line\": 52,
            \"function\": \"handle\",
            \"class\": \"Illuminate\\\\Foundation\\\\Http\\\\Kernel\",
            \"type\": \"->\"
        },
        {
            \"file\": \"/home/u620909294/domains/brownten.com/public_html/index.php\",
            \"line\": 21,
            \"function\": \"require_once\"
        }
    ]
}", "_responseType": "", "_sent": true, "_subscriptions": [], "_timedOut": false, "_trackingName": "unknown", "_url": "https://brownten.com/api/order/insert", "readyState": 4, "responseHeaders": {"access-control-allow-origin": "*", "cache-control": "no-cache, private", "content-security-policy": "upgrade-insecure-requests", "content-type": "application/json", "date": "Tue, 14 Mar 2023 09:00:13 GMT", "platform": "hostinger", "server": "LiteSpeed", "vary": "Accept-Encoding", "x-powered-by": "PHP/7.4.33", "x-ratelimit-limit": "60", "x-ratelimit-remaining": "58"}, "responseURL": "https://brownten.com/api/order/insert", "status": 500, "timeout": 0, "upload": {}, "withCredentials": true}, "status": 500, "statusText": undefined}