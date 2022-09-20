
### Initial setup
1. Duplicate the `.env.example` as `.env`
1. Create a MongoDB instance at `https://www.mongodb.com/cloud`
1. Select Connect > Connect your application, and copy the connection string
1. Paste this connection string into `/api/.env` under `DB_ROUTE`
1. Run `yarn install` in the base directory

### Run the api
1. Run `yarn start` in the base directory
1. The API is then accessible at `https://localhost:3001/api/`
