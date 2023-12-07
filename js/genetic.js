class Genetic {
    context = null;

    constructor(_context) {
        this.context = _context;
    }

    run(_solution, _button, _labelPopulation, _labelBest) {
        const algorithm = new Algorithm(this.context);
        algorithm.solution = _solution;
        algorithm.crossoverTax = 0.8;
        algorithm.mutationTax = 0.5;
        
        const elitism = true;
        const populationLength = 10;
        const numMaxGenerations = 10_000;

        let population = new Population(this.context, populationLength, false, _solution);
        let hasSolution = false;
        let generation = 0;
        
        console.log(`Inicinado... Aptdidão da solução: ${_solution.length}`);
        
        _button.addEventListener('click', () => {
            generation++;
            _labelPopulation.innerText = `Population: ${generation}`;
            _labelBest.innerText = `Best: ${population.chromosomes[0].toString()}`;

            const littleCanvas = document.getElementById('littleCanvas');
                    const ctx = littleCanvas.getContext('2d');

                    //littleCanvas.style.display = 'block';
                    ctx.fillStyle = `#${population.chromosomes[0].gene}`;
                    ctx.fillRect(0, 0, 30, 30);
        
            if (!hasSolution && generation < numMaxGenerations) {
                population.renderPopulation(this.context);
                
                hasSolution = population.thereAreSolution(algorithm.solution);
                
                population = algorithm.newPopulation(population, elitism);
                
                if (generation == numMaxGenerations) {
                    console.log(`Número máximo de gerações | ${population.chromosomes[0].gene} | População: ${population.getChromosomeGenes()}`);
                }

                if (hasSolution) {
                    //const lblBestChromosome = document.getElementById('lblBestChromosome');
                    // const littleCanvas = document.getElementById('littleCanvas');
                    // const ctx = littleCanvas.getContext('2d');

                    // //littleCanvas.style.display = 'block';
                    // ctx.fillStyle = `#${population.chromosomes[0].gene}`;
                    // ctx.fillRect(0, 0, 30, 30);

                    //lblBestChromosome.innerText = population.chromosomes[0].toString();
                    _button.disabled = true;
                }
            }
        });
    }
}