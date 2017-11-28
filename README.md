

# Feedback Email Campaign and Report Application

The overall project built in this course is a mass email sender, then collection of feedback from email and tabulating that data. 

1. Start node server `node index.js` from server directory.
* You have to restart node server when adding new routers (e.g. app.get)

2. Load `localhost:5000` in your browser.
---

## Flow of Application
- Assumption is that the email sent out is to collect feedback from users of a startup app (owned by the Admin/our client).

### 1. Admin signs up via Google OAuth
* Express server + MongoDB + PassportJS
** PassportJS makes OAuth side easier to set up, although it has it's own set of challenges.

### 2. Admin pays for email credits via stripe
* Stripe + MongoDB
** Stripe will handle everything around billing/payments, but again, has edge cases that can be challenging.
** We'll record payments from admin users in MongoDB database.

### 3. Admin creates a new 'campaign' (the survey for the email)
* React + Redux
** Whenever a user attempts to create a new campaign/survey 

### 4. Admin enters list of email recipients for the survey
* React + Redux + Redux Form
** When the user enters emails for the campaign, and details they want to collect

### 5. We send email to list of recipients/users.
* 3rd Party Email Provider

### 6. Recipients/users click on link in email to give feedback on the app in question.
* Email Provider + Express + Mongo
** Record the feedback provided by the users/recipients. 

### 7. We tabulate the response data/feedback
* Mongo + MongoDB
** Mongo to retrieve data, and MongoDB will have the feedback stored. 

### 8. Admin can see all survey responses.
* Mongo + React + Redux
** For the report of all the feedback, which we'll retrieve via Mongo.

---

#### MongoDB -> Express/Node API <--[HTTP Request (JSON)]--> React App

*React app will never talk directly to MongoDB database. Instead, we put the _Express API_ between React and MongoDB*
* Express API has a ton of business logic to take incoming requests from the React Application, pull info from MongoDB database, then to send that information back to React side of our app.
* *_Important!_* The Express API must exist between the React app and MongoDB. React and the MongoDB cannot communicate directly. 

---

## Installation/Setup
- new node project, then install express inside of it
-- package.json is hub of our project; central


# Definitions
*Node*: Javascript runtime used to execute code _OUTSIDE_ of the browser (traditionally Javascript was executed inside the browser). _Used simply to execute code outside of the browser; in some arbitrary environment, like my laptop, his desktop, etc._
* Runtime: In computer science, run time, runtime or execution time is the time during which a program is running, in contrast to other program lifecycle phases such as compile time, link time and load time.

*Express*: Library that uses the NodeJS runtime. IT IS NOT A STANDALONE THING. Library that runs in the Node runtime. Has helpers to make dealing with HTTP traffic easier. _Its a collection of functions or helpers for working with HTTP aspects of nodejs a little easier. It's not its own runtime. It just makes writing servers a little easier. Everything inside this express library, we could, in theory, implement from scratch using just node and plain javascript. But it's a helpful library that does that HTTP stuff for us._
* *Express.js (or simply Express)*: A web application framework for Node.js designed for building web applications and APIs. It is in fact the standard server framework for Node.js. _expressjs apps can be integrated with different databases_

---
![HTTP Request Diagram](https://www.dropbox.com/s/vf0lpjxevtrd9lz/Screenshot%202017-11-28%2002.05.02.png?dl=0)

When you run a server on your local machine, it is going to be listening for HTTP traffic on an individual, single port. It's like a door through which traffic like HTTP requests can be routed. 
Our browser can issue HTTP request to a specific port. We'll configure node and express to listen to traffic attempting to access a specific port. That inflow of information is listened for by node, then node hands it off to the express side of the application in a handoff. 
Express then looks at request and decides what logic in our application will respond to the incoming request.
* Route Handlers: used to handle HTTP requests asking for a specific service that we write for our specific application.
* Route handlers then process the request and generate a response, which gets sent back to the running node process. Then node creates a new response and hands it off to the incoming HTTP request?
_Summary: Underlying Node runtime listens for traffic on specific port. When some traffic comes in, it's then routed to the express side of our application. You and I route some logic that handles incoming requests and formulates and sends out a response that gets routed back to whoever made the original request._


---

## Repo Name: _fullstack-node-react_

Work for [Udemy Course: Node with React: Fullstack Web Development](https://www.udemy.com/node-with-react-fullstack-web-development/learn/v4/overview)

Instructor's [companion repo for the course](https://github.com/StephenGrider/FullstackReactCode)

---

### Course Resources: FullStackReact
<sup>(from [Google Doc by Instructor](https://docs.google.com/document/d/1yZ5sM5xTIxcv0LqMyj__vOWIXRri4TH_3lMu1qPBQjA/edit?ts=5a1cf79e#heading=h.kk1966kbedef))</sup>

* OFFICIAL COURSE REPO: https://github.com/StephenGrider/FullstackReactCode
* Link to download NodeJS Installer: https://nodejs.org/en/download/current/
* [Optional] Editor add-on to auto-format your JS: https://github.com/prettier/prettier
* [Optional] Blog Posts on React and other neat stuff: https://rallycoding.com/

## How to get help
* Udemy Discussion Threads
* Chances are others are having the same troubleshooting issue as you!
* PM Stephen on Udemy
** Usually fastest reply
* Twitter: https://twitter.com/ste_grider
* Github Issues on official course repo: https://github.com/StephenGrider/FullstackReactCode/issues
** If you post an issue here also PM me or tweet me a link, I don’t get a lot of notifications on Github issues

## Course Diagrams
* You can view all course diagrams on your own here: https://github.com/StephenGrider/FullstackReactCode/tree/master/diagrams
* All diagrams are authored using https://www.draw.io/

**You can edit diagrams on your own!**

1. Go to https://github.com/StephenGrider/FullstackReactCode/tree/master/diagrams
2. Open the folder containing the set of diagrams you want to edit
3. Click on the ‘.xml’ file
4. Click the ‘raw’ button
5. Copy the URL
6. Go to https://www.draw.io/
7. On the ‘Save Diagrams To…’ window click ‘Decide later’ at the bottom
8. Click ‘File’ -> ‘Import From’ -> ‘URL’
9. Paste the link to the XML file
10. Tada!
