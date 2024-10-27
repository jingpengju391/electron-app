exports.up = function (knex) {
	return knex.schema.createTable('test', (table) => {
		table.increments('id').primary()
		table.string('name')
		table.string('description')
		table.string('creator')
	})
}

exports.down = function () {
	return null
}
