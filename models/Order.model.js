var poolConnection = require('../models/pool.connection');

exports.makeOrder = (order, user, callback) => {
  poolConnection.getConnection((err, connection) => {
    if(err) {
      console.log("Loi 36456rhfhe");
      return callback(err, null);
    }
    console.log("orderInfo: ", order);
    const queryString = "INSERT INTO `ecommerce`.`order` (`name`, `totalPrice`, `shipping_Address`, `user_idUser`, `store_idstore`, `status`, `create_Date`, `phone`) VALUES (?, ?, ?, ?, ?, ?, ?, ?);"
    const params = [
      order.customerInfo.name,
      order.totalPrice,
      order.customerInfo.address,
      user.idUser,
      order.storeId,
      0,
      order.createDate,
      order.customerInfo.phone
    ];
    connection.query({sql: queryString}, params, (err, results, fields) => {
      if(err) {
        console.log(err);
      }
      console.log('results.insertId: ', results.insertId);
      order.items.forEach((item) => {
        makeOrder_Store_Product(results.insertId, order.storeId, item.idProduct, item.quantity);
      })
    })
    connection.release();
  })
}

const makeOrder_Store_Product = (order_idorder, store_product_store_idstore, store_product_product_idProduct, quantity) => {
  console.log('aaaaaaaa: ', order_idorder, store_product_store_idstore, store_product_product_idProduct, quantity);
  poolConnection.getConnection((err, connection) => {
    if(err) {
      console.log("Loi 36456rhfhe");
      return callback(err, null);
    }
    const queryString = "INSERT INTO `ecommerce`.`order_has_store_product` (`order_idorder`, `store_product_store_idstore`, `store_product_product_idProduct`, `quantity`) VALUES (?, ?, ?, ?);";
    const params = [
      order_idorder,
      store_product_store_idstore,
      store_product_product_idProduct,
      quantity
    ]
    connection.query({sql: queryString}, params, (err, results, fields) => {
      if(err) {
        console.log(err);
      }

    })
    connection.release();
  })
}

exports.getLichSuMuaHang = (idUser, callback) => {
  poolConnection.getConnection((err, connection) => {
    if(err) callback(err, null);
    const queryString = "SELECT * FROM ecommerce.order od, ecommerce.order_has_store_product oh, ecommerce.store_product st_pr, ecommerce.store st, ecommerce.product pr, ecommerce.imageproduct ip, ecommerce.brand br "
    + " where od.user_idUser = ? "
    + " AND od.idorder = oh.order_idorder "
    + " AND oh.store_product_product_idProduct = st_pr.product_idProduct "
    + " AND oh.store_product_store_idstore = st_pr.store_idstore "
    + " AND oh.store_product_store_idstore = st.idstore "
    + " AND oh.store_product_product_idProduct = pr.idProduct "
    + " AND pr.idProduct = ip.product_idProduct "
    + " AND pr.brand_idbrand = br.idbrand; ";
    const params = [idUser];
    const templateOrders = [
      {
        id: '',
        totalPrice: '',
        createDate: '',
        status: '',
        shippingAddress: '',
        phone: '',
        nameCustomer: '',
        products: [
          {
            id: '',
            store: {
              id: '',
              name: ''
            },
            brand: {
              id: '',
              name: ''
            },
            name: '',
            price: '',
            quantity: '',
            imageLink: '',

          }
        ]
      }
    ]
    connection.query({sql: queryString, nestTables: true}, params, (err, results) => {
      if(err) return callback(err, null);
      if(!results[0]) return callback(null, []);
      const idOrders = [];
      results.forEach((result) => {
        if(idOrders.indexOf(result.od.idorder) == -1) idOrders.push(result.od.idorder);
      })
      const orders = [];
      idOrders.forEach((idOrder) => {
        const order = { id: idOrder, products: [] };
        results.forEach((result) => {
          if(idOrder == result.od.idorder) {
            order.totalPrice = result.od.totalPrice;
            order.createDate = result.od.create_Date;
            order.status = result.od.status;
            order.shippingAddress = result.od.shipping_Address;
            order.phone = result.od.phone;
            order.nameCustomer = result.od.name;
            order.store = {
              id: result.st.idstore,
              name: result.st.name
            },
            order.products.push({
              id: result.pr.idProduct,
              name: result.pr.name,
              price: result.st_pr.price,
              quantity: result.oh.quantity,
              imageLink: result.ip.link_Image,
              store: {
                id: result.st.idstore,
                name: result.st.name
              },
              brand: {
                id: result.br.idbrand,
                name: result.br.name
              }
            })
          }
        })
        // console.log("order: ", order);
        orders.push(order);
      })
      return callback(null, orders);
    })
    connection.release();
  })
}
