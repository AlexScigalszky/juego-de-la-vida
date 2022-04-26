class CellularAutomata {
    constructor(initialCells, size, ctx) {
        this.size = size;
        this.ctx = ctx;
        this.cells = initialCells ? initialCells : [];
        this.cellSize = 4;
    }

    create() {
        console.log('creating...');
        for (let i = 0; i < this.size; i++) {
            this.cells[i] = [];
            for (let j = 0; j < this.size; j++) {
                const alive = Math.random() > 0.5;
                this.cells[i].push(alive);
            }
        }
        console.log('created');
    }

    print() {
        console.log('printing...');
        this.ctx.clearRect(0, 0, this.size, this.size);
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (this.cells[i][j]) {
                    this.ctx.fillStyle = 'black';
                } else {
                    this.ctx.fillStyle = 'white';
                }
                this.ctx.fillRect(i * this.cellSize, j * this.cellSize, this.cellSize, this.cellSize);
            }
        }
        console.log('printed');
    }

    evaluate() {
        console.log('evaluating...');
        const newCells = new Array(this.size)
            .fill(false)
            .map(() => new Array(this.size).fill(false));

        for (let x = 0; x < this.size; x++) {
            for (let y = 0; y < this.size; y++) {
                const aliveNeighbours = this.getAliveNeighbours(x, y);
                if (this.cells[x][y]) {
                    newCells[x][y] = aliveNeighbours === 2 || aliveNeighbours === 3;
                } else {
                    newCells[x][y] = aliveNeighbours === 3;
                }
            }
        }
        this.cells = newCells;
    }

    getAliveNeighbours(x, y) {
        let aliveNeighbours = 0;
        for (let i = x - 1; i <= x + 1; i++) {
            for (let j = y - 1; j <= y + 1; j++) {
                if (i >= 0 && i < this.size && j >= 0 && j < this.size) {
                    if (!(i === x && j === y) && this.cells[i][j]) {
                        aliveNeighbours++;
                    }
                }
            }
        }
        return aliveNeighbours;
    }

    next() {
        this.print();
        this.evaluate();
    }
}