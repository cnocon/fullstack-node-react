For video & lectures, see https://www.udemy.com/node-with-react-fullstack-web-development/learn/v4/t/lecture/7593702?start=0.

Entirely server side feature.

Everything we do in this step is 100% transferrable to any project you work on yourself.           

## OAuth Flow for Google OAuth (we'll be using PassportJS to make this easier)
![OAuth Flow](https://www.dropbox.com/s/flipipjx0w0njni/Screenshot%202017-11-28%2004.03.04.png?raw=1)

_Passport JS will help us a lot:_
![What Passport handles](https://www.dropbox.com/s/jkuij0tffi6048m/Screenshot%202017-11-28%2004.20.04.png?raw=1)

*1) User clicks "Login"*
1. [CLIENT] Direct to localhost:5000/auth/google 
2. [SERVER][PASSPORT] Forward user's request to Google google.com/auth?appid=<APPID>
3. [GOOGLE][PASSPORT] Ask user if they grant permission
4. [GOOGLE][PASSPORT] User grants permission, direct to localhost:5000/auth/google/callback?code=450
5. [SERVER][PASSPORT] Put user on hold, take the 'code' from the URL
6. [SERVER][PASSPORT] Send REQUEST to google with 'code' included (THE CODE IS SUPER IMPORTANT)
  I.[GOOGLE][PASSPORT] Google sees 'code' in URL, replies with RESPONSE containing details about user
7. [SERVER] Get user details from response in 6I and create new record in the database.
8. [SERVER] Set user ID in cookie for this user
9. [SERVER] Kick user back to localhost:5000
10. [CLIENT] LOGGED IN!

POINTS OF CONFUSION W/PASSPORT:
1. Passport helps automate OAuth flow, but it requires us to reach in to very specific points in the flow, and add some code to make steps work nicely. So it can't automate everything, which is problematic because the big picture isn't really easy to understand.
2. Inherent confusion in how the library is strucured. In reality, when we make use of passport, we're actually installing at least two different libraries: Passport & Passport Strategy.
** _Passport_ is for general helpers for handling auth in Express apps.
** _Passport Strategy_ is for helpers for authenticating with one very specific method (email/password, Google, Facebook, Twitter, etc.)




*2) [CLIENT] I need some resources from the API*
1. Cookie automatically included
2. [SERVER] Ah, this request has a cookie with user id equal to 123 (or whatevs), and you can look up info from that



