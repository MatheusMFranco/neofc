import {
    buildCreateQuery,
    buildInsertQuery,
    buildSelectQuery,
    buildUpdateQuery
} from './Query';
import { 
    SQLTransaction,
    openDatabase
} from 'expo-sqlite';

export default class BaseRepository<T extends { id?: string}> {

    db = openDatabase('neofc.db');

    constructor(private table: string, private fields: string[]) {
        this.create();
        this.fields.push('id');
    }

    private parse(entity: T) {
        const attributes = Object.keys(entity).sort();
        return attributes.map(attribute => {
            const parsed = `${entity[attribute]}`;
            if (parsed === 'true') {
                return '1';
            } else if (parsed === 'false') {
                return '0';
            }
            return parsed; 
        });
    }

    private create() {
        const columns = [
            'id TEXT PRIMARY KEY',
            ...this.fields.map(field => `${field} TEXT`),
        ];
        this.db.transaction((transaction: SQLTransaction) =>
            transaction.executeSql(buildCreateQuery(this.table, columns))
        );
    }

    insert(entity: T) {
        this.db.transaction((transaction: SQLTransaction) =>
            transaction.executeSql(
                buildInsertQuery(this.table, this.fields.sort()),
                this.parse(entity),
            )
        );
    }

    update(entity: T) {
        const columns = this.fields
            .sort()
            .filter(field => field !== 'id');
        const id = entity.id;
        delete entity.id;
        this.db.transaction((transaction: SQLTransaction) =>
            transaction.executeSql(
                buildUpdateQuery(this.table, columns),
                [...this.parse(entity), id],
            )
        );
    }

    select(offset: number): Promise<T[] | undefined> {
        return new Promise((resolve) => {
          this.db.transaction((transaction: SQLTransaction) => {
            transaction.executeSql(
              `SELECT * FROM ${this.table} ORDER BY id LIMIT 10 OFFSET ?`,
              [offset],
              (_, { rows }) => {
                const data = rows._array;
                resolve(data);
              },
            );
          });
        });
    }

    selectById(id: string): Promise<T | undefined> {
        return new Promise((resolve, reject) => {
            this.db.transaction((transaction: SQLTransaction) => {
                transaction.executeSql(
                    buildSelectQuery(this.table),
                    [id],
                    (_, result) => {
                        if (result.rows.length) {
                            const item = result.rows.item(0);
                            resolve(item as T);
                        } else {
                            resolve(undefined);
                        }
                    },
                    (_, error) => {
                        reject(error);
                        return false;
                    }
                );
            });
        });
    }
}
