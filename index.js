const quoteText = document.getElementById("quote-text");
const quoteInfo = document.getElementById("quote-info");
const authorText = document.getElementById("author-text");
const twitterBtn = document.getElementById("twitter");
const search = document.querySelector(".search");
const googleButton = document.querySelector(".google-button");

fetch(
  "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"
)
  .then((res) => res.json())
  .then((data) => {
    document.body.style.backgroundImage = `url(${data.urls.regular})`;
    document.getElementById(
      "photog"
    ).textContent = `photo by: ${data.user.name}`;
  })
  .catch((err) => {
    // Use a default background image/author
    document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080
)`;
    document.getElementById("photog").textContent = `By: Dodi Achmad`;
  });

function getCurrentTime() {
  const date = new Date();
  document.getElementById("time").textContent = date.toLocaleTimeString(
    "en-us",
    { timeStyle: "short" }
  );
}

setInterval(getCurrentTime, 1000);

navigator.geolocation.getCurrentPosition((position) => {
  fetch(
    `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`
  )
    .then((res) => {
      if (!res.ok) {
        throw Error("Weather data not available");
      }
      return res.json();
    })
    .then((data) => {
      const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      document.getElementById("weather").innerHTML = `
                <img src=${iconUrl} />
                <p class="weather-temp">${Math.round(data.main.temp)}º</p>
                <p class="weather-city">${data.name}</p>
            `;
    })
    .catch((err) => console.error(err));
});

let randomQuoteNumber = Math.floor(Math.random() * 1643);
console.log(randomQuoteNumber);

fetch("https://type.fit/api/quotes")
  .then((res) => {
    if (!res.ok) {
      throw Error("Problem loading quote");
    }
    return res.json();
  })
  .then(function (data) {
    quoteText.innerText = `${data[randomQuoteNumber].text}`;
    authorText.innerText = `${data[randomQuoteNumber].author}`;
    if (data[randomQuoteNumber].author === null) {
      authorText.innerText = "Unknown";
    } else {
      authorText.innerText = `${data[randomQuoteNumber].author}`;
    }
    console.log(data[1642].text);
  })
  .catch((err) => console.error(err));

// quoteText.addEventListener("mouseenter", function (e) {
//   if (e) {
//     quoteInfo.style.display = "block";
//   } else {
//     quoteInfo.style.display = "none";
//   }
// });

// Tweet Quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
}

// Event Listeners
twitterBtn.addEventListener("click", tweetQuote);

//Clear search bar
googleButton.addEventListener("click", function () {
  setTimeout(() => {
    search.value = "";
  }, 1000);
});
