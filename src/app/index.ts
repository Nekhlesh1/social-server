import express from "express";
import { ApolloServer } from "@apollo/server";
import {expressMiddleware} from '@apollo/server/express4'


export async function initializeServer() 
{
    const app = express();
    app.use(express.json())

    const graphqlServer = new ApolloServer<any>({
        typeDefs : `
        type Query {
            sayHello: String
            sayHelloToMe(name : String!) : String
        }
        
        `,
        resolvers: 
        {
            Query : {
                sayHello: () => `Hello From GraphQL server`,
                sayHelloToMe : (parent : any, {name} : {name : string}) => `Hey ${name}`
            }
        },
    })
    await graphqlServer.start();
    app.use('/graphql', expressMiddleware(graphqlServer))
    return app ;    
}
