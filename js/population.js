class Population {
    populationLength = 0;
    chromosomes = [];

    constructor(_context, _populationLength, _hasGene = false, _fitSolution = '') {
        this.populationLength = _populationLength;
        if (_hasGene) {
            for (var i = 0; i < this.populationLength; i++) {
                this.chromosomes.push(null);
            }

            return;
        }

        for (var i = 0; i < this.populationLength; i++) {
            this.chromosomes.push(new Chromosome(_context, _fitSolution));
        }

        this.sortPopulation();
    }

    setChromosome(_chromosome) { 
        for (let i = 0; i < this.chromosomes.length; i++) {
            if (this.chromosomes[i] == null) {
                this.chromosomes[i] = _chromosome;
                return;
            }
        }
    }
    
    getChromosomeGenes() { 
        return `[ ${this.chromosomes.forEach(x => x.toString())} ]`
    }

    thereAreSolution(_solution) {
        return this.chromosomes.some(x => x.gene == _solutions);
    }

    getChromosomeLength() { 
        return this.chromosomes.filter(x => x != null).length;
    }

    sortPopulation() {
        this.chromosomes = this.chromosomes.sort(function (x, y) {
            if (x.fitness < y.fitness) return 1;
            else if (x.fitness > y.fitness) return -1
            return 0;
        });
    }

    renderPopulation(_context) {
        util.clear(_context);
        this.chromosomes.forEach(x => x.render());
    }
}