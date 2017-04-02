Mongoose Patch Update Plugin
=========

mongoose-patch-update plugin is simple mongoose plugin that enables model updates in PATCH like style - only what you send in body params will be updated.

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

Mongoose patch update plugin provides support for both callback style queries as well as promise style queries.

### Promise example
```javascript
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const User = require('./user.model.js'); // model

let query = { _id: ObjectId(req.params.userId) }; // find query
let updateParams = req.body; // update parameters
let protectedKeys = ['password', 'contact']; // protected keys - these keys won't be allowed to update
let selectedKeys = ''; // which keys will be returned after successful update - all keys will be returned

User
  .patchUpdate(
    query,
    updateParams,
    protectedKeys,
    selectedKeys
  )
  .then((updatedUser) => {
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
let updateParams = req.body; // update parameters
let protectedKeys = ['password', 'contact']; // protected keys - these keys won't be allowed to update
let selectedKeys = ''; // which keys will be returned after successful update - all keys will be returned

User
  .patchUpdate(
    query,
    updateParams,
    protectedKeys,
    selectedKeys,
  (err, updatedUser) => {
    if (err) return next(err);
    res.status(200).json(updatedUser);
  });

```

## License

The MIT License

Copyright (c) 2017 Jozef Butko <jbutko@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
