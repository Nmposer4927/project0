import express from 'express';
import bodyparser from 'body-parser';
import { db } from './dao/db';
import { customerRouter } from './routers/customer-router'
import { productRouter } from './routers/product-router';
import { ordersRouter } from './routers/orders-router';

const app = express();

const port = process.env.port || 3001;
app.set('port', port);


 //   Middleware Registration
app.use(bodyparser.json());


// Router Registration
app.use('/customer', customerRouter);
app.use('/product', productRouter);
app.use('/orders', ordersRouter);


app.listen(port, () => {
    console.log(`Plant app is running at http://loca0lhost:${port}`);
});


