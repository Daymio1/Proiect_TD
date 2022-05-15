const express=require('express');
const { sequelize } = require('./models');


const app=express();
app.use(express.json())

app.use('/login', require('./routes/auth'))
app.use('/insertUser', require('./routes/userInsert'))

app.listen({port: 5000}, async () => {
        console.log('Server running on port 5000')
        await sequelize.sync({ alter: true });
        console.log('Database synced')
    }
)