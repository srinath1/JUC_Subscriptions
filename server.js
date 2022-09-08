const express =require( "express");
const mongoose =require( "mongoose");
const cors =require("cors");
const { readdirSync } = require("fs");
const auth=require('./controllers/auth')

const morgan = require("morgan");
require("dotenv").config();

const app = express();

// db
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log("DB Connection Error ", err));

// middlewares
app.use(express.json({ limit: "5mb" }));
app.use(
  cors({
    origin: [process.env.CLIENT_URL,'https://jucsubscriptions.netlify.app/'],
  })
);

// autoload routes
readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));
const path = require('path')

if(process.env.NODE_ENV==='production')
{

    app.use('/' , express.static('client/build'))

    app.get('*' , (req , res)=>{

          res.sendFile(path.resolve(__dirname, 'client/build/index.html'));

    })

}
// listen
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
