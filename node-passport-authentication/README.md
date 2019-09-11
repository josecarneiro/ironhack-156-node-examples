# Passport example explanation

### 1 - We need to tell passport how to serialize and de-serialize data

Serialize - Process in which we take data from the user object and save into the session.
(Ex. Taking the user object and calling the callback with the user._id is going to save the user id to the session).

```
passport.serializeUser((user, callback) => {
  callback(null, user._id);
});
```

De-serialize - Process in which we get the value saved in the session and use it to access the user object. The user object is saved by passport in `req.user`.
(Ex. We had saved the user._id in the serialization process, so we're looking up the user in the database by referencings their user._id).

```
passport.deserializeUser((id, callback) => {
  // Load the user object from their id
  // and call the callback funtion with null as the first argument
  // (meaning no error) and the user object as the second argument.
});
```

### 2 - Passport Strategies

### 3 - Installing as middleware

### 4 - Telling the routes to use each strategy
