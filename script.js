let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const cartBox = document.getElementById("cartBox");

updateCartDisplay();

// Agregar al carrito
document.querySelectorAll(".product-card").forEach(card => {
const btn = card.querySelector(".addBtn");


btn.addEventListener("click", () => {
    const name = card.dataset.name;
    const price = parseFloat(card.dataset.price);
    const img = card.dataset.img;
    const qty = parseInt(card.querySelector(".qtyInput").value);

    addToCart({ name, price, img, qty });
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

cartBox.onclick = () => {
window.location.href = "compra.html";
};
