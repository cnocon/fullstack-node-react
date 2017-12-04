
Lecture: https://www.udemy.com/node-with-react-fullstack-web-development/learn/v4/t/lecture/7605038?start=0

# Development Mode
![The Beauty of Create React App's Proxy](https://www.dropbox.com/s/lmm8kyar9o35egs/Screenshot%202017-12-01%2021.00.30.png?raw=1)

basically create-react-app handles this somehow with the proxy config... idk

if anybody tries accessing /auth/google, then please forward that request ot localhost:5000... that's hwat that proxy does

---

# What about Prod?
    
We no longer even use the client server in prod. So create-react-app just is relevant in dev environment.

![all relative links get automatically rewritten as our root herokuapp domain](https://www.dropbox.com/s/i5t2je12pnvrx2p/Screenshot%202017-12-01%2021.10.12.png?dl=0)

# I skipped the optional: [Optional: Why this architecture?](https://www.udemy.com/node-with-react-fullstack-web-development/learn/v4/t/lecture/7605040?start=0)

--------------

# Front End/Client React Setup
Blue stuff=client side
green stuff=server side
![](https://www.dropbox.com/s/6cdc19zltu8wqaq/Screenshot%202017-12-04%2013.45.37.png?raw=1)

I need to review what Redux and ReactRouter are... he assumes knowledge of these.

![](https://www.dropbox.com/s/yul7dy946ojd0g0/Screenshot%202017-12-04%2013.55.08.png?raw=1)
Indexjs puts together the data side/Redux side of things.
App.js contains single App comonent; the Rendering/React layer of our application. It's about what set of components to show, so it's the primary location for all our React Router logic.
![](https://www.dropbox.com/s/digc8qj1vwsm8n3/Screenshot%202017-12-04%2013.55.49.png?raw=1)

**Remember we have 2 package.json files - one for client and one for server; so make sure you're in right directly when installing for client or server. 


