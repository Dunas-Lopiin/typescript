import { SearchBalance } from '../controller';
import { Router } from 'express';

const route = Router();

route.route('/balance')
    .post(new SearchBalance().handle.bind(new SearchBalance()));



export default route;