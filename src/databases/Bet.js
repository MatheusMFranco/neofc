import { buildCreateQuery, buildInsertQuery } from './Query';
import Connection from './connection';
import messages from '../languages/english';

const table = 'Bet';
const fields = [
    'bust',
    'biggest',
    'lowest',
    'fine',
    'date',
    'round',
];

export function create() {
    const columns = [
        'id TEXT PRIMARY KEY',
        'bust REAL',
        'biggest TEXT',
        'lowest TEXT',
        'fine TEXT',
        'date TEXT',
        'round INT',
    ];
    Connection.transaction(transaction => transaction.executeSql(buildCreateQuery(table, columns)));
}

export async function insert(bet) {
	return new Promise((resolve) =>
        db.transaction(transaction =>
            transaction.executeSql(buildInsertQuery(table, fields), [
                bet.bust,
                bet.biggest,
                bet.lowest,
                bet.fine,
                bet.date,
                bet.round,
                bet.id,
            ],
                () => resolve(messages.sql.succes.bet)),
            ),
        );
}

export async function select(offset) {
	return new Promise((resolve) => {
		db.transaction((transaction) => {
		transaction.executeSql(`SELECT * FROM ${table} ORDER BY id LIMIT 10 OFFSET ?;`,
        [offset], (_, result) => 
            resolve(result.rows._array));
		});
	});
}
