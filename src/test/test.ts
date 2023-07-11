import {ApolloServer, gql} from 'apollo-server';
import {resolvers, typeDefs} from '../server';
import {sequelize, setupDatabase} from "../databse";

const GET_USER = gql`
  query getUser($id: Int!) {
    getUser(id: $id) {
      id
      name
      balance
    }
  }
`;

const GET_USER_LIST = gql`
  query {
    getUserList {
      id
      name
      balance
    }
  }
`;

const GET_BET = gql`
  query getBet($id: Int!) {
    getBet(id: $id) {
      id
      userId
      betAmount
      chance
      payout
      win
    }
  }
`;

const GET_BET_LIST = gql`
  query {
    getBetList {
      id
      userId
      betAmount
      chance
      payout
      win
    }
  }
`;

const GET_BEST_BET_PER_USER = gql`
  query getBestBetPerUser($limit: Int!) {
    getBestBetPerUser(limit: $limit) {
      id
      userId
      betAmount
      chance
      payout
      win
    }
  }
`;

const CREATE_BET = gql`
  mutation createBet($userId: Int!, $betAmount: Float!, $chance: Float!) {
    createBet(userId: $userId, betAmount: $betAmount, chance: $chance) {
      id
      userId
      betAmount
      chance
      payout
      win
    }
  }
`;

function createServer() {
    return new ApolloServer({
        typeDefs,
        resolvers,
    });
}

describe('API test', () => {
    let server;

    beforeAll(async () => {
        await setupDatabase();
        server = createServer();
    });

    afterAll(async () => {
        await server.stop();
        await sequelize.close();
    });


    it('fetches single user', async () => {
        const response = await server.executeOperation({ query: GET_USER, variables: { id: 1 } });
        expect(response).toMatchSnapshot();
    });

    it('fetches user list', async () => {
        const response = await server.executeOperation({ query: GET_USER_LIST });
        expect(response).toMatchSnapshot();
    });

    it('fetches single bet', async () => {
        const response = await server.executeOperation({ query: GET_BET, variables: { id: 1 } });
        expect(response).toMatchSnapshot();
    });

    it('fetches bet list', async () => {
        const response = await server.executeOperation({ query: GET_BET_LIST });
        expect(response).toMatchSnapshot();
    });

    it('fetches best bets per user', async () => {
        const response = await server.executeOperation({ query: GET_BEST_BET_PER_USER, variables: { limit: 5 } });
        expect(response).toMatchSnapshot();
    });

    it('creates a bet', async () => {
        const response = await server.executeOperation({
            query: CREATE_BET,
            variables: { userId: 1, betAmount: 500, chance: 0.5 }
        });
        expect(response).toMatchSnapshot();
    });
});
