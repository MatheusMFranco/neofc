import { buildCreateQuery, buildInsertQuery, buildUpdateQuery } from './Query';
import Connection from './connection';
import messages from '../languages/english';

const table = 'User';
const fields = [
    'language',
    'theme',
    'mode',
    'details',
    'custom',
];

export function create() {
    const columns = [
        'id INT PRIMARY KEY',
        'language TEXT',
        'theme TEXT',
        'mode TEXT',
        'details INT',
        'custom INT',
    ];
    Connection.transaction(transaction => transaction.executeSql(buildCreateQuery(table, columns)));
}

export async function insert(user) {
	return new Promise(() =>
        db.transaction(transaction =>
            transaction.executeSql(buildInsertQuery(table, fields), [
                user.language,
                user.theme,
                user.mode,
                user.details,
                user.custom,
                user.id,
            ]),
        ));
}

export async function update(user) {
	return new Promise((resolve) =>
        db.transaction(transaction =>
            transaction.executeSql(buildUpdateQuery(table, fields), [
                user.language,
                user.theme,
                user.mode,
                user.details,
                user.custom,
                user.id,
            ],
                () => resolve(messages.sql.succes.user)),
            ),
        );
}

export async function selectById(id) {
	return new Promise((resolve) => {
		db.transaction((transaction) => {
		transaction.executeSql(buildUpdateQuery(id),
        [id], (_, result) => 
            resolve(result.rows._array));
		});
	});
}
