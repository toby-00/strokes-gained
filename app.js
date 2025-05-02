document.getElementById('start-round-btn').addEventListener('click', function() {
    document.getElementById('start-round-btn').style.display = 'none';
    document.getElementById('round-form').style.display = 'block';
});

document.getElementById('hit-green').addEventListener('change', function() {
    if (this.value === 'yes') {
        document.getElementById('putts-section').style.display = 'block';
        document.getElementById('missed-green-section').style.display = 'none';
    } else {
        document.getElementById('missed-green-section').style.display = 'block';
        document.getElementById('putts-section').style.display = 'none';
    }
});

document.getElementById('round-details-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const fairwayHit = document.getElementById('fairway-hit').value;
    const driveDistance = document.getElementById('drive-distance').value;
    const approachShot = document.getElementById('approach-shot').value;
    const lie = document.getElementById('lie').value;
    const hitGreen = document.getElementById('hit-green').value;
    const putts = document.getElementById('putts').value;
    const proximity = document.getElementById('proximity').value;
    const missedGreenLie = document.getElementById('missed-green-lie').value;
    const missedGreenDistance = document.getElementById('missed-green-distance').value;

    let strokesGained = calculateStrokesGained(fairwayHit, driveDistance, approachShot, lie, hitGreen, putts, proximity, missedGreenLie, missedGreenDistance);

    displayResults(strokesGained);
});

function calculateStrokesGained(fairwayHit, driveDistance, approachShot, lie, hitGreen, putts, proximity, missedGreenLie, missedGreenDistance) {
    // Use your chart to calculate strokes gained here.
    // For simplicity, let's assume some basic logic.
    let strokesGained = 0;

    // Example logic based on some basic factors
    if (fairwayHit === 'yes') {
        strokesGained += 0.2;
    } else {
        strokesGained -= 0.2;
    }

    if (hitGreen === 'yes') {
        strokesGained -= putts * 0.1; // Simplified strokes gained calculation for putting
    } else {
        strokesGained += 0.1; // Penalize if missed green
    }

    // Add more logic as needed based on your chart.

    return strokesGained;
}

function displayResults(strokesGained) {
    document.getElementById('round-form').style.display = 'none';
    document.getElementById('round-results').style.display = 'block';

    document.getElementById('summary').innerText = `Strokes Gained for this round: ${strokesGained.toFixed(2)}`;

    // Example breakdown
    document.getElementById('round-stats').innerHTML = `
        <strong>Tee-to-Green:</strong> 0.5 <br>
        <strong>Putting:</strong> -0.3 <br>
        <strong>Driving:</strong> 0.4 <br>
    `;
}

// Save round to LocalStorage (or IndexedDB for larger data)
document.getElementById('save-round-btn').addEventListener('click', function() {
    const roundData = {
        date: new Date(),
        strokesGained: 0.5, // Example value, you'd save actual value
        breakdown: {
            teeToGreen: 0.5,
            putting: -0.3,
            driving: 0.4
        }
    };

    let rounds = JSON.parse(localStorage.getItem('rounds')) || [];
    rounds.push(roundData);
    localStorage.setItem('rounds', JSON.stringify(rounds));

    alert('Round saved!');
});
