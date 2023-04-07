export const buildCreateQuery = (table, columns) => `CREATE TABLE IF NOT EXISTS ${table} (${columns.join(', ')});`;
export const buildInsertQuery = (table, fields) => {
    const placeholders = fields.map(() => '?').join(', ');
    return`INSERT INTO ${table} (${fields.join(', ')}) VALUES (${placeholders});`;
};
export const buildUpdateQuery = (table, fields) => {
    const values = fields.map((field, index) => {
        if (index === fields.length - 1) {
            return;
        }
        return`${field} = ?`;
    }).join(', ');
    return `UPDATE ${table} SET ${values} WHERE id = ?;`;
};
