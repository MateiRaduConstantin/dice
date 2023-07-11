"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const server_1 = require("../src/server");
const GET_USER = (0, apollo_server_1.gql) `
    query getUser($id: Int!) {
        getUser(id: $id) {
            id
            name
            balance
        }
    }
`;
const GET_BEST_BET_PER_USER = (0, apollo_server_1.gql) `
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
function createServer() {
    return new apollo_server_1.ApolloServer({
        typeDefs: server_1.typeDefs,
        resolvers: server_1.resolvers,
    });
}
describe('Queries', () => {
    let server;
    beforeAll(() => {
        server = createServer();
    });
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield server.stop();
    }));
    it('fetches single user', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield server.executeOperation({ query: GET_USER, variables: { id: 1 } });
        expect(response).toMatchSnapshot();
    }));
    it('fetches best bets per user', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield server.executeOperation({ query: GET_BEST_BET_PER_USER, variables: { limit: 5 } });
        expect(res).toMatchSnapshot();
    }));
});
