# Tech interview
Tech project for the front-end interview process.

---

## Context
You are a software developer at Chance. The company is growing fast and need a solid system to track bugs into the main application. The Operational team and the Product team should be able to declare and keep track of the bug resolution done by the Tech team.

You are in charge of delivering a new interface to help people to report bugs. A back-end guy has already prepared a small HTTP API and a designer crafted a mockup for you.

## Walkthrough
**User story**

- A visitor can register (to become a User)
- A visitor can login (to become a User)

- A user can list all reports
- A user can list all his "assigned to" reports
- A user can list all the reports he declared
- A User can CRUD a report
- A User can comment a report

## Resources
We recommend you to use [create-react-app](https://github.com/facebookincubator/create-react-app) to avoid coding the initial boilerplate.

### HTTP API
We develop for you a tiny HTTP API. You can find it into the `api` directory.

In order to run it:

```
$ cd api
$ npm install
$ npm run dev
```

Dev. server listen on `localhost:8000` by default.

**The API documentation** is provided into the `documentation` directory — you may import the 2 .json files into [Postman](https://www.getpostman.com/).

### Sketch mockup
Into the `documentation` directory, you'll also find the Sketch file you have to use for building the application interfaces.

By using the export all function, you'll have access to the static assets required for the test.

## Required Technologies
- ES6 or ES7
- ReactJS
- Redux / Flux / RX

### Nice to have
- SCSS / Styled JSX
- Auth management on browser refresh
- Few basics unit tests using Jest / Mocha

## Compatibility
We assume this tool is used internally — it should run on Chrome latest.

## Evaluation
This is a non-exaustive list of the aspects that can be evaluated on your code:

- Global architecture
- Component logic
- CSS strategy
- State management
- Node modules choice and usage
- Babel and WebPack approaches
- Test strategy
- Commit description

The most important aspect is the fidelity of your work in front of the problematic. We prefer you don't cover all the features but provide some of its that work perfectly.

## Usage
- Start a new git repository
- Commit as often as possible, and try to be explicit in your commit descriptions
- Add a small description of your solution in the README.md of your repository — especially your technical choices.
- Run `git bundle create YOURNAME.bundle HEAD`
- Send your bundle file via email to **tech-interview@chance.co**

## Delivery
We should be able to run your application by typing:

```
$ cd front-end
$ npm install
$ npm run build
$ npm start
```

**NB 1:** If you change or add some extra features/scripts. Please write down your instructions at the end of this file.

**NB 2:** As you can guess here, your code should be executable in production by Node after a build. We consider Node 6.10 as the standard distribution for this test.

**Feel free to contact us if you have questions about those instructions.
Good luck!**

---
