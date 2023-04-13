import {
    buildCreateQuery,
    buildInsertQuery,
    buildUpdateQuery
  } from './Query';
  import Connection from './connection';
  import messages from '../languages/english';
  
export default class BaseRepository {
    constructor(table, fields) {
        this.table = table;
        this.fields = fields;
        this.create();
        this.table.push('id');
    }

    create() {
        const columns = [
            'id INT PRIMARY KEY',
            ...this.fields.map(field => `${field} TEXT`),
            ];
        Connection.transaction(transaction => transaction.executeSql(buildCreateQuery(this.table, columns)));
    }

    async insert(obj) {
        return new Promise(() =>
            db.transaction(transaction =>
                transaction.executeSql(buildInsertQuery(this.table, this.fields), ...Object.values(obj)),
            ));
    }

    async update(obj) {
        return new Promise((resolve) =>
            db.transaction(transaction =>
                transaction.executeSql(buildUpdateQuery(this.table, this.fields), ...Object.values(obj),
                () => resolve(messages.sql.succes.user)),
            ),
        );
    }

    async select(offset) {
        return new Promise((resolve) => {
            db.transaction((transaction) => {
                transaction.executeSql(`SELECT * FROM ${table} ORDER BY id LIMIT 10 OFFSET ?;`,
                [offset], (_, result) => 
                    resolve(result.rows._array));
                });
        });
    }
        
    async selectById(id) {
        return new Promise((resolve) => {
            db.transaction((transaction) => {
                transaction.executeSql(buildUpdateQuery(this.table, id),
                [id], (_, result) => resolve(result.rows._array));
            });
        });
    }
}
