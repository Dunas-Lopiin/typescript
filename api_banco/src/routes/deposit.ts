import { MakeDeposit } from '../controller';
import { Router } from 'express';

const route = Router();

route.route('/deposit')
    .post(new MakeDeposit().handle.bind(new MakeDeposit()));



export default route;