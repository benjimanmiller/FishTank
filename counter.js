function draw_fish_counter(){
    // Count only alive fish
    const aliveFishCount = fishes.filter(fish => !fish.dead).length;

    // Display the number of fish
    context.font = '20px Arial';
    context.fillStyle = 'white';
    context.textAlign = 'left';
    context.textBaseline = 'top';
    context.fillText(`Number of Alive Fish: ${aliveFishCount}`, 10, 10);
}