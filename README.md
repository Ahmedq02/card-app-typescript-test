# Integrum ESG interview - Card App 🎴🃏

Simple card app created with Typescript Stack
Converted to a test from the [original](https://github.com/ThomiWidescreen/card-app-typescript)

## Prerequisites

NodeJS - if you don't already have it installed, check out [nvm](https://github.com/nvm-sh/nvm).

### Development set-up

If you don't have a favorite editor we highly recommend [VSCode](https://code.visualstudio.com).

Recommended VSCode extensions:

- [Prisma](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma)
- [Tailwind](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

# Instruction to candidates

Your assignment is to improve this application. At the moment the application is simple and can only create and remove todos.

Fork this project into your own on github

Clone it onto a machine with node and a development environment (we use VScode)
Follow the instructions below to run the back end and the front end.

Then make changes to:

- Add a dark mode. Create a settings dialog to set it - and change the styling to render a dark mode. Consider how the current setting is passed to the components (and describe it in your covering email)
- Add a scheduled date to the cards. This involves adding a column in the database, changing the backend service and changing the frontend card entry and display components
- Add tests to the backend. There are some clues [here](https://www.fastify.io/docs/latest/Guides/Testing/) and [here](https://jestjs.io/docs/using-matchers).

If you feel constrained by time (which is totally fine!), prioritize quality over quantity.

Email us the link to your repo when you're done. Please also include a short write up describing the rationale of the changes you have made.

# Features

- Mutiple Routes for each action.
- Local Backend Database
- You can View, Create, Update, Delete simple cards.

# Stack

## Front End

- React ⚛
- React Router DOM 🔀
- Tailwind CSS 🐦

## Back End

- Fastify 🚀
- Prisma ORM 🅿
- SQLite ▪

# Deploy

Git hooks are used to automatically format committed files. To setup the hooks run:

```bash
npm i
```

The front end works in port 3000 and the backend works in the port 3001.

## Back End

```bash
npm install

npm run prisma-setup

npm start
```

To have the backend restart when changes have been made to `.ts`, `.prisma` and `.sql` files:

Replace `npm start` with `npm run dev`

To run the tests:

```bash
npm run test
```

## Front End

```bash
npm install

npm start
```

To deploy a final build with static files:

```bash
npm run build

cd ./dist

npx serve -p 3000 -s
```
# Write Up

## Dark Mode

I developed a dark mode feature by using a new component DarkSwitch to trigger the style changes:
- First I created the component in the components subdirectory as a button that has an onChange event.
- I then made changes to the App.tsx file to make a new state darkMode which I could use to globally track the dark mode state. It is in the App.tsx since this is the top level file.
- The toggleDarkMode is used to set the dark mode to be the opposite of what it was.
- I then passed in darkMode and toggleDarkMode to the Navbar and then the DarkSwitch to use them to set the dark mode.
- Now that the button can set dark mode I made changes to the tailwind.config.js file to utilise the dark: class functionality, This way I can easily include dark mode alternative styles by adding a dark: prefix to any styles that have a parent component with the class dark.
- Finally I added conditional code to include the dark class in the top level section and then added all of the dark mode changes to the relevant components. This way dark is set globally depending on the darkMode state which is set by the DarkSwitch achieving the desired funcitonality.

## Scheduled Date

I addded a scheduled date field to the cards to come before the created at date:
- I first made changes to the schema.prisma file to add the scheduled field to the Entry model.
- After including the field I made the relevant changes to other files in the backend that utilised Entry to include the new field.
- I then created migrations and applied them to make the changes in the backend.
- Once the backend changes were done I made changes to the frontend route files. EditEntry and NewEntry were first changed to includde another input field for the scheduled date, similar to the input for the date created field.
- I then made changes to AllEntries to display the sceduled date. I reduced the size of the dates and added some text to help identify the different dates before styling them to improve positioning.
- Finally I added some tooltips by using hover styles to the pages for editing and creating cards so the user can tell what the dates reperesent. I decided to use the tooltips instead of static text just because the cards were already quite crowded so it improves readability.

## Testing

I added some tests to the backend to test the functionality of the application. Tests were added to the server.test.ts file and they include tests to test all of the successful CRUD operations while also testing the instances where the program is expected to fail. This includes testing status codes and expected response values.