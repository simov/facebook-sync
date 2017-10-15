
module.exports = ({config}) => {

  var api = {
    flatten: (feeds) => feeds
      .reduce((all, feed) => all.concat(feed), [])
    ,
    since: (posts) => posts
      .filter((post) =>
        new Date(post.created_time).getTime() > config.sync.since
      )
    ,
    unique: (posts) => ((
      unique = posts
        .reduce((all, post) => (all[post.object_id] = post, all), {})
    ) =>
      Object.keys(unique).map((id) => unique[id])
    )()
    ,
    event: (posts) => posts
      .filter((post) => post.type === 'event')
    ,
  }

  return api
}
