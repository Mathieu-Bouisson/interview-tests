# Tech interview for [XXX]
Tech project for the back-end interview process.

## Context

You are a software developer at Chance and the Product Team ask you to deal with videos coming from the coaching process. Each candidate (invisible talent) go over an video call interview led by a coach. This interview is stored by the coach himself and he needs to upload it on our servers. You are in charge to develop this standalone brick.

## Walkthrough

Coach's story

- The coach can login on a web page
- The coach can choose a candidate in a static list
- The coach can upload the 1080p .mp4 video onto the system

After the upload:

- The system should export the incoming video into .ogv format
- The system should resize (for both .mp4 and .ogv) the videos to 720p and 480p
- The system should update the database with the available videos
- All of those operations should be asynchronous to allow concurrent execution

Web service

- An external web service should provide access to the list of candidates over an HTTP route

## Expected features

- Seed a coaches list (including at least email and password) from a json file to the database
- Seed a candidates list (including at least name and surname) from a json file to the database
- Auth logic to access the upload web page
- A form with a file uploader (considering the auth flow)
- Export logic as a cron like task (the trigger can be mocked by a npm script)
- A HTTP GET route on candidates protected by a static header token

## Suggested technologies
- ES6 or ES7
- NodeJS
- JWT
- Redis and/or MongoDB
- Mocha / Jasmine / Jest

## Evaluation
This is a non-exaustive list of the aspects that can be evaluated on your code:

- Code organization
- Overall readability
- Node modules choice and usage
- Babel and/or WebPack approaches
- Test strategy
- Commit description

The most important aspect is to give us your analysis of the problematic. We prefer you don't cover all the features but provide some of its that work perfectly.

## Delivery
We should be able to run your application by typing:

```
$ npm install
$ npm run build
$ npm start
```

**NB 1:** If you use a DB, let us know how to run it locally.

**NB 2:** As you can guess here, your code should be executable by Node after a build. We consider Node 6.10 as the standard distribution for this test.

For all cases, make a short description of your choices and instructions at the end of this README.

**Feel free to contact us if you have questions about those instructions.
Good luck!**

---
