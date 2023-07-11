import {ApolloServer, gql} from 'apollo-server';
import User from "./models/user";
import Bet from "./models/bet";
import * as dotenv from 'dotenv';
import {QueryTypes} from "sequelize";
import {sequelize} from "./databse";

const typeDefs = gql`
  type User {
    id: Int!
    name: String!
    balance: Float!
  }
  type Bet {
    id: Int!
    userId: Int!
    betAmount: Float!
    chance: Float!
    payout: Float!
    win: Boolean!
  }
  type Query {
    getUser(id: Int!): User
    getUserList: [User!]!
    getBet(id: Int!): Bet
    getBetList: [Bet!]!
    getBestBetPerUser(limit: Int!): [Bet!]!
  }
  type Mutation {
    createBet(userId: Int!, betAmount: Float!, chance: Float!): Bet
  }
`;
type BestBet = {
    userId: number;
    maxBet: number;
};
const resolvers = {
    Query: {
        getUser: (_, {id}) => User.findByPk(id),
        getUserList: () => User.findAll(),
        getBet: (_, {id}) => Bet.findByPk(id),
        getBetList: () => Bet.findAll(),
        getBestBetPerUser: async (_, {limit}) => {
            const bestBets: BestBet[] = await sequelize.query(`
                SELECT "userId", MAX("betAmount") as "maxBet"
                FROM "bets"
                WHERE "win" = true
                GROUP BY "userId"
                ORDER BY "maxBet" DESC
                LIMIT :limit
            `, {
                replacements: {limit},
                type: QueryTypes.SELECT
            });

            return Promise.all(bestBets.map(async (bestBet: BestBet) => {
                return await Bet.findOne({
                    rejectOnEmpty: false,
                    where: {
                        userId: bestBet.userId,
                        betAmount: bestBet.maxBet,
                        win: true
                    }
                });
            }));
        }
    },
    Mutation: {
        createBet: async (_, {userId, betAmount, chance}) => {
            const payout = betAmount * (100 / chance);
            const randomNumber = Math.random() * 100
            const win = randomNumber < chance;

            const user: User = await User.findByPk(userId);
            if (win) {
                user.balance += payout;
            } else {
                user.balance -= betAmount;
            }
            await user.save();

            return Bet.create({
                userId,
                betAmount,
                chance,
                payout,
                win,
            });
        },
    }
};

dotenv.config();
const server = new ApolloServer({typeDefs, resolvers});
server.listen().then(({url}) => {
    console.log(`Server ready at ${url}`);
});
