export const buildCreateQuery = (table: string, columns: string[]) => `CREATE TABLE IF NOT EXISTS ${table} (${columns.join(', ')});`;

export const buildInsertQuery = (table: string, fields: string[]) => {
    const placeholders = fields.map(() => '?').join(', ');
    return`INSERT INTO ${table} (${fields.join(', ')}) VALUES (${placeholders});`;
};

export const buildUpdateQuery = (table: string, fields: string[]) => {
    const values = fields
        .map(field => `${field} = ?`)
        .join(', ');
    return `UPDATE ${table} SET ${values} WHERE id = ?;`;
};

export const buildSelectQuery = (table: string) => `SELECT * FROM ${table} WHERE id = ?;`;