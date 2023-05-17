document.getElementById('get-btn').addEventListener('click', (e) => {
    document.getElementById('score').textContent = '...';
    fetch("https://heidi.nilssimons.me/api/stocktrendscore", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "term": document.getElementById('get-inpt').value,
            "n": 10
        }),
        redirect: 'follow'
    })
    .then(response => response.json())
    .then((result) => {
        document.getElementById('score').textContent = 'Score: '+result.score
    })
    .catch(error => console.log('error', error));
});