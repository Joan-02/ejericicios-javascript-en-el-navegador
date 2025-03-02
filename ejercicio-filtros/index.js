const products = [
    {
      name: 'Lavadora',
      category: 'hogar',
      price: 150
    },
    {
      name: 'Televisor',
      category: 'electronica',
      price: 300
    },
    {
      name: 'Camiseta',
      category: 'ropa',
      price: 20
    },
    {
      name: 'Nevera',
      category: 'hogar',
      price: 500
    },
    {
      name: 'Zapatos',
      category: 'ropa',
      price: 50
    },
    {
      name: 'Smartphone',
      category: 'electronica',
      price: 600
    }
];
  
// Función para mostrar los productos en la lista
function mostrarProductos(products) {
    const listaProductos = document.getElementById('listaProductos'); // Selecciona el contenedor
    listaProductos.innerHTML = ''; // Limpia la lista antes de mostrar los productos
  
    // Recorre el array de productos y crea un <li> para cada uno
    products.forEach((product) => {
      const li = document.createElement('li');
      li.className = 'product';
      li.innerText = `Nombre: ${product.name} 
                      Categoría: ${product.category} 
                      Precio: $${product.price}`;
      listaProductos.appendChild(li); // Añade el <li> a la lista
    });
};
  
// Función para filtrar los productos por categoría
function filtrarPorCategoria() {
    // Obtener los valores de los filtros
    const textInput = document.querySelector('#filtroNombre').value.toLowerCase(); // Valor del input de búsqueda
    const filterCategoria = document.querySelector('#filtroCategoria').value; // Valor del select de categoría
  
    // Filtrar el array de productos
    const productosFiltrados = products.filter((product) => {
      const coincideNombre = product.name.toLowerCase().includes(textInput); // Verifica si el nombre del producto incluye el texto que el usuario ha escrito en el input de búsqueda (textInput).
      const coincideCategoria = filterCategoria === '' || product.category === filterCategoria; // Coincide con la categoría
      return coincideNombre && coincideCategoria; // Ambas condiciones deben cumplirse
    });
  
    // Mostrar los productos filtrados
    mostrarProductos(productosFiltrados);
};
  
// Escuchar cambios en el input de búsqueda y en el select
document.querySelector('#filtroNombre').addEventListener('input', filtrarPorCategoria);
document.querySelector('#filtroCategoria').addEventListener('change', filtrarPorCategoria);
  
// Mostrar todos los productos al cargar la página
mostrarProductos(products);
   
// Escuchar cambios en el select
document.querySelector('#filtroCategoria').addEventListener('change', filtrarPorCategoria);