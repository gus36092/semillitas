let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const cartBox = document.getElementById("cartBox");

// Inicializar vista
updateCartDisplay();
updateButtonsState();
updateProductCounters();

// ------------------------------------------
// AGREGAR PRODUCTOS AL CARRITO
// ------------------------------------------
document.querySelectorAll(".product-card").forEach(card => {

    const btn = card.querySelector(".addBtn");   
    const qtyInput = card.querySelector(".qtyInput");

    btn.addEventListener("click", () => {

        const name = card.dataset.name;
        const price = parseFloat(card.dataset.price);
        const img = card.dataset.img;
        const qty = parseInt(qtyInput.value);

        addToCart({ name, price, img, qty });

        updateButtonsState();
        updateProductCounters();
    });
});

// Agregar / acumular producto
function addToCart(product) {
    const existing = cart.find(p => p.name === product.name);

    if (existing) {
        existing.qty += product.qty;
    } else {
        cart.push(product);
    }

    saveCart();
    updateCartDisplay();
}

// Guardar
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Actualizar datos en el header
function updateCartDisplay() {
    let totalQty = cart.reduce((a, b) => a + b.qty, 0);
    let totalAmount = cart.reduce((a, b) => a + b.qty * b.price, 0);

    cartCount.textContent = totalQty;
    cartTotal.textContent = "$" + totalAmount.toFixed(2);
}

// Ir al carrito (compra.html)
cartBox.onclick = () => {
    window.location.href = "compra.html";
};

// --------------------------------------------------
// MARCAR BOTONES COMO “AÑADIDO ✓”
// --------------------------------------------------
function updateButtonsState() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    document.querySelectorAll(".product-card").forEach(card => {

        const name = card.dataset.name;
        const btn = card.querySelector(".addBtn");

        const exists = cart.some(item => item.name === name);

        if (exists) {
            btn.textContent = "Añadido ✓";
            btn.style.background = "#1b8f3a";
            btn.style.color = "white";
            btn.style.border = "2px solid #145e2b";
        } else {
            btn.textContent = "Agregar al carrito 🛒";
            btn.style.background = "#0a0f88";
            btn.style.color = "white";
            btn.style.border = "none";
        }
    });
}

// --------------------------------------------------
// CONTADOR (3) A LA PAR DEL BOTÓN
// --------------------------------------------------
function updateProductCounters() {

    document.querySelectorAll(".product-card").forEach(card => {

        const name = card.dataset.name;
        const btn = card.querySelector(".addBtn");

        // Buscar producto en carrito
        const product = cart.find(item => item.name === name);

        // Si ya existe el contador, lo eliminamos para regenerarlo
        const oldBadge = card.querySelector(".qtyBadge");
        if (oldBadge) oldBadge.remove();

        if (product) {
            const badge = document.createElement("span");
            badge.className = "qtyBadge";
            badge.textContent = `(${product.qty})`;

            // Estilo del numerito
            badge.style.marginLeft = "8px";
            badge.style.background = "#145e2b";
            badge.style.color = "white";
            badge.style.padding = "3px 7px";
            badge.style.borderRadius = "6px";
            badge.style.fontSize = "13px";
            badge.style.verticalAlign = "middle";

            btn.after(badge);
        }
    });
}
