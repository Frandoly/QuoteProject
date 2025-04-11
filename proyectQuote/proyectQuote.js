const btnEl = document.getElementById("btn");
const apiURL = "http://api.quotable.io/random";
const quote = document.getElementById("quote");
const author = document.getElementById("author");

async function getQuote() {
  try {
    btnEl.innerText = "Loading...";
    btnEl.disabled = true;
    quote.innerText = "Coming over...";
    author.innerText = "On it's way";
    const response = await fetch(apiURL);
    const data = await response.json();
    const quoteContent = data.content;
    const quoteAuthor = data.author;
    quote.innerText = quoteContent;
    author.innerText = "~ " + quoteAuthor;
    btnEl.innerText = "Get a Quote";
    btnEl.disabled = false;
  } catch (error) {
    console.log(error);
    quote.innerText = "An error happend, try again later";
    author.innerText = "An error heppend";
    btnEl.innerText = "Get a Quote";
    btnEl.disabled = false;
  }
}
getQuote();
btnEl.addEventListener("click", getQuote);

const inputEl = document.getElementById("englishInput");
const infoText = document.getElementById("info-text");
const meaningCont = document.getElementById("meaning-container");
const title = document.getElementById("title");
const meaning = document.getElementById("meaning");
const audioEl = document.getElementById("audio");

async function fetchAPI(word) {
  try {
    infoText.style.display = "block";
    meaningCont.style.display = "none";
    infoText.innerText = `Searching the meaning "${word}"`;
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const result = await fetch(url).then((res) => res.json());

    if (result.title) {
      meaningCont.style.display = "block";
      infoText.style.display = "none";
      title.innerText = word;
      meaning.innerText = "N/A";
      audioEl.style.display = "none";
    } else {
      infoText.style.display = "none";
      meaningCont.style.display = "block";
      audioEl.style.display = "inline-flex";
      title.innerText = result[0].word;
      meaning.innerText = result[0].meanings[0].definitions[0].definition;
      audioEl.src = result[0].phonetics[0].audio;
    }
  } catch (error) {
    console.log(error);
    infoText.innerText = `An error happend, try again later!`;
  }
}

inputEl.addEventListener("keyup", (e) => {
  if (e.target.value && e.key === "Enter") {
    fetchAPI(e.target.value);
  }
});
