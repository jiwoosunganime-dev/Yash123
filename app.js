document.addEventListener('DOMContentLoaded', function () {
    var audioPlayer = document.getElementById('audioPlayer');
    var songList = document.getElementById('songList');
    var addSongForm = document.getElementById('addSongForm');

    function playSong(src) {
        audioPlayer.src = src;
        audioPlayer.style.display = 'block';
        audioPlayer.play();
    }

    // Bind play buttons using event delegation (no inline onclick)
    songList.addEventListener('click', function (e) {
        var button = e.target.closest('button[data-src]');
        if (button) {
            playSong(button.getAttribute('data-src'));
        }
    });

    addSongForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var title = document.getElementById('songTitle').value.trim();
        var artist = document.getElementById('artist').value.trim();
        var file = document.getElementById('audioFile').files[0];

        if (!title || !artist || !file) {
            return;
        }

        var url = URL.createObjectURL(file);

        // Build DOM nodes safely — no innerHTML, no risk of XSS
        var songItem = document.createElement('div');
        songItem.className = 'song-item';

        var infoDiv = document.createElement('div');

        var h3 = document.createElement('h3');
        h3.textContent = title;

        var p = document.createElement('p');
        p.textContent = 'Artist: ' + artist;

        infoDiv.appendChild(h3);
        infoDiv.appendChild(p);

        var playButton = document.createElement('button');
        playButton.textContent = 'Play';
        playButton.setAttribute('data-src', url);

        songItem.appendChild(infoDiv);
        songItem.appendChild(playButton);

        songList.appendChild(songItem);
        addSongForm.reset();
    });
});
