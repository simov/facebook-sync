#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2))

if (argv.help) {
  console.log(`
    --auth /path/to/auth.json
    --config /path/to/config.json
    --fields /path/to/fields.json
    --db /path/to/db.json
    --purest /path/to/purest.json
    --sync feeds|events
    --env environment
  `)
  process.exit()
}

;['auth', 'config', 'fields', 'db'].forEach((file) => {
  if (!argv[file]) {
    console.log(`Specify --${file} /path/to/${file}.json`)
    process.exit()
  }
})

if (!argv.sync || !/feeds|events/.test(argv.sync)) {
  console.log('Specify --sync feeds|events')
  process.exit()
}

var env = process.env.NODE_ENV || argv.env || 'development'

var path = require('path')

var fpath = {
  auth: path.resolve(process.cwd(), argv.auth),
  config: path.resolve(process.cwd(), argv.config),
  fields: path.resolve(process.cwd(), argv.fields),
  db: path.resolve(process.cwd(), argv.db),
  purest: argv.purest
    ? path.resolve(process.cwd(), argv.purest)
    : path.resolve(__dirname, '../config/purest.json')
}

var args = {
  fpath,
  env,
  auth: require(fpath.auth)[env],
  config: require(fpath.config)[env],
  fields: require(fpath.fields)[env],
  db: require(fpath.db),
  purest: require(fpath.purest),
}

var sync = require('../')(args)
var db = require('../lib/db')(args)


sync[argv.sync]()
  .then(db.write)
  .catch((err) => console.error(err))
