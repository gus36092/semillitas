function openForm() {
    document.getElementById("formModal").style.display = "flex";
}

document.getElementById("closeForm").onclick = () => {
    document.getElementById("formModal").style.display = "none";
};

document.getElementById("sendOrder").onclick = () => {

    const name = document.getElementById("userName").value;
    const area = document.getElementById("userArea").value;
    const qty = document.getElementById("qty").value;
    const product = document.getElementById("buyName").textContent;

    if (!name || !area) {
        alert("Completa todos los campos.");
        return;
    }

    const message = 
`Hola, quiero realizar un pedido:

Nombre: ${name}
Área: ${area}
Producto: ${product}
Cantidad: ${qty}`;

    const phone = "50376818814";  // ← tu número aquí
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
};

