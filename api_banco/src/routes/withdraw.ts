import { MakeWithdraw } from '../controller';
import { Router } from 'express';

const route = Router();

route.route('/withdraw')
    .post(new MakeWithdraw().handle.bind(new MakeWithdraw()));



export default route;