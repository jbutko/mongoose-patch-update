Mongoose Patch Update Plugin
=========

[![NPM](https://nodei.co/npm/mongoose-patch-update.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/mongoose-patch-update/)

*mongoose-patch-update* plugin is simple [mongoose](http://www.mongoose.com) plugin that enables model updates in PATCH like style - only what you send in body params will be updated. You can set protected keys which won't be updatable.

## Installation
```
npm install mongoose-patch-update --save
```

You can use this plugin with specific schema or globally for all schemas.<br />
To use it with specific schema:
```javascript
const mongoosePatchUpdate = require('mongoose-patch-update');

const userSchema = new Schema({...});

// attach mongoose-patch-update plugin to userSchema
userSchema.plugin(mongoosePatchUpdate);
```

To use this plugin globally for all schemas:
```javascript
const mongoose = require('mongoose');
const mongoosePatchUpdate = require('mongoose-patch-update');

mongoose.plugin(mongoosePatchUpdate);
```
After attaching mongoose-patch-update plugin you will have `Model.patchUpdate(...)` method on your model.


## Usage

*Mongoose patch update* plugin provides support for both promise style queries as well as callback style queries.

### Promise example
```javascript
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const User = require('./user.model.js'); // model

let query = { _id: ObjectId(req.params.userId) }; // find query
let updateParams = { username: 'johndoe-123', email: 'john123@doe.com' }; // update parameters - only `username` will be updated, `email` is protected
let protectedKeys = ['email']; // protected keys - given keys won't be allowed to be updated
let selectedKeys = ''; // which keys will be returned after successful update - all keys will be returned

// user before update
/*
let user = {
  username: 'johndoe',
  firstname: 'John',
  surname: 'Doe',
  email: 'john@doe.com'
};
 */

User
  .patchUpdate(
    query,
    updateParams,
    protectedKeys,
    selectedKeys
  )
  .then((updatedUser) => {
    // user after update
    /*
    let user = {
      username: 'johndoe-123',
      firstname: 'John',
      surname: 'Doe',
      email: 'john@doe.com'
    };
     */

    res.status(200).json(updatedUser);
  })
  .catch((err) => {
    next(err);
  });

```

### Callback example
```javascript
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const User = require('./user.model.js'); // model

let query = { _id: ObjectId(req.params.userId) }; // find query
let updateParams = { username: 'johndoe-123', email: 'john123@doe.com' }; // update parameters - only `username` will be updated, `email` is protected
let protectedKeys = ['email']; // protected keys - given keys won't be allowed to be updated
let selectedKeys = ''; // which keys will be returned after successful update - all keys will be returned

// user before update
/*
let user = {
  username: 'johndoe',
  firstname: 'John',
  surname: 'Doe',
  email: 'john@doe.com'
};
 */

User
  .patchUpdate(
    query,
    updateParams,
    protectedKeys,
    selectedKeys,
  (err, updatedUser) => {
    if (err) return next(err);

    // user after update
    /*
    let user = {
      username: 'johndoe-123',
      firstname: 'John',
      surname: 'Doe',
      email: 'john@doe.com'
    };
     */

    res.status(200).json(updatedUser);
  });

```

## License

DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
Version 2, December 2004

Copyright (C) 2017 Jozef Butko <jbutko@gmail.com>

Everyone is permitted to copy and distribute verbatim or modified
copies of this license document, and changing it is allowed as long
as the name is changed.

DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

0. You just DO WHAT THE FUCK YOU WANT TO.
