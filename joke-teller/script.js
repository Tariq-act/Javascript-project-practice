const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// VoiceRSS Javascript SDK

function test() {}

// test();

// Disable / Enable
function toggleButton() {
  button.disabled = !button.disabled;
}

// Passing Joke to VoiceRss API
function tellMe(joke) {
  VoiceRSS.speech({
    key: '67ee2c7dcc134702a1ceb56f06ea5d4a',
    src: joke,
    hl: 'en-us',
    v: 'Linda',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false,
  });
}

// Get Joke from Joke API
async function getJokes() {
  let joke = '';
  const apiUrl =
    'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    // test(joke);
    // Text-to-speech
    tellMe(joke);
    // Disable button
    toggleButton();

    joke;
  } catch (error) {
    // Catch error
    console.log('whoops', error);
  }
}

button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
