const express=require('express');
const { sequelize } = require('./models');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');


const app=express();
app.use(express.json())


//app.use(credentials);
app.use((req,res, next)=>{
    res.setHeader('Access-Control-Allow-Origin',"http://localhost:5000");
    res.setHeader('Access-Control-Allow-Headers',"*");
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

// middleware for cookies
app.use(cookieParser());

//TODO Routes
app.use('/login', require('./routes/auth'))
app.use('/register', require('./routes/register'))
app.use('/refresh', require('./routes/refresh'))
app.use('/logout', require('./routes/logout'))

app.use(verifyJWT);
app.use('/changePassword', require('./routes/changePassword'))


app.listen({port: 5000}, async () => {
        console.log('Server running on port 5000')
        await sequelize.sync({ alter: true });
        console.log('Database synced')
    }
)