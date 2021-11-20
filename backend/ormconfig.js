const root = process.env.PRODUCTION ? {
  path: "build",
  extension: "js"
} : {
  path: "src",
  extension: "ts"
};

module.exports = {
  "type": "postgres",
  "url": process.env.DATABASE_URL,
	"entities": [
		`${root.path}/entities/**/*.${root.extension}`
	],
	"migrations": [
		`${root.path}/database/migrations/*.${root.extension}`
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
