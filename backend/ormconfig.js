const root = process.env.PRODUCTION ? "build" : "src";

export default {
  "type": "postgres",
  "url": process.env.DATABASE_URL,
	"entities": [
		`${root}/entities/**/*.ts`
	],
	"migrations": [
		`${root}/database/migrations/*.ts`
	],
	"cli": {
		"entitiesDir": `src/entities/`,
		"migrationsDir": `src/database/migrations/`
	},
}
