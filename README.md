# Book Shook

Visit [Book Shook Website](book-shook.vercel.app) for demo.

I built this application for personal use. I always had issues with web brower by opening hundreds of tabs. It slows down my PC's performance. So i built this web based bookmarks manager to keep my bookmarks in a safe place. Whether i am on my laptop, mobile or PC i can always have my bookmarks on click away.

## Tech Stack

I am using nuxt 3 for both frontend and backend. I am using Neondb postgres database with prisma ORM. And tailwind for styling.

## Testing

for testing you can visit my book-shook website and enter following to login.

```bash
# Username
test

# Password
test
```

## Setup

If you want to deploy this project for your own use, Then follow the instructions below.

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Install prisma

You also need to generate prisma client. And add database variables in .env file.

```bash
# Prisma
npx prisma generate

# Create .env file in root directory and add
DATABASE_URL= your database url
DIRECT_URL= your direct url
```

That's it. Done! Happy coding 😎
