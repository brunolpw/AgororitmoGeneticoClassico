class Algorithm {
    solution = '';
    mutationTax = 0;
    crossoverTax = 0;
    context = null;
    
    constructor(_context) {
        this.context = _context;
    }

    configSolution(_solution) {
        this.solution = _solution;
        return this;
    }

    configMutationTax(_mutationTax) {
        this.mutationTax = _mutationTax;
        return this;
    }

    configCrossoverTax(_crossoverTax) {
        this.crossoverTax = _crossoverTax;
        return this;
    }

    newPopulation(_population, _elitism) {
        const newPopulation = new Population(this.context, _population.populationLength, true, this.solution);

        if (_elitism) {
            newPopulation.setChromosome(_population.chromosomes[0]);
        }

        while (newPopulation.getChromosomeLength() < newPopulation.populationLength) {
            const father = this.#tournament(_population);

            const sons = util.randomDouble() <= this.crossoverTax
                ? this.#crossover(father[1], father[0])
                : [
                    new Chromosome(this.context, this.solution, father[0].gene, this.mutationTax),
                    new Chromosome(this.context, this.solution, father[1].gene, this.mutationTax),
                ];
            
            newPopulation.setChromosome(sons[0]);
            newPopulation.setChromosome(sons[1]);
        }

        newPopulation.sortPopulation();

        return newPopulation;
    }

    #crossover(_chromosome1, _chromosome2) {
        let cut = util.randomInt(_chromosome1.gene.length);
        cut = cut <= 0 ? _chromosome1.gene.length : cut;

        const cut1Father1 = _chromosome1.gene.substring(0, cut);
        const cut1Father2 = _chromosome2.gene.substring(0, cut);

        const cut2Father1 = _chromosome1.gene.substring(cut);
        const cut2Father2 = _chromosome2.gene.substring(cut);

        let geneSon1 = cut1Father1 + cut2Father2;
        let geneSon2 = cut1Father2 + cut2Father1;

        const sons = [
            new Chromosome(this.context, this.solution, geneSon1, this.mutationTax),
            new Chromosome(this.context, this.solution, geneSon2, this.mutationTax),
        ];

        return sons;
    }

    #tournament(_population) {
        const middlePopulation = new Population(this.context, 5, true);

        middlePopulation.chromosomes.forEach(x =>
            middlePopulation.setChromosome(_population.chromosomes[util.randomInt(_population.populationLength)]));
        
        middlePopulation.sortPopulation();

        const fathers = [
            middlePopulation.chromosomes[0],
            middlePopulation.chromosomes[1]
        ];

        return fathers;
    }
}