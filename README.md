# Cogsworth Code Challenge



## The Challenge

We would like you to add shift functionality to this base application.

- Click a button to "start shift"
  - Track the current time and location of the user
  - Show a timer for how long the current shift has been active
  - This should be persisted to the database incase user loses connection or refreshes
- Click a button to "end shift"
- Show all previous shifts in list


### What we are looking for

- Record yourself doing the challenge. Explain your thought process as you go
- Simplicity - Avoid over engineering things, we write code for humans



## Getting Started

A few things you should be familiar with before jumping into the challenge.


### Stack

- typescript 4.6
- nextjs 12.1
- next-auth 4.2
- prisma 3.x
- postgresql


### Prerequisites

Before you get started, ensure you've setup the following:

1. Checkout the code locally
1. Install all dependencies (`yarn install`)
1. Ensure you have a running postgresql database to connect to
1. Set your credentials in `.env` (see `.env.sample` for required data)
1. Migrate + seed your database (`npx prisma migrate dev`)
1. Run the application (`yarn dev`)
1. Verify you get a user listed on http://localhost:3000/api/users
