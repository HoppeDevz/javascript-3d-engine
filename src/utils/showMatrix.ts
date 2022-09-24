
export function showMatrix(matrix: number[][]) {

    for (let i = 0; i < matrix.length; i++) {

        let rowStr = "";

        for (let j = 0; j < matrix[i].length; j++) {

            rowStr += matrix[i][j].toFixed(2) + " ";
        }

        console.log(rowStr + "\n");
    }
}