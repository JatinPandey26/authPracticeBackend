import express from 'express'
import {connect} from './database.js'
import dotenv from 'dotenv' 
import router from './Routes/auth.js';
import cookieParser from 'cookie-parser';
const app = express();
 
dotenv.config({
    path: './.env'
})

connect();

app.use(express.json());

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/',router)


app.get('/', (req, res) => {
  res.send('Hello World!');
});



app.listen(4000, () => {
  console.log('Example app listening on port 4000!');
}); 