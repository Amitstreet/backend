import express from 'express'
import  Auth_routes from './routes/Auth_routes.js'
import  Book_routes from './routes/book_routes.js'
import Location_routes from './routes/location_routes.js'
import profile_update_routes  from './routes/profile_update_routes.js'
import serch_cat_routes  from './routes/serch_cat_routes.js'
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import User from './Modal/user_modal.js'

console.log("yes")
mongoose
  .connect("mongodb+srv://Ami_12343:OdwQ9RZo17MD0Ufl@cluster0.s7xyiqz.mongodb.net/swap?retryWrites=true&w=majority")
  .then(() => {
    console.log('MongoDb is connected');
  })
  .catch((err) => {
    console.log(err);
  });
  
  
// Create an Express application
const app = express();

// here we have to connect database 

app.use(express.json());
app.use(cookieParser());






const corsOptions = {
  origin: 'https://books-swap.vercel.app/',
  credentials: true,
};

app.use(cors(corsOptions));
// Define routes

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.use('/api/auth', Auth_routes);
app.use('/api/books',Book_routes);
app.use('/api/locations', Location_routes);
app.use('/api/edit',profile_update_routes)
app.use('/api/filter',serch_cat_routes)






// Start the server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});