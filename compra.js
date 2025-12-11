// compra.js
(function() {

  const params = new URLSearchParams(window.location.search);

  const name = params.get('name') || 'Almendras';
  const price = params.get('price') || '$0.25 / unidad';
  const img = params.get('img') || 'img/almendras.png';
  const desc = params.get('desc') || 'Semilla nutritiva y saludable.';

  // Asignar valores
  document.getElementById('buyName').textContent = name;
  document.getElementById('buyPrice').textContent = price;
  document.getElementById('buyImg').src = img;
  document.getElementById('buyDesc').textContent = desc;

  // Abrir modal
  document.getElementById('confirmBtn').onclick = () => {
      document.getElementById('formModal').style.display = 'flex';
  };

  // Cerrar modal
  document.getElementById('closeForm').onclick = () => {
      document.getElementById('formModal').style.display = 'none';
  };

})();
