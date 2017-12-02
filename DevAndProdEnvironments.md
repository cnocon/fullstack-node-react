We should really be keeping keys separate. We don't want some file living on our computer that has ALL of our keys in it, like server/config/keys.js.

We should also separate dev and prod keys.
![](https://www.dropbox.com/s/sjczi1usngvyx3f/Screenshot%202017-12-01%2017.07.51.png?raw=1)

We should also have two separate DB's. One that is production, that we don't mess around with or manually deltee add stuff, etc. We can do that stuff in our separate, dev db.

Moving to the client side, we need to isntall the react related stuff:
FROM THE SERVER DIRECTORY: 
$ `sudo npm install -g create-react-app`
The way we installed it, it came with it's own server set up already. To run it:
$ `cd server/client`
$ `npm start`

## WHY TWO SERVERS?

![why two servers?](https://www.dropbox.com/s/g0d4hcjmovafyyd/Screenshot%202017-12-01%2018.21.08.png?raw=1)
* One server is handling the client side react JS stuff
* The other, Express, is handling our database related stuff, providing us JSON. 

The reason we're doing this is because using `create-react-app` is just an easier way to get started with react. We COULD have tried to expand our already existing Express server with webpack and babel and all the other dependenceis, etc., but this is just easier ofr this course's purposes.
__
