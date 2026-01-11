const factElement = document.getElementById("fact");
const generateBtn = document.getElementById("generateBtn");

async function fetchFact() {
  console.log("Cerere trimisă către API");

  try {
    const response = await fetch(
      "https://uselessfacts.jsph.pl/random.json?language=en"
    );

    console.log("Răspuns primit");

    const data = await response.json();
    console.log("Date procesate:", data);

    factElement.textContent = data.text;
  } catch (error) {
    console.error("Eroare API:", error);
    alert("Nu s-a putut încărca fact-ul.");
  }
}

generateBtn.addEventListener("click", fetchFact);
