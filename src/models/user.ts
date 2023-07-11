import { sequelize } from '../databse';
import {DataTypes, Model} from "sequelize";

class User extends Model {
    public id!: number;
    public name!: string;
    public balance!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: new DataTypes.STRING(128),
        allowNull: false,
    },
    balance: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    tableName: "users",
    sequelize,
});

export default User;
