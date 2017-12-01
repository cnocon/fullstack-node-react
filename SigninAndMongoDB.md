# Actual Implementation/Overview of Signing in Users with OAuth

You have to use the Google+ profile ID - email isn't good enough because a user can have multiple email addresses associated with their account. The profile id, however, is unique for a account.

![OAuth Flow](https://www.dropbox.com/s/sq0o21t7qmveb3o/Screenshot%202017-11-28%2010.59.37.png?raw=1)

# With MongoDB
![OAuth, Token, and MongoDB Flow](https://www.dropbox.com/s/n8vkr4udbjtpo85/Screenshot%202017-11-28%2011.01.49.png?raw=1)

![Mongoose.js helps with Express and MongoDB communication](https://www.dropbox.com/s/inazpxjkdlxf2qe/Screenshot%202017-12-01%2011.22.19.png?raw=1)

Mongoose is an optional library whose sole purpose is to make our lives easier when working with MongoDB. It's totally optional in life, it's just easier to use Mongo with this.

### How Mongo stores records
![](https://www.dropbox.com/s/jlquh4df25ccbsx/Screenshot%202017-12-01%2011.23.51.png?raw=1)

* Collections (like a table/model); contains multiple records/documents
* Documents (like a row/record)

Records are all in JSON (e.g. documents)

*MONGODB IS SCHEMA-LESS* THIS MEANS THAT EACH RECORD IN A COLLECTION CAN HAVE IT'S OWN UNIQUE SET OF PROPERTIES. E.G. ONE USER RECORD MIGHT HAVE THE HEIGHT PROPERTY, WHEREAS NO OTHER RECORD HAS THAT. And that's all valid. It's beautiful. 

![example of schema-lessness](https://www.dropbox.com/s/6zjyvyny1t60yhu/Screenshot%202017-12-01%2011.26.30.png?raw=1)

---

## What Mongoose does for us

* Gives us access to Model class and then model instances.
Model Class: Represents a MongoDB Collection.
Model Instance: Represents a MongoDB record (or document)

![JS and Mongo](https://www.dropbox.com/s/fec4edbm07isv9q/Screenshot%202017-12-01%2011.27.54.png?raw=1)
<sup>In the above screenshot, the "JS World" portion is from Mongoose.</sup>

## Set up MongoDB Database + Wire it up w/our Express Application
Our setup:
![Our setup will look like this](https://www.dropbox.com/s/of38iggc58uz1sv/Screenshot%202017-12-01%2011.32.32.png?raw=1)

1. Create a remotely hosted copy of Mongo via [mLab](http://mlab.com)
2. 





























