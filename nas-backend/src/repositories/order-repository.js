const CrudRepository = require('./crud-repository')
const { OrderModel } = require('../models')
const { ProductModel } = require('../models')
const { UserModel } = require('../models')

class OrderRepository extends CrudRepository {
    constructor() {
        super(OrderModel)
    }

    // check for the particular product stock is available or not
    async checkAvailabityAndUpdate(item,session) {
  const product = await ProductModel.findOneAndUpdate(
    {
      _id: item.product,
      "variant.color": item.color,
      "variant.size": item.size,
      "variant.stock": { $gte: item.quantity }
    },
    {
      $inc: { "variant.$.stock": -item.quantity }
    },
    { new: true,session }
  );

  return product;
}


    // change the order status by the admin
    async updateOrderStatus(orderId, orderStatus,{session}) {
        try {
          const order = await OrderModel.findByIdAndUpdate(orderId,
            { status: orderStatus },
            { new: true, runValidators: true,session }
        )
        if(!order) console.log("No Order Found")
        console.log("Inside Order Status Update repo:",order)
        return order
        } catch (error) {
          console.log(error)
          throw error
        }
    }

    // after creating order push that order into the user order array
    async addOrderToUser(orderId, userId,{session}) {
        console.log("ORDER REPO:::::: USER ID INSIDE ORDER REPO:", userId)
        console.log("ORDER REPO:::::: ORDER ID INSIDE ORDER REPO:", orderId)

        const user = await UserModel.findByIdAndUpdate(
            userId,
            { $push: { orders: orderId } },
            { new: true ,session }
        )
        console.log("UPDATES USER ORDER:", user)
        return user
    }

    async populateOrderDetails(orderId) {
      const orders = await OrderModel.find().populate('user')
      return orders
    }

    async userEmail(id) {
      const user = await UserModel.findById(id)
      return user.email
    }
}

module.exports = OrderRepository