
var util = require('util')
var fs = require('fs')
var write = util.promisify(fs.writeFile)


module.exports = ({fpath, db, env}) => {

  var config = require(fpath.config)

  var api = {
    write: (posts) => {
      var recent = posts.filter((post) => !db.find((p) => p.id === post.id))
      if (recent.length) {
        write(fpath.db, JSON.stringify(db.concat(recent), null, 2), 'utf8')
      }
      config[env].sync.since = new Date().getTime()
      write(fpath.config, JSON.stringify(config, null, 2), 'utf8')
    }
  }

  return api
}
