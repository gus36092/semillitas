let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const cartBox = document.getElementById("cartBox");

// Inicializar
updateCartDisplay();
updateButtonsState();

// -------------------------------
// AGREGAR PRODUCTOS AL CARRITO
// -------------------------------
document.querySelectorAll(".product-card").forEach(card => {
    const btn = card.querySelector(".addBtn");

    btn.addEventListener("click", () => {
        const name = card.dataset.name;
        const price = parseFloat(card.dataset.price);
        const img = card.dataset.img;
        const qty = parseInt(card.querySelector(".qtyInput").value);

        addToCart({ name, price, img, qty });
        updateButtonsState();
    });
});

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

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartDisplay() {
    let totalQty = cart.reduce((a, b) => a + b.qty, 0);
    let totalAmount = cart.reduce((a, b) => a + b.qty * b.price, 0);

    cartCount.textContent = totalQty;
    cartTotal.textContent = "$" + totalAmount.toFixed(2);
}

// Ir a compra
cartBox.onclick = () => {
    window.location.href = "compra.html";
};

// -------------------------------
// MARCAR BOTONES YA AGREGADOS
// -------------------------------
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
        } else {
            btn.textContent = "Agregar al carrito";
            btn.style.background = "#0a0f88";
            btn.style.color = "white";
        }
    });
}
