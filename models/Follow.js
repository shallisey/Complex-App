const usersCollection = require('../db')
  .db()
  .collection('users');
const followsCollection = require('../db')
  .db()
  .collection('follows');
const ObjectID = require('mongodb').ObjectID;

let Follow = function(followedUsername, authorId) {
  this.followedUsername = followedUsername;
  this.authorId = authorId;
  this.errors = [];
};

Follow.prototype.cleanUp = async function() {
  if (typeof this.followedUsername != 'string') {
    this.followedUsername = '';
  }
};

Follow.prototype.validate = async function(action) {
  //follewdUsername must exist in database
  let followedAccount = await usersCollection.findOne({
    username: this.followedUsername
  });
  if (followedAccount) {
    this.followedId = followedAccount._id;
  } else {
    this.errors.push('You cannot follow a user that does not exist.');
  }

  let doesFollowExist = await followsCollection.findOne({
    followedId: this.followedId,
    authorId: new ObjectID(this.authorId)
  });
  if (action == 'create') {
    if (doesFollowExist) {
      this.errors.push('You are already following that user.');
    }
    if (action == 'delete') {
      if (doesFollowExist) {
        this.errors.push(
          'You acannot stop following someone you do not already follow.'
        );
      }
    }
    if (this.followedId.equals(this.authorId)) {
      this.errors.push('You cannot follow yourself');
    }
  }
};

Follow.prototype.create = function() {
  return new Promise(async (resolve, reject) => {
    this.cleanUp();
    await this.validate('create');
    if (!this.errors.length) {
      await followsCollection.insertOne({
        followedId: this.followedId,
        authorId: new ObjectID(this.authorId)
      });
      resolve();
    } else {
      reject(this.errors);
    }
  });
};

Follow.prototype.delete = function() {
  return new Promise(async (resolve, reject) => {
    this.cleanUp();
    await this.validate('delete');
    if (!this.errors.length) {
      await followsCollection.deleteOne({
        followedId: this.followedId,
        authorId: new ObjectID(this.authorId)
      });
      resolve();
    } else {
      reject(this.errors);
    }
  });
};

Follow.isVisitorFollowing = async function(followedId, visitorId) {
  let followDoc = await followsCollection.findOne({
    followedId: followedId,
    authorId: new ObjectID(visitorId)
  });
  if (followDoc) {
    return true;
  } else {
    return false;
  }
};

module.exports = Follow;
