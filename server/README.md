
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

# Async Await Syntax
Lecture https://www.udemy.com/node-with-react-fullstack-web-development/learn/v4/t/lecture/7605048?start=15
 (Idk why the fuck he's talking about this right now)

write a function to retrieve a blob of json; make an ajax request: use the 'fetch' function; fetch is standard as of  es2015
//https://rallycoding.herokuapp.com/api/music_albums

```js
// before refactor
/*function fetchAlbums() {
  fetch('https://rallycoding.herokuapp.com/api/music_albums')
    .then(res => res.json())
    .then(json => console.log(json));
}
fetchAlbums();*/
```

```js
// after refactor
async function fetchAlbums() {
  const res = await fetch('https://rallycoding.herokuapp.com/api/music_albums')
  const json = await res.json()
  console.log(json);
}

fetchAlbums();
```

To see they both work, just run each block of code in your browser console.

