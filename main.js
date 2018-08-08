let genre;
let song;
let gif;

const spotifyURL = "https://api.spotify.com/v1/";
const giphyURL = "http://api.giphy.com/v1";
const spotifyKey = "BQB96FVHVYEvTImZE0Ylcs5oNzmhjY1cqsrOg9AA9CH87vu2Xfjn4XXGJ9-z0_ISjOuy_svCfgJGFaSE4MrQDM8Q1G7_iMsA6vxmkbIn8QfCDTCmSg48DqtLEYW5JuVUneD3J0G1lRB7U1O3T1nWJ3IOewsd";
const giphyKey = "tya8vLtkIDsL4XmmbwtciALS5hN2Fkxh";


const submit = document.getElementById("submit");
const menu = document.getElementById("dropdown");
const disp = document.getElementById("song");

submit.addEventListener('click', async function(e){
    e.preventDefault();
    console.log(menu.value);
    let song = await getSong(menu.value); 
    console.log(song);    
    console.log(song.tracks[0].name);
    let gif = await getGif(song.tracks[0].name);
    console.log(gif);
    let gifDisp = document.createElement("iframe");
    gifDisp.src = gif;
    let title = song.tracks[0].name;
    let albumUrl = song.tracks[0].external_urls.spotify;
    let titleDisp = document.createElement("a");
    titleDisp.href = albumUrl;
    titleDisp.innerHTML = title;
    disp.innerHTML = "";
    disp.appendChild(gifDisp);
    disp.appendChild(titleDisp);
});


let spotifyData = {
    method: "GET", // this is us getting info from the API
    headers: {
        "Content-Type": "application/json", // these two lines let tghe browser know what kind of thing you are making. in this case it is an app and it uses json
        "Accept": "application/json",
        "Authorization": "Bearer " + spotifyKey 
    }
}
// The header's purpose is to give info to the link. It proves that you are registered to reach that data
// the bottom line reads as fetch(base_address + id of what you wanna access + proof that you are worthy)
fetch(spotifyURL + "recommendations/available-genre-seeds", spotifyData).then((res) => {
    return res.json();
}).then((json) => { 
    console.log(json);
    genre = json;
    genOption(); // function that mess with json info must happen within the function or else it does not exist for the function to take it in to.
});

async function getSong(genre){
    let response = await fetch(spotifyURL + "recommendations?seed_genres=" + genre, spotifyData);
    return await response.json();
}


async function getGif(search){
    let giphyReqUrl = giphyURL + `/gifs/search?q=${search}&api_key=${giphyKey}`;
    let response = await fetch(giphyReqUrl);
    let gifs = await response.json();
    console.log(gifs);
    return gifs.data[0].embed_url;
}


function genOption(){
    let list = document.getElementById("dropdown");
    for(let i = 0; i < genre.genres.length; i++){
        let option = document.createElement("option");
        option.innerText = genre.genres[i];
        list.appendChild(option);
    }
}

