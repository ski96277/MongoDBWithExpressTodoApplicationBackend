const  express = require('express');
const mongoose = require('mongoose');
const todoHandler = require('./routehandler/todoHandler')


// express app initialization
const app = express();
app.use(express.json());

///database connection
mongoose.connect("mongodb://localhost/todos",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>console.log("Connection success"))
.catch(()=>console.log(err));

//application routes
app.use('/todo',todoHandler);

app.get('/',(req, res) => {
        console.log("server get ");

        res.send("response from get localhost method");
    });

app.listen(4000,function(){
console.log("server listen 4000 start");
});