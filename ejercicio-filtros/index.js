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
  }
  
  // Función para filtrar los productos por categoría
  function filtrarPorCategoria() {
    const filterSelect = document.querySelector('#filtroCategoria'); // Selecciona el select
    const categoriaSeleccionada = filterSelect.value; // Obtiene el valor seleccionado
  
    // Filtra el array de productos
    const productosFiltrados = products.filter((product) => {
      if (categoriaSeleccionada === '') {
        return true; // Incluir todos los productos
      } else {
        return product.category === categoriaSeleccionada; // Filtrar por categoría
      }
    });
  
    // Muestra los productos filtrados
    mostrarProductos(productosFiltrados);
  }
  
  // Mostrar todos los productos al cargar la página
  mostrarProductos(products);
  
  // Escuchar cambios en el select
  document.querySelector('#filtroCategoria').addEventListener('change', filtrarPorCategoria);