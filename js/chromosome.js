class Chromosome {
    gene = '';
    fitness = 0;
    positions = [];
    context = null;

    constructor(_context, _fitSolution = '', _gene = '', _mutationTax = 0) {
        this.context = _context;
        this.gene = _gene != '' ? this.#generateMutation(_mutationTax, _gene) : util.randomColor();
        this.positions = [util.randomPos(), util.randomPos()];

        this.#generateFitness(_fitSolution);
    }

    #generateGene(_gene) {
        this.gene = this.gene === '' ? _gene : this.gene;
        const slice = util.randomInt(this.gene.length);

        return this.gene.split('')
            .map((x, y) => y === slice ? util.randomGene() : _gene[y])
            .join().replaceAll(',', '')
    }
    
    #generateMutation(_mutationTax, _gene) {
        const choice = util.randomDouble();

        if (_mutationTax < choice) { return _gene; }

        const newGene = this.#generateGene(_gene);
        return newGene;
    }
    
    #generateFitness(_target) {
        _target = _target.split('');
        const geneValue = this.gene.split('');

        this.fitness = _target
            .map((x, y) => x === geneValue[y] ? 1 : 0)
            .reduce((x, y) => x + y, 0);
    }

    render() {
        this.context.fillStyle = `#${this.gene}`;
        this.context.fillRect(this.positions[0], this.positions[1], 30, 30);
    }

    toString() {
        return `{gene: ${this.gene}, fitness: ${this.fitness}}`;
    }
}