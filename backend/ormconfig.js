const defaultConfig = {
  "type": "postgres",
  "url": process.env.DATABASE_URL,
  "synchronize": false,
}

module.exports = process.env.PRODUCTION === 'true' ? {
  ...defaultConfig,
	"entities": [
    "build/entities/**/*.js"
	],
	"migrations": [
    "build/database/migrations/*.js"
	],
  "ssl": true,
  "extra": {
    "ssl": {
      "rejectUnauthorized": false
    }
  },
} : {
  ...defaultConfig,
	"entities": [
    "src/entities/**/*.ts"
	],
	"migrations": [
    "src/database/migrations/*.ts"
	],
  "logging": true,
	"cli": {
		"entitiesDir": "src/entities/",
		"migrationsDir": "src/database/migrations/"
	},
}
