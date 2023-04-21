import {
    buildCreateQuery,
    buildInsertQuery,
    buildUpdateQuery,
    buildSelectQuery,
} from '.';

describe('Query Builder', () => {
    const table = 'Person';
    const fields = [
        'head',
        'body',
        'id',
    ];

    it('should build create query', () => {
        const query = buildCreateQuery(table, fields);
        const expected = 'CREATE TABLE IF NOT EXISTS Person (head, body, id);';
        expect(query).toBe(expected);
    });

    it('should build insert query', () => {
        const query = buildInsertQuery(table, fields);
        const expected = 'INSERT INTO Person (head, body, id) VALUES (?, ?, ?);';
        expect(query).toBe(expected);
    });

    it('should build update query', () => {
        const query = buildUpdateQuery(table, fields);
        const expected = 'UPDATE Person SET head = ?, body = ?, id = ? WHERE id = ?;';
        expect(query).toBe(expected);
    });

    it('should build select query', () => {
        const query = buildSelectQuery(table);
        const expected = 'SELECT * FROM Person WHERE id = ?;';
        expect(query).toBe(expected);
    });
});