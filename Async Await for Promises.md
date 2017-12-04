# Async Await for Promises (ES2017)

# Old Syntax (no async awwait)
https://www.udemy.com/node-with-react-fullstack-web-development/learn/v4/t/lecture/7605048?start=0

```js
function fetchAlbums() {
  fetch('https://rallycoding.herokuapp.com/api/music_albums')
    .then(res => res.json())
    .then(json => console.log(json));
}

fetchAlbums();
```
Put the above in your console on a modern browser like Chrome and you'll see it work.

![](https://www.dropbox.com/s/fe4xq9z8fpp3jyj/Screenshot%202017-12-04%2013.24.29.png?raw=1)
![](https://www.dropbox.com/s/mmfj8te88nu9zr5/Screenshot%202017-12-04%2013.25.12.png?raw=1)

# New Syntax ES2017 (async await)
9 minutes in https://www.udemy.com/node-with-react-fullstack-web-development/learn/v4/t/lecture/7605048?start=0

Identify functions using async code or promises.
1. Put async keyword in front of function w/some asyncronous code.

```js
async function fetchAlbums() {
  fetch('https://rallycoding.herokuapp.com/api/music_albums')
    .then(res => res.json())
    .then(json => console.log(json));
}
```

2. Identify all the different promises creeated within that function. We have two. 1) At calling fetch and 2) at calling res.json(). At both those points, add the 'await' keyword.

```js
// you ahve to be using chrome, a recent version, for below code to work
async function fetchAlbums() {
  const res = await fetch('https://rallycoding.herokuapp.com/api/music_albums');
  const json = await res.json();

  console.log(json);
}

fetchAlbums();
```




