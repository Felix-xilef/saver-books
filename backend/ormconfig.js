const root = process.env.PRODUCTION ? "build" : "src";

module.exports = {
  "type": "postgres",
  "url": process.env.DATABASE_URL,
	"entities": [
		`${root}/entities/**/*.ts`
	],
	"migrations": [
		`${root}/database/migrations/*.ts`
	],
  "ssl": true,
  "extra": {
    "ssl": {
      "rejectUnauthorized": false
    }
  },
	"cli": {
		"entitiesDir": `src/entities/`,
		"migrationsDir": `src/database/migrations/`
	},
}
