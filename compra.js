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

// Enviar pedido a Firebase
document.getElementById("sendOrder").onclick = async () => {
    const name = document.getElementById("userName").value;
    const area = document.getElementById("userArea").value;
    const carrito = JSON.parse(localStorage.getItem("cart")) || [];

    if (!name || !area) {
        alert("Completa todos los campos.");
        return;
    }

    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    const pedido = {
        nombre: name,
        area: area,
        productos: carrito,
        fecha: new Date().toISOString()
    };

    const pedidosRef = ref(db, "pedidos");
    await push(pedidosRef, pedido);

    alert("Pedido enviado correctamente.");

    // limpiar carrito
    localStorage.removeItem("cart");

    // volver al inicio
    window.location.href = "index.html";
};

