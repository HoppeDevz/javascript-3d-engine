
export function initializeMatrix(rows: number, columns: number) {

    const matrix = [] as number[][];

    for (let i = 0; i < rows; i++) {

        matrix[i] = [];

        for (let j = 0; j < columns; j++) {

            matrix[i][j] = 0;
        }
    }

    return matrix;
}