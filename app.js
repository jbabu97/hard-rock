const searchBtn = document.getElementById('search_btn');
searchBtn.addEventListener('click', () => {
    searchSongs();
});

// working on Enter kye press
document.getElementById('search_field').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        searchBtn.click();
    }
});

const searchSongs = () => {
    const searchField = document.getElementById('search_field').value;
    const url = `https://api.lyrics.ovh/suggest/:${searchField}`
    fetch(url)
    .then(res => res.json())
    .then(data => {
        displaySongs(data.data);
    });
};

const displaySongs = songs => {
    const songContainer =document.getElementById('song_container');
    songs.map(song => {
        const songDiv = document.createElement('div');
    songDiv.className = "search-result col-md-8 mx-auto py-4";
    songDiv.innerHTML = `
        <div class="single-result row align-items-center my-3 p-3">
            <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>
                <audio controls>
                    <source src="${song.preview}" type="audio/mpeg">
                </audio>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="getLyric('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
            </div>
        </div>
    `;
    songContainer.appendChild(songDiv);
    });
};
const getLyric = (artist, title) => {
    console.log(artist, title);
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    fetch(url)
    .then(res => res.json())
    .then(data => {
        displayLyrics(data.lyrics);
    })
    .catch(error => displayError('Something went wrong!'))
};

const displayLyrics = lyrics => {
    const lyricsContainer = document.getElementById('lyrics_container');
    lyricsContainer.style.display = 'block';
    lyricsContainer.innerText = lyrics;

}

