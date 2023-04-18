import {
    buildCreateQuery,
    buildInsertQuery,
    buildUpdateQuery
} from './Query';
import Connection from './Connection';
import messages from '../languages/english';
import { SQLResultSet } from 'expo-sqlite';

export default class BaseRepository<T> {

    constructor(private table: string, private fields: string[]) {
        this.create();
        this.fields.push('id');
    }

    private create() {
        const columns = [
            'id INT PRIMARY KEY',
            ...this.fields.map(field => `${field} TEXT`),
            ];
        Connection().transaction(transaction => transaction.executeSql(buildCreateQuery(this.table, columns)));
    }

    async insert(obj) {
        return new Promise(() =>
        Connection().transaction(transaction =>
                transaction.executeSql(buildInsertQuery(this.table, this.fields), ...Object.values(obj)),
            ));
    }

    async update(obj) {
        return new Promise((resolve) =>
        Connection().transaction(transaction =>
                transaction.executeSql(buildUpdateQuery(this.table, this.fields), ...Object.values(obj),
                () => resolve(messages.sql.succes.user)),
            ),
        );
    }

    async select(offset) {
        return new Promise((resolve) => {
            Connection().transaction((transaction) => {
                transaction.executeSql(`SELECT * FROM ${this.table} ORDER BY id LIMIT 10 OFFSET ?;`,
                [offset], (_, result: SQLResultSet) => 
                    resolve(result.rows._array));
                });
        });
    }
        
    async selectById(id) {
        return new Promise((resolve) => {
            Connection().transaction((transaction) => {
                transaction.executeSql(buildUpdateQuery(this.table, id),
                [id], (_, result: SQLResultSet) => resolve(result.rows._array));
            });
        });
    }
}
