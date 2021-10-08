# ![Crew Launcher](https://github.com/jon-choi/CrewLauncher/blob/master/Documents/Crew%20Launcher%20logo%202.png?raw=true)

Crew Launcher is a brand new, cutting-edge application that allows users to seamlessly manage their businesses with the ability to quote and book new jobs on-site.

## Setup

Setup is quite simple! All you have to do in run `npm install` in both the react and express directories.

## Database Setup

Go into `psql` on your VM and create your database:

```sh
  psql -U vagrant -d template1

  CREATE ROLE 'example_name' WITH LOGIN password 'example_password'
  CREATE DATABASE 'db_name' OWNER 'example_name'
  ```

Create an .env file inside the express directory and create your own credentials:

```sh
  DB_HOST=
  DB_USER=
  DB_PASS=
  DB_NAME=
  DB_PORT=5432
  ```
We used Knex to build our PostgreSQL database. Simply run these commands when building your migrations and seeds respectively:

```sh
  knex migrate:make 'migration_name'
  knex seed:make 'seed_name'
  
  knex migrate:rollback
  knex migrate:latest
  knex seed:run
  ```
  * You may have to run `knex migrate:rollback` a few more times in order to reach the base migration.

## Running the Project

Now that everything has been setup, simply run `npm start` inside the react directory, and `npm run go` inside the express directory. Now you're ready to blast off!

## Screenshots of Final Product

      Overview of dispatcher side creating a package
![]()