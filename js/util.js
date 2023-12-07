util = {
    randomPos() {
        return Math.floor(Math.random() * (canvas.width - 30));
    },

    randomGene() {
        const letters = '0123456789ABCDEF';
        return letters[Math.floor(Math.random() * 16)];
    },

    randomColor() {
        let color = '';
        for (let i = 0; i < 6; i++) {
            color += util.randomGene();
        }
        return color;
    },
    randomInt(_maxValue = 1) {
        return Math.floor(Math.random() * _maxValue);
    },
    randomDouble(_maxValue = 1, _floatPoint = 2) {
        return Number((Math.random() * _maxValue).toFixed(_floatPoint));
    },
    clear(_context) {
        _context.fillStyle = '#FFFFFF';
        _context.fillRect(0, 0, canvas.width, canvas.height);
    },
}