export function serializeSession(passport) {
  passport.serializeUser(function (user, cb) {
    console.log(user)
    process.nextTick(function () {
      return cb(null, {
        id: user.id,
      });
    });
  });

  passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
      return cb(null, user);
    });
  });
}
