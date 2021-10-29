var express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

var Schema = require('mongoose').Schema
const userSchema = Schema({
    type: String,
    id: String,
    name: String,
    detail: String,
    quantity: Number,
    price: Number,
    file: String,
    img: String
}, {
    collection: 'products'
})

let Product
try {
  Product = mongoose.model('products')
} catch (error) {
  Product = mongoose.model('products', userSchema)
}


const addProduct = (productData) => {
    return new Promise ((resolve, reject) => {
        var new_product = new Product(
          productData
        )
        new_product.save((err, data) => {
            if(err){
                reject(new Error('Cannot insert product to DB!'))
            }else{
                resolve({message: 'product added sccessfully'})
            }
        })
    })
}


const getProduct = () => {
  return new Promise ((resolve, reject) => {

      Product.find({},(err, data) => {
          if(err){
              reject(new Error('Cannot get product!'))
          }else{
            if(data){
              resolve(data)
            }
              reject('Cannot get product!')
          }
      })
  })
}
/*
router.route('/products/add')
  .post((req, res)=>{
    console.log('add');
    addProduct(req.body)
    .then(result=> {
      console.log(result);
      res.status(200).json(result)
    })
    .catch(err=> {
      console.log(err);
    })
})
*/
router.route('/products/add')
    .post((req, res) => {
      console.log('add');
      addProduct(req.body)
        .then(result => {
          console.log(result);
          res.status(200).json(result)
        })
        .catch(err=> {
          console.log(err);
        })

    })

router.route('/products/get')
  .get((req, res)=>{
    console.log('get');
    getProduct()
    .then(result=> {
      console.log(result);
      res.status(200).json(result)
    })
    .catch(err=> {
      console.log(err);
    })
})

module.exports = router
