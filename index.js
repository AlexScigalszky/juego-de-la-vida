const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

const initialWord = new Array(100)
            .fill(false)
            .map(() => new Array(100).fill(Math.random() < 0.2));


const cellularAutomata = new CellularAutomata(initialWord, 100, ctx);
// cellularAutomata.create();

setInterval(() => {
    cellularAutomata.next();
}, 300);
