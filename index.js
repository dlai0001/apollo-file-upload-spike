const { ApolloServer, gql } = require('apollo-server');

// The GraphQL schema in string form
const typeDefs = gql`    
    type FileInfo {
        filename: String!
    }

    type Query {
        Hello: String!
    }
    type Mutation {
        UserAvatarFileUpload(file: Upload!): FileInfo!
    }
`;

// The resolvers
const resolvers = {
    Query: {
        Hello() {
            return 'Hello world';
        }
    },
    Mutation: {
        async UserAvatarFileUpload(_parent, { file }, ...args) {
            const { stream, filename, mimetype, encoding } = await file;

            // 1. Validate file metadata.

            // 2. Stream file contents into cloud storage:
            // https://nodejs.org/api/stream.html

            // 3. Record the file upload in your DB.
            // const id = await recordFile( … )
            debugger;
            return {
                filename,
            };
        }
    },
};

const server = new ApolloServer({ typeDefs, resolvers});

server.listen({
    port: 8000,
})
.then(()=> {
    console.log('Listening on  http://localhost:8000/graphql');
});