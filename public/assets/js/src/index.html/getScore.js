document.getElementById('get-btn').addEventListener('click', (e) => {
    e.target.disabled = true;
    document.getElementById('score').textContent = '...';
    fetch("https://heidi.nilssimons.me/api/stocktrendscore", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "term": document.getElementById('get-inpt').value,
            "n": parseInt(document.getElementById('get-news').value)
        }),
        timeout: 120000,
        redirect: 'follow'
    })
    .then(response => response.json())
    .then((result) => {
        document.getElementById('score').textContent = 'Score: '+result.score
        e.target.disabled = false;
    })
    .catch(error => console.log('error', error));
});