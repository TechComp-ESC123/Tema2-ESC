// Selectare elemente din DOM
const factParagraph = document.getElementById("fact");
const generateBtn = document.getElementById("generateBtn");
const metadataList = document.getElementById("metadata-list");
const statusBadge = document.getElementById("status-badge");

// API URL
const API_URL = "https://uselessfacts.jsph.pl/random.json?language=en";

async function fetchUselessFact() {
  // 1. Pregătire UI (Loading State)
  console.log("🚀 Initiating request to Useless Facts API...");
  generateBtn.disabled = true;
  generateBtn.textContent = "Loading...";
  factParagraph.textContent = "Fetching data...";
  statusBadge.classList.add("hidden"); // Reset badge

  try {
    // 2. Fetch Data
    const startTime = Date.now();
    const response = await fetch(API_URL);
    
    // Logare status rețea (Bonus Monitoring)
    console.log(`📡 Response Status: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const data = await response.json();
    const duration = Date.now() - startTime;
    console.log(`✅ Data received successfully in ${duration}ms:`, data);

    // 3. Actualizare DOM

    // A. Text Principal
    factParagraph.textContent = data.text;

    // B. Element Vizual (Badge) - Logică dinamică
    // Dacă textul e scurt (<60 caractere) e un "Quick Fact", altfel e "Deep Knowledge"
    statusBadge.classList.remove("hidden");
    statusBadge.className = "badge success"; // Reset classes
    if (data.text.length < 60) {
        statusBadge.textContent = "⚡ Quick Fact";
    } else {
        statusBadge.textContent = "🧠 Deep Knowledge";
    }

    // C. Element Listă (Structurat) - Populat dinamic din datele API
    metadataList.innerHTML = `
        <li><strong>Source:</strong> ${data.source || "Unknown"}</li>
        <li><strong>Permalink ID:</strong> ${data.id}</li>
        <li><strong>Length:</strong> ${data.text.length} characters</li>
    `;

  } catch (error) {
    // Tratare Erori
    console.error("❌ Error fetch execution:", error);
    factParagraph.textContent = "⚠️ Failed to load a fact. Please check your internet connection.";
    statusBadge.textContent = "Error";
    statusBadge.className = "badge"; // remove success style
    statusBadge.classList.remove("hidden");
    
    // Afisare eroare in UI (Optional dar recomandat)
    alert("Oops! Ceva nu a mers bine. Verifica consola pentru detalii.");
  } finally {
    // 4. Resetare UI
    generateBtn.disabled = false;
    generateBtn.textContent = "Generate Fact";
    console.log("🏁 Request cycle finished.");
  }
}

// Event Listener
generateBtn.addEventListener("click", fetchUselessFact);

// Load one fact on start (optional)
// fetchUselessFact();
