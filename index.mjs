import express from 'express'
import  Auth_routes from './routes/Auth_routes.js'
import  Book_routes from './routes/book_routes.js'
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';


console.log(Auth_routes);


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
app.use(cors());

// here we have to connect database 

app.use(express.json());
// app.use(cookieParser());
// Define routes

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.use('/api/auth', Auth_routes);
app.use('/api/books',Book_routes);

// Start the server
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});