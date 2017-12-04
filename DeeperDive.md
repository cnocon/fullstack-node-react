
# Lecture 44: Deeper Dive
https://www.udemy.com/node-with-react-fullstack-web-development/learn/v4/t/lecture/7603052?start=330

**`app.use` calls**
 
 * we've been sending various objects that are completely different
 * each call is wiring up "middleware" inside our app. 
   * middlewares are small functions that cana be used to modify incoming requests to our app before theyr'e send off to route handlers.
 
 ![](https://www.dropbox.com/s/r6rnfz74bbb2ame/Screenshot%202017-12-04%2012.57.11.png?raw=1)
 Cookie session = middleware
 Passport session = middleware
 deserialzieUser = middleware
 - all about doing some pre-processing of the request BEFORE they're sent off to route handlers
 - therefore, they're a great place to put logic that is common to many different route handlers; because they happen before any specific route handler gets run

You can also wire up your middlewares so they're only used for a portion of route handlers... which we'll show later.

![How Express Words](https://www.dropbox.com/s/q4iqlfqcekfb6g2/Screenshot%202017-12-04%2013.01.38.png?raw=1)

---

**What is the Cookie Session doing for it, and how does it relate to Passport**
```js
res.send(req.session);
// returns {"passport":{"user":"5a21e1e0511b9463ea2e5eda"}} 
```
req.session contants the data passport is trying to store inside the  cookie.
so passport looks at req.session, not the cookie, then it passes it on to deserializeUser and all that stuff. n.b. the string for user is the unique record id from mongodb.

Summary: Real relation between passport and cookie session library are: cookie session isn't really inherently passing data to passport; just processes incoming request; populates req.session property, and then passport accesses the data that exists on req.session.
I stopped around 10 minutes.
---
****

# Lecture 56: Why this architecture
https://www.udemy.com/node-with-react-fullstack-web-development/learn/v4/t/lecture/7605040?start=0

