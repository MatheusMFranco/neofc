export const buildCreateQuery = (table, columns) => `CREATE TABLE IF NOT EXISTS ${table} (${columns.join(', ')});`;

export const buildInsertQuery = (table, fields) => {
    const placeholders = fields.map(() => '?').join(', ');
    return`INSERT INTO ${table} (${fields.join(', ')}) VALUES (${placeholders});`;
};

export const buildUpdateQuery = (table, fields) => {
    const values = fields.slice(0, -1)
        .map(field => `${field} = ?`)
        .join(', ');
    return `UPDATE ${table} SET ${values} WHERE id = ?;`;
};

export const buildSelectQuery = (table) => `SELECT * FROM ${table} WHERE id = ?;`;