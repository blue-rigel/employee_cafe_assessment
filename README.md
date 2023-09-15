### Technical Stack

- FrontEnd - React JS
- Backend - Node JS
- DB - MYSQL
- ORM - Prisma

# Setup

- Update `backend/.env` => `DATABASE_URL`
  to the DB URL of your local setup
- Make sure you are running Node 18.x
- Run `npm install` on both front-end and backend folders
- From backend folder, run `npm run db:migrate` to deploy table structure
- From backend folder, run `npm run db:seed` to populate seed data

### Running the project

- Run `npm start` on backend folder to start backend at local port "3001"
- Run `npm start` on frontend folder to start frontend at local port "3000"
- Visit [Frontend](http://localhost:3000)
