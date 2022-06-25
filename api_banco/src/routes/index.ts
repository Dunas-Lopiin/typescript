import Owner from './owner';
import Account from './account';
import express from 'express';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(Owner);
app.use(Account);

export default app;