const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const songList = document.getElementById("songList");
const miniPlayer = document.getElementById("miniPlayer");
const playerAudio = document.getElementById("playerAudio");
const nowPlaying = document.getElementById("nowPlaying");
const miniAlbum = document.getElementById("miniAlbum");
const playPauseBtn = document.getElementById("playPauseBtn");
const closePlayer = document.getElementById("closePlayer");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let songs = [];
let currentIndex = 0;

// Fetch songs from iTunes API
async function fetchSongs(query) {
    const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=20`);
    const data = await res.json();
    return data.results;
}

// Render songs in grid
function renderSongs(songsArray) {
    songList.innerHTML = "";
    songsArray.forEach((song, index) => {
        const card = document.createElement("div");
        card.className = "song-card";
        card.innerHTML = `
            <img src="${song.artworkUrl100 || 'placeholder.jpg'}" alt="${song.trackName || song.title}">
            <h3>${song.trackName || song.title}</h3>
            <p>${song.artistName || song.artist}</p>
        `;
        card.onclick = () => playMiniPlayer(song, index);
        songList.appendChild(card);
    });
}

// Play song in mini player
function playMiniPlayer(song, index) {
    currentIndex = index;
    miniPlayer.classList.remove("hidden");
    playerAudio.src = song.previewUrl || song.url || "";
    playerAudio.play();
    playPauseBtn.textContent = "⏸️";
    nowPlaying.textContent = `Now Playing: ${song.trackName || song.title} - ${song.artistName || song.artist}`;
    miniAlbum.src = song.artworkUrl100 || 'placeholder.jpg';
}

// Play/Pause toggle
playPauseBtn.onclick = () => {
    if(playerAudio.paused){ playerAudio.play(); playPauseBtn.textContent="⏸️"; }
    else { playerAudio.pause(); playPauseBtn.textContent="▶️"; }
};

// Close mini player
closePlayer.onclick = () => { miniPlayer.classList.add("hidden"); playerAudio.pause(); };

// Next/Prev buttons
nextBtn.onclick = () => { 
    currentIndex = (currentIndex+1)%songs.length; 
    playMiniPlayer(songs[currentIndex], currentIndex); 
};
prevBtn.onclick = () => { 
    currentIndex = (currentIndex-1+songs.length)%songs.length; 
    playMiniPlayer(songs[currentIndex], currentIndex); 
};

// Search button
searchBtn.onclick = async () => {
    const query = searchInput.value.trim();
    if(!query) return alert("Type something to search!");
    songs = await fetchSongs(query);
    renderSongs(songs);
};

// Playlist mapping: backend songs (your own DB)
const playlists = {
    "Top Hits": ["Shape of You", "Blinding Lights", "Levitating"],
    "Chill Vibes": ["Sunflower", "Lose You To Love Me", "Lovely"],
    "Workout": ["Eye of the Tiger", "Stronger", "Can't Hold Us"]
};

// Load playlist from backend
async function loadPlaylist(name) {
    highlightPlaylist(name);
    const songTitles = playlists[name];
    if(!songTitles) return;

    const res = await fetch("http://localhost:5000/api/songs");
    const backendSongs = await res.json();

    const filtered = backendSongs.filter(s => songTitles.includes(s.title));
    songs = filtered; // set global songs
    renderSongs(filtered);
}

// Highlight active playlist
function highlightPlaylist(name) {
    const links = document.querySelectorAll(".playlists a");
    links.forEach(link => {
        if (link.textContent === name) link.style.color = "#ff69b4";
        else link.style.color = "#b3b3b3";
    });
}

// Load default trending songs
fetchSongs("pop").then(res => { songs = res; renderSongs(res); });
