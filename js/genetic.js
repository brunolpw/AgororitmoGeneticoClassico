class Genetic {
    context = null;

    algorithm = null;
    population = null;
    newPopulation = null;

    elitism = true;
    populationLength = 0;
    numMaxGenerations = 0;
    generation = 0;

    constructor(_context, _solution) {
        this.context = _context;
        this.solution = _solution;
        
        this.elitism = true;
        this.populationLength = 10;
        this.numMaxGenerations = 10_000;
        this.generation = 0;

        this.population = new Population(this.context, this.populationLength, false, this.solution);
        this.algorithm = new Algorithm(this.context)
            .configSolution(this.solution)
            .configMutationTax(0.5)
            .configCrossoverTax(0.8);
        
        console.log(`Start... solution fit: ${_solution.length}`);
    }

    nextGeneration(_button, _labelPopulation, _labelBest) {
        _button.addEventListener('click', () => {
            if (this.newPopulation != null) {
                this.population = this.newPopulation;
            }

            const hasSolution = this.population.thereAreSolution(this.algorithm.solution);
            const littleCanvas = document.getElementById('littleCanvas');
            const ctx = littleCanvas.getContext('2d');

            this.generation++;
            
            _labelPopulation.innerText = `Generation: ${this.generation}`;
            _labelBest.innerText = `Best: ${this.population.chromosomes[ 0 ].toString()}`;

            this.context.strokeStyle = "green";
            this.context.stroke()
            
            ctx.fillStyle = `#${this.population.chromosomes[0].gene}`;
            ctx.fillRect(0, 0, 30, 30);

            this.population.renderPopulation(this.context);
            
            if (!hasSolution) {
                this.newPopulation = this.algorithm.newPopulation(this.population, this.elitism);
            }
            
            if (this.generation == this.numMaxGenerations) {
                console.log(`Max number of generations | ${this.population.chromosomes[ 0 ].gene} | Population: ${this.population.getChromosomeGenes()}`);
                _button.disabled = true;
            }

            _button.disabled = hasSolution;
        });
    }

    pointIndividual(_canvas, _labelIndividual) {
        _canvas.onmousemove = (e) => {
            if (this.generation <= 0) { return; }
            
            let chromosomes = this.population.chromosomes;
            let index = -1;
            let individual;

            const rect = _canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const individualFitnessCanvas = document.getElementById('individualFitnessCanvas');
            const ctx = individualFitnessCanvas.getContext('2d');

            for (let i = chromosomes.length - 1; i >= 0; i--) {
                individual = chromosomes[ i ];
                
                if (x >= individual.positions[ 0 ] && x <= individual.positions[ 0 ] + 30 &&
                    y >= individual.positions[ 1 ] && y <= individual.positions[ 1 ] + 30) {
                    index = i;
                    break;
                }
            }

            if (index >= 0) {
                _labelIndividual.innerHTML = `Individual Fitness: <strong>#${chromosomes[index].gene}</strong>`;
                ctx.fillStyle = `#${chromosomes[ index ].gene}`;
                ctx.fillRect(0, 0, 30, 30);
            }
        }
    }
}