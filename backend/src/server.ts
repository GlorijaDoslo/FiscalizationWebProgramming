import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRouter from './routers/user.routes';
import cipherRouter from './routers/cipher.routes';
import registerRouter from './routers/register.routes';
import warehouseRouter from './routers/warehouse.routes';
import accountRouter from './routers/account.routes';
import companyRouter from './routers/company.routes';
import itemRouter from './routers/item.routes';
import categoryRouter from './routers/category.routes';
import tableRouter from './routers/table.routes';
import receiptRouter from './routers/receipt.routes';

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/PIAProjectDB');
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log('db connected');
})

const router = express.Router();

router.use('/users', userRouter);
router.use('/codebook', cipherRouter);
router.use('/cashRegisters', registerRouter);
router.use('/warehouses', warehouseRouter);
router.use('/businessAccounts', accountRouter);
router.use('/company', companyRouter);
router.use('/items', itemRouter);
router.use('/categories', categoryRouter);
router.use('/tables', tableRouter);
router.use('/receipts', receiptRouter);

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));