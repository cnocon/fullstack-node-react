For video & lectures, see https://www.udemy.com/node-with-react-fullstack-web-development/learn/v4/t/lecture/7593702?start=0.

Entirely server side feature.

Everything we do in this step is 100% transferrable to any project you work on yourself.           

## OAuth Flow for Google OAuth (we'll be using PassportJS to make this easier)
![OAuth Flow](https://www.dropbox.com/s/flipipjx0w0njni/Screenshot%202017-11-28%2004.03.04.png?raw=1)

*1) User clicks "Login"*
1. [CLIENT] Direct to localhost:5000/auth/google 
2. [SERVER] Forward user's request to Google google.com/auth?appid=<APPID>
3. [GOOGLE] Ask user if they grant permission
4. [GOOGLE] User grants permission, direct to localhost:5000/auth/google/callback?code=450
5. [SERVER] Put user on hold, take the 'code' from the URL
6. [SERVER] Send REQUEST to google with 'code' included (THE CODE IS SUPER IMPORTANT)
  I.[GOOGLE] Google sees 'code' in URL, replies with RESPONSE containing details about user
7. [SERVER] Get user details from response in 6I and create new record in the database.
8. [SERVER] Set user ID in cookie for this user
9. [SERVER] Kick user back to localhost:3000
10. [CLIENT] LOGGED IN!


*2) [CLIENT] I need some resources from the API*
1. Cookie automatically included
2. [SERVER] Ah, this request has a cookie with user id equal to 123 (or whatevs), and you can look up info from that



