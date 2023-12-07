var pop = 0;
function main() {
    const canvas = document.getElementById('canvas');
    const fitnessCanvas = document.getElementById('fitnessCanvas');

    const lblPopulation = document.getElementById('lblPopulation');
    const lblFitness = document.getElementById('lblFitness');
    const lblBestChromosome = document.getElementById('lblBestChromosome');

    const buttonPopulation = document.getElementById('btnNextPopulation');
    
    const context = canvas.getContext('2d');
    const fitnessContext = fitnessCanvas.getContext('2d');

    const genetic = new Genetic(context);

    const sortedFitness = util.randomColor();

    genetic.run(sortedFitness, buttonPopulation, lblPopulation, lblBestChromosome);

    lblFitness.innerHTML = `Fitness: <strong>#${sortedFitness}</strong>`;
    fitnessContext.fillStyle = `#${sortedFitness}`;
    fitnessContext.fillRect(0, 0, 30, 30);
}

main();