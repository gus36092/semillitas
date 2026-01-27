// Cargar carrito desde LocalStorage
const cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartBox = document.getElementById("cartItems");
const totalGeneral = document.getElementById("totalGeneral");

function renderCart() {

    cartBox.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {

        const subtotal = item.price * item.qty;
        total += subtotal;

        const div = document.createElement("div");
        div.classList.add("cart-item");

        div.innerHTML = `
            <div class="item-info">
                <strong>${item.name}</strong><br>
                $${item.price.toFixed(2)} c/u<br>
                Subtotal: $${subtotal.toFixed(2)}
            </div>

            <div class="qty-controls">
                <button onclick="decrease(${index})">-</button>
                <span>${item.qty}</span>
                <button onclick="increase(${index})">+</button>
            </div>
        `;
        
        cartBox.appendChild(div);
    });

    totalGeneral.textContent = `Total: $${total.toFixed(2)}`;
}

// Aumentar
window.increase = (i) => {
    cart[i].qty++;
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
};

// Disminuir
window.decrease = (i) => {
    if (cart[i].qty > 1) {
        cart[i].qty--;
    } else {
        cart.splice(i, 1);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
};

// Inicializar vista
renderCart();
