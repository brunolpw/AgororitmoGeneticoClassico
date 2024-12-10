var pop = 0;
function main() {
    const canvas = document.getElementById('canvas');
    const fitnessCanvas = document.getElementById('fitnessCanvas');

    const lblGeneration = document.getElementById('lblGeneration');
    const lblFitness = document.getElementById('lblFitness');
    const lblBestChromosome = document.getElementById('lblBestChromosome');
    const lblIndividualFitness = document.getElementById('lblIndividualFitness');

    const buttonPopulation = document.getElementById('btnNextPopulation');
    
    const context = canvas.getContext('2d');
    const fitnessContext = fitnessCanvas.getContext('2d');
    
    const solutionFitness = util.randomColor();
    
    const genetic = new Genetic(context, solutionFitness);
    
    genetic.nextGeneration(buttonPopulation, lblGeneration, lblBestChromosome);
    genetic.pointIndividual(canvas, lblIndividualFitness);

    lblFitness.innerHTML = `Fitness: <strong>#${solutionFitness}</strong>`;
    fitnessContext.fillStyle = `#${solutionFitness}`;
    fitnessContext.fillRect(0, 0, 30, 30);
}

main();