# BASIC CONCEPTS/THEORY _of_ AUTHENTICATION

<small>from https://www.udemy.com/node-with-react-fullstack-web-development/learn/v4/t/lecture/7603020?start=0</small>

## Why do we care about authentication at all? 

Because we can use it to help solve the following problem:

HTTP is *_stateless_* - Between any two requests me make, HTTP inherently has no way to identify or share information between two separate requests. 

> _If we make one request from the browser to the server and say here's an email and password, later if we were to make a request to get a list of the posts from that same user, the server would have NO IDEA what user to get posts for._

*This is why we use/store tokens in the browser...*

## TOKENS

![Flow with tokens](https://www.dropbox.com/s/fjzhvictsw8qtfj/Screenshot%202017-11-28%2007.04.50.png?raw=1)

**Once you've authenticated, the server can send some uniqure identifying information for that single person (e.g. an access token). The server can take that and send it back  to the browser in the form of a token (better term than cookie).**

A token is your proof that 1 min ago or 5 days ago that I logged into this application, and this token is totally unique to me, the person that made this initial login request. 
* Therefore, in any follow up request that the browser makes to the server, we are going to include that little token that PROVES we are the same person. 
* Server can look up person based on that token and then g et all the information already stored/retrievable for that user.

**Tokens are how we identify ourselves between requests, since HTTP is stateleless.**

In our application we're going to use cookie-based authentication. This means that when we get some initial request to our server, like our Express API, we're gonna say, "hey, please log me in," This could be an email/password, etc., but for us, it's going to be Google OAuth. 

After a user goes through the OAuth process, you aand I are going to generate some identifying piece of information. In the response that we send back to the user for that INITIAL OAuth request, we're going to include what is called a **HEADER** inside of the response that gets sent back to the browser.

The HEADER has a property called `set-cookie` that will be set to some random token.

This token is the user's unique identifier.

When the browsers sees the Header in the response, and sees this `set-cookie` property, the browser _automatically strips off this token and stores it into the browser's memory, and the browser will automatically append that cookie to any follow up request being sent to the server_ 

On a follow up request, server will see that provided cookie, and will be able to say, "hey you're the same as this person."

SUMMARY: The entire idea behind authentication is that we have an identifying piece of information into the user's cookie. _Browsers automatically manage the cookie._ Folow up requests to server, the browser just automatically includes cookie in requests to server, so the server always has that identifying piece of info.

It's pretty sweet all we have to do is use the `set-cookie` property in the header and then we always have it in server requests from that browser, which handles it automatically for us.


