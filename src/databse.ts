import {Sequelize} from 'sequelize';
import User from "./models/user";
import * as dotenv from 'dotenv'
dotenv.config()

export const sequelize = new Sequelize(process.env.DATABASE_URL, {dialect: 'postgres', host: 'localhost',});

sequelize.sync().then(async () => {

    const testUsers = [
        { name: 'John Doe', balance: 1000 },
        { name: 'Jane Doe', balance: 2000 },
        { name: 'Ancient User', balance: 3000 },
        { name: 'Dice Lover', balance: 4000 },
        { name: 'Radu Matei', balance: 10000 },
    ];

    for (const userData of testUsers) {
        const user = await User.create(userData);
        console.log(`Created user ${user.get('name')}`);
    }
}).catch(error => {
    console.log('Unable to create tables', error);
});