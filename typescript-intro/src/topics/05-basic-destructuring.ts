
interface AudioPlayer {
    audioVolume: number
    songDuration: number
    song: string
    details: Details
}

interface Details {
    year: number
    author: string
}

const details: Details = {
    year: 1992,
    author: 'fuwa'
}

const audioPlayer: AudioPlayer = {
    audioVolume: 90,
    songDuration: 36,
    song: "Fuwa",
    details: details
}

const { song: anotherSong, songDuration: anotherSongDuration, details: anotherDetails } = audioPlayer;
const { author: anotherAuthor } = anotherDetails;
//onsole.log(anotherSong)
//console.log(anotherAuthor)

const dbz: string[] = ['Goku', 'Vegeta', 'Trunks']
const [, , trunks] = dbz


console.log(`Personaje 3: ${trunks}`)




export { };