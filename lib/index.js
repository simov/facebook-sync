
var modules = {
  facebook: require('./facebook'),
  posts: require('./posts'),
}


var ctor = ({auth, config, fields, db, purest, facebook}) => {

  var fb = modules.facebook({auth, config, fields, purest, facebook})
  var posts = modules.posts({config})

  var api = {
    feeds: () =>
      fb.feeds()
        .then(posts.flatten)
        .then(posts.since)
        .then(posts.unique)
    ,
    events: () =>
      api.feeds()
        .then(posts.event)
        .then(fb.events)
  }

  return api
}

module.exports = Object.assign(ctor, modules)
