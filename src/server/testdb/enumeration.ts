import DBClient from '@service/db/dbClient'

export const enumeration = {
    userSpace: '',
    db: {
        async insertDB() {
            return await DBClient.getInstance(enumeration.userSpace)('test')
            .insert({
                name: 'name',
                description: 'description',
                creator: 'aojiaoshou'
            })
        },
        async queryDB(id: number) {
            return await DBClient.getInstance(enumeration.userSpace)('test')
            .where('id', id)
            .select('*')
        }
    }
}