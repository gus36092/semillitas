const API_KEY = 'uAGhuvTu6O1lsLYwu53L37EKi7CmiiYFZEhoZA1X';

// Mejores nombres de búsqueda
const seedApiNames = {
  almonds: 'Almonds, raw',
  peanuts: 'Peanuts, raw',
  cashews: 'Cashew nuts, raw',
  pistachios: 'Pistachio nuts, raw',
  pepitoria: 'Pumpkin seeds, raw',
  chia: 'Chia seeds, dried',
  sesamo: 'Sesame seeds, whole, dried',
  girasol: 'Sunflower seeds, raw',
  avellanas: 'Hazelnuts, raw'
};

// Beneficios personalizados
const seedBenefits = {
  almonds: "Ricas en vitamina E, buenas para la piel y el corazón.",
  peanuts: "Altas en proteínas, aportan energía y saciedad.",
  cashews: "Fuente de magnesio y grasas saludables para el sistema nervioso.",
  pistachios: "Mejoran salud cardiovascular y aportan fibra.",
  pepitoria: "Ricas en zinc, fortalecen el sistema inmune.",
  chia: "Altísima en fibra y omega-3, ayuda a la digestión.",
  sesamo: "Una de las mejores fuentes de calcio vegetal.",
  girasol: "Ricas en vitamina E, antioxidantes potentes.",
  avellanas: "Benefician el corazón y reducen inflamación."
};


// Nutrientes importantes que sí queremos mostrar
const KEY_NUTRIENTS = [
    "energy",
    "protein",
    "total lipid (fat)",
    "fiber, total dietary",
    "carbohydrate, by difference",
    "vitamin e (alpha-tocopherol)",
    "calcium, ca",
    "iron, fe"
];


async function fetchSeedData(seedName) {
    try {
        const searchRes = await fetch(
            `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${API_KEY}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    query: seedName,
                    dataType: ["Foundation", "SR Legacy"],
                    pageSize: 5
                })
            }
        );

        const searchJson = await searchRes.json();
        if (!searchJson.foods || searchJson.foods.length === 0) return null;

        const selected = searchJson.foods.find(f => f.foodNutrients?.length > 0)
                      || searchJson.foods[0];

        const fdcId = selected.fdcId;

        const detailsRes = await fetch(
            `https://api.nal.usda.gov/fdc/v1/food/${fdcId}?api_key=${API_KEY}`
        );

        const detailsJson = await detailsRes.json();

        const nutrients = {};
        detailsJson.foodNutrients.forEach(n => {
            const name = n.nutrientName?.toLowerCase();
            if (KEY_NUTRIENTS.includes(name)) {
                nutrients[name] = `${n.value} ${n.unitName}`;
            }
        });

        return {
            title: selected.description,
            nutrients
        };

    } catch (err) {
        console.error("Error USDA:", err);
        return null;
    }
}


// Al hacer clic en cualquier tarjeta
document.querySelectorAll(".product-card").forEach(card => {
    card.addEventListener("click", async () => {

        // Mostrar "Cargando…"
        document.getElementById("modalNutrition").innerHTML = "<p class='loading'>Cargando datos...</p>";
        document.getElementById("modalBenefits").textContent = "";
        document.getElementById("modalTitle").textContent = "Cargando...";
        document.getElementById("modalImg").src = "";
        document.getElementById("infoModal").style.display = "flex";

        const item = card.dataset.item;
        const seedNameForApi = seedApiNames[item];

        const seedData = await fetchSeedData(seedNameForApi);

        if (!seedData) {
            document.getElementById("modalNutrition").innerHTML = "No hay datos nutricionales.";
            return;
        }

        // Imagen local
        document.getElementById("modalImg").src = `img/${item}.png`;

        // Título limpio
        document.getElementById("modalTitle").textContent = seedData.title;

        // Nutrientes formateados
        let html = "";
        for (const [key, value] of Object.entries(seedData.nutrients)) {
            html += `<div><span>${key}:</span> ${value}</div>`;
        }

        document.getElementById("modalNutrition").innerHTML = html;

        // Beneficios
        document.getElementById("modalBenefits").textContent = seedBenefits[item];
    });
});


// Cerrar modal
document.querySelector(".close").onclick = () => {
    document.getElementById("infoModal").style.display = "none";
};
window.onclick = e => {
    if (e.target === document.getElementById("infoModal")) {
        document.getElementById("infoModal").style.display = "none";
    }
};

//boton compra
document.getElementById("buyButton").onclick = () => {
    window.location.href = "compra.html";
};


