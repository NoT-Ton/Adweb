var express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

//models
var Schema = require('mongoose').Schema
const wishlistSchema = Schema({
  owner: {type: mongoose.Schema.Types.ObjectId,ref:'users'},
  product: {type: mongoose.Schema.Types.ObjectId,ref:'products'},
}, {
    collection: 'wishlist'
})

let Wishlist
try {
  Wishlist = mongoose.model('wishlist')
} catch (error) {
  Wishlist = mongoose.model('wishlist', wishlistSchema)
}


const addwishlist = (data) => {
  console.log('start')
  console.log(data.owner)
  console.log(data.product)
  console.log('end of data')
  return new Promise ((resolve, reject) => {
      console.log('hello from for')
      var new_wishlist  = new Wishlist ({
          _id: mongoose.Types.ObjectId(),
          owner: data.owner,
          product: data.product,
      });
      new_wishlist.save((err, data) => {
          if(err){
              reject(new Error('Cannot insert wishlist to DB!'));
          }else{
              resolve({massage: 'wishlist successfully'});
          }
      });


  });
}

const getWishlist = (uid) => {
  console.log('hello from GET HIT')
  console.log(uid)
  return new Promise((resolve, reject) => {
    Wishlist.find({owner:uid},(err, data) => {
          console.log(data)
          if(data){
              resolve(data)
              //reject(new Error('Cannot get User Data'))
          }
          else{
              reject(new Error('Cannot get User Data'))
          }
      })

  })
}

router.route('/add/:id')
.post((req, res) => {
    console.log('start')
    console.log(req.body)
    console.log('end')
    //const i  = 0;
    const cout = req.body.length
    console.log(cout)
        const payload = {
         owner: req.params.id,
         product: req.body.product,
        }
        console.log(payload)
        addwishlist(payload)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                console.log(err);
            })
            console.log('End');
    });

    router.route('/get/:id')
    .get((req,res) => {
        const uid = req.params.id
        console.log(uid)
        getWishlist(uid)
        .then(result => {
        })
        .catch(err => {
            console.log(err)
        })
        Wishlist.find({owner:uid}).populate('product').exec()
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
        })
    });

module.exports = router;
