import { MakeTransfer } from '../controller';
import { Router } from 'express';

const route = Router();

route.route('/transfer')
    .post(new MakeTransfer().handle.bind(new MakeTransfer()));



export default route;