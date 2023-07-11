import { sequelize } from '../databse';
import {DataTypes, Model} from "sequelize";

class Bet extends Model {
    public id!: number;
    public userId!: number;
    public betAmount!: number;
    public chance!: number;
    public payout!: string;
    public win!: boolean;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}


Bet.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    betAmount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    chance: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    payout: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    win: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
}, {
    sequelize,
    tableName: 'bets',
});

export default Bet;
