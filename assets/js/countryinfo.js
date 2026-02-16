document.getElementById("fetchInfo").addEventListener("click", onfetchInfo);

function onfetchInfo() {
  
  document.getElementById("content").innerHTML="";

  const country = document.getElementById("country").value;

  if (country) {
 
    const url = `https://restcountries.com/v3.1/name/${country}`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          document.getElementById("content").innerHTML = "Country not found";
          return;
        }
        return response.json();
      })
      .then((data) => {
        // noticed that abbreviations were matching to multiple countries, so handled this by taking the first entry [0] in the json file and evaluating
        // if it equals user input. If not, then request full country name. 
        if(data[0].name.common.toLowerCase() != country.toLowerCase()){
            document.getElementById("content").innerHTML = "Enter country full name"
            return;
            }
        renderData(data);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  } else {
    console.log("Please enter a country.");
    document.getElementById("content").innerHTML = "Please enter a country"
  }

  // clear the input value once button is clicked
  document.getElementById("country").value="";

}

const renderData = (country) => {

  country.forEach((countries) => {
    const countryFlagEl = document.getElementById("content");

    const countryFlag = countries.flags.png;
    const countryPopulation = countries.population;
    const countryRegion = countries.region;
    const countryCapital = countries.capital.join(", ");
    const countryLanguage = Object.values(countries.languages).join(", ");
    const countryMap = countries.maps.googleMaps;

    // added border to flag so visible, like japan
    // included all outputs in each loop so that content not overlapping when multiple countries returned
    countryFlagEl.innerHTML +=   `<img src=${countryFlag} class="border">
                                  <li>Population: ${countryPopulation}</li>
                                  <li>Region: ${countryRegion}</li>
                                  <li>Capital: ${countryCapital}</li>
                                  <li>Language: ${countryLanguage}</li>
                                  <li><a href=${countryMap} target="_blank" >Google Map</a></li>
                                  <br>`;

  });

};