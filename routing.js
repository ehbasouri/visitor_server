const express = require('express');
const register = require('./controlers/user.controller');
// const Controller = require('./controlers/controlers');
// const validateRequest = require('./middleware/validation.request')
const apiRouter = express.Router();
// const Minio = require('minio');
// const validate = require('express-validation');

// minioClient = new Minio.Client({
//     endPoint: process.env.MINIO_SERVER,
//     port: Number(process.env.MINIO_PORT),
//     useSSL: false,
//     accessKey: process.env.JOB_ACCESS_KEY,
//     secretKey: process.env.JOB_SECRET_KEY
// });

apiRouter.post('/register',  register);
// apiRouter.delete('/product/:id', Controller.deleteProduct);
// apiRouter.put('/product/:id', validateRequest.checkProduct, validateRequest.productValidator, Controller.updateProduct);
// apiRouter.get('/product/:id', Controller.getProductById);
// apiRouter.get('/userproducts/:page', Controller.getProductByUserId);
// apiRouter.post('/category', Controller.createCategory);
// apiRouter.get('/category/:parId', Controller.getCategoryByparId);
// apiRouter.get('/category', Controller.getCategoryByparId);
// apiRouter.post('/productToPost', validate(validateRequest.productToPostValidator), Controller.productToPost);
// apiRouter.post('/product/image/:imageName/:product/:fromBytes/:mediaIndex/:lastFile/:width/:height', Controller.uploadProductImage);
// apiRouter.post('/product/video/:videoName/:product/:fromBytes/:mediaIndex/:lastFile/:width/:height', Controller.uploadProductVideo);
 
module.exports = apiRouter;
