
var https = require('https')
var request = require('@request/client')
var Purest = require('purest')({request, promise: Promise})


module.exports = ({auth, config, fields, purest, facebook}) => {

  if (!facebook) {
    var facebook = Purest({
      provider: 'facebook',
      config: purest,
      defaults: {
        auth: {bearer: auth.token},
        agent: new https.Agent({keepAlive: true, maxSockets: 3})
      }
    })
  }

  var api = {
    feed: (id) =>
      facebook
        .get(id + '/feed')
        .qs({
          fields: fields.post.join(),
          limit: config.sync.limit,
        })
        .timeout(3000)
        .request()
        .then(([res, body]) => res.statusCode !== 200
          ? Promise.reject(JSON.stringify(body))
          : (body.data || []))
    ,
    feeds: () => Promise.all(
      config.feeds.map(api.feed))
    ,
    event: (id) =>
      facebook
        .get(id)
        .qs({
          fields: fields.event.join()
        })
        .timeout(3000)
        .request()
        .then(([res, body]) => res.statusCode !== 200
          ? Promise.reject(JSON.stringify(body))
          : body)
    ,
    events: (events) => Promise.all(
      events.map((event) => api.event(
        event.object_id ||
        event.link.replace(/.*\/events\/(\d+)\/?$/g, '$1')
      )))
    ,
  }

  return api
}
