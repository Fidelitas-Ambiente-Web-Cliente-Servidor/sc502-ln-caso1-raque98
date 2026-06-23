
//Cons menu en donde se guardan los diferentes platillos junto con su descripcion, precio y categorias
const menu = [
  { nombre: 'Bruschetta Clásica', descripcion: 'Pan tostado con tomate y albahaca fresca', precio: 4500, categoria: 'Entradas', imagen: "img/bruschetta.avif" },
  { nombre: 'Tabla de Quesos', descripcion: 'Selección de quesos importados con mermelada', precio: 7800, categoria: 'Entradas', imagen: "img/tabla-quesos.jpg" },
  { nombre: 'Lomo al Vino Tinto', descripcion: 'Lomo de res en reducción de vino tinto', precio: 15500, categoria: 'Platos Fuertes', imagen: "img/lomo-vino.webp" },
  { nombre: 'Pasta Carbonara', descripcion: 'Pasta con tocino, huevo y queso parmesano', precio: 10200, categoria: 'Platos Fuertes', imagen: "img/carbonara.jpg" },
  { nombre: 'Salmón a la Plancha', descripcion: 'Filete de salmón con vegetales al vapor', precio: 13800, categoria: 'Platos Fuertes', imagen: "img/salmon.jpg" },
  { nombre: 'Tiramisú', descripcion: 'Postre italiano con café y mascarpone', precio: 5200, categoria: 'Postres', imagen: "img/Tiramisu.jpg" },
  { nombre: 'Cheesecake de Maracuyá', descripcion: 'Cheesecake cremoso con coulis de maracuyá', precio: 4800, categoria: 'Postres', imagen: "img/Cheesecake.webp" }
];

//Arreglo reservas para guardas las reservas realizadas.
let reservas = [];

//lets para traer los ID de index.html
let contenedor = document.getElementById('Contenedor-tarjetas');
let formReserva = document.getElementById('formReserva');
let nombre = document.getElementById('nombre');
let correo = document.getElementById('correo');
let fecha = document.getElementById('fecha');
let hora = document.getElementById('hora');
let personas = document.getElementById('personas');
let btnEnviar = document.getElementById('btnEnviar');
let tablaReservas = document.getElementById('tablaReservas');
let resumenReservas = document.getElementById('resumenReservas');


/*Funcion renderMenu(): Se construyen las tajetas mediante un ciclo for con una longitud de la cantidad de platillos agregados en el arreglo menu. Se toman los classnames basados
en el codigo html de bootstrap de cards, cada classname se llena con un atributo establecido previamente en el arreglo menu en donde el contenido e cada uno será visible
*/
function renderMenu(listaPlatos = menu) {
  contenedor.innerHTML = '';

  for (let i = 0; i < listaPlatos.length; i++) {
    let tarjeta = document.createElement('div');
    tarjeta.className = 'card shadow card-plato';


    let cuerpo = document.createElement('div');
    cuerpo.className = 'card-body';

    let titulo = document.createElement('h5');
    titulo.className = 'card-title';
    titulo.textContent = listaPlatos[i].nombre;

    let imagen = document.createElement("img");
    imagen.src = listaPlatos[i].imagen;
    imagen.className = "card-img-top imagen-card";

    let categoria = document.createElement('span');
    categoria.className = 'etiqueta-categoria';
    categoria.textContent = listaPlatos[i].categoria;

    let descripcion = document.createElement('p');
    descripcion.className = 'card-text';
    descripcion.textContent = listaPlatos[i].descripcion;

    let precio = document.createElement('p');
    precio.className = 'precio-plato';
    precio.textContent = '₡' + listaPlatos[i].precio.toLocaleString('es-CR');

    cuerpo.appendChild(titulo);
    cuerpo.appendChild(categoria);
    cuerpo.appendChild(descripcion);
    cuerpo.appendChild(precio);

    tarjeta.appendChild(imagen);
    tarjeta.appendChild(cuerpo);
    contenedor.appendChild(tarjeta);
  }
}

/*Funcion filtrarCategoria() en donde mediante el document.query, se extrae la clase boton-filtro de index.html en donde estan presente las categorias del menu. Mediante ciclos for, el boton que se selecciona pasa 
a "activo", provocando que mediante el classlist.remove, el boton anterior junto con los que no se han seleccionado, no se muestren resaltado. Si se da click a todos, muestra todos los platillos, con la condicinal if y else, 
filtra las categorias en base a la informacion proporcionada en la funcion render()menu.
*/
function filtrarCategoria(categoriaSeleccionada, botonSeleccionado) {
  let botones = document.querySelectorAll('.boton-filtro');

  for (let i = 0; i < botones.length; i++) {
    botones[i].classList.remove('activo');
  }

  if (botonSeleccionado) {
    botonSeleccionado.classList.add('activo');
  }

  if (categoriaSeleccionada === 'Todos') {
    renderMenu(menu);
  } else {
    let filtrados = menu.filter(function (plato) {
      return plato.categoria === categoriaSeleccionada;
    });

    renderMenu(filtrados);
  }
}
/* Funcion validarFormulario() se encarga de validar de que todos los campos obligatrios del formulario de reservas esten validos. Usa regex  para validar nombre y correo.
Revida que el nombre no este vacio, tenga 5 caracteres y que tenga solo letras y espacios mediante condicionales if, else. Hace una funcion similar con fecha, validando que sea obligatoria
y que no sea pasada. Finalmene para la cantidad de personas, valida que sea obligatorio agregarlas y que sean entre 1 y 20. Con el "let valido", verifica que el botón "enviar reserva" permanezca desabilitado si una o mas
de las condiciones habilitadas previamente no se cumple. 
*/
function validarFormulario() {
  let valido = true;

  document.getElementById('errorNombre').textContent = '';
  document.getElementById('errorCorreo').textContent = '';
  document.getElementById('errorFecha').textContent = '';
  document.getElementById('errorPersonas').textContent = '';

  let regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
  let regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (nombre.value.trim() === '') {
    document.getElementById('errorNombre').textContent = 'El nombre es obligatorio.';
    valido = false;
  } else if (nombre.value.trim().length < 5) {
    document.getElementById('errorNombre').textContent = 'El nombre debe tener mínimo 5 caracteres.';
    valido = false;
  } else if (!regexNombre.test(nombre.value.trim())) {
    document.getElementById('errorNombre').textContent = 'El nombre solo puede contener letras y espacios.';
    valido = false;
  }

  if (correo.value.trim() === '') {
    document.getElementById('errorCorreo').textContent = 'El correo es obligatorio.';
    valido = false;
  } else if (!regexCorreo.test(correo.value.trim())) {
    document.getElementById('errorCorreo').textContent = 'Ingrese un correo válido.';
    valido = false;
  }

  if (fecha.value === '') {
    document.getElementById('errorFecha').textContent = 'La fecha es obligatoria.';
    valido = false;
  } else {
    let fechaSeleccionada = new Date(fecha.value + 'T00:00:00');
    let hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    if (fechaSeleccionada < hoy) {
      document.getElementById('errorFecha').textContent = 'La fecha no puede ser pasada.';
      valido = false;
    }
  }

  if (personas.value === '') {
    document.getElementById('errorPersonas').textContent = 'El número de personas es obligatorio.';
    valido = false;
  } else if (Number(personas.value) < 1 || Number(personas.value) > 20) {
    document.getElementById('errorPersonas').textContent = 'Debe ser entre 1 y 20 personas.';
    valido = false;
  }

  btnEnviar.disabled = !valido;
  return valido;
}
/*
funcion agregarReserva()  llama a la funcion validarFormulario(), para asegurarse de que todas las condiciones establedas en dicha funcion se cumplan. Si hay errores, no se ejecuta. Si es valido,
se hace un  nuevo objeto llamado nuevaReserva, en donde se reflejan los datos registrados guardados en el arreglo "reservas". Con la tabla "tr" de index.html, se crean todas las celdas en donde ira cada reserva registrada, y si 
la reserva es para 6 o más personas, la celda se resaltará con un color distinto. Al final, se limpia el formulario y el botón vuelve a estar deshabilitado.
*/
function agregarReserva(event) {
  event.preventDefault();

  if (!validarFormulario()) {
    return;
  }

  let nuevaReserva = {
    nombre: nombre.value.trim(),
    correo: correo.value.trim(),
    fecha: fecha.value,
    hora: hora.value,
    personas: Number(personas.value)
  };

  reservas.push(nuevaReserva);

  let fila = document.createElement('tr');
  fila.className = 'fila-reserva';

  if (nuevaReserva.personas >= 6) {
    fila.classList.add('resaltado');
  }

  let celdaNombre = document.createElement('td');
  celdaNombre.textContent = nuevaReserva.nombre;

  let celdaCorreo = document.createElement('td');
  celdaCorreo.textContent = nuevaReserva.correo;

  let celdaFecha = document.createElement('td');
  celdaFecha.textContent = nuevaReserva.fecha;

  let celdaHora = document.createElement('td');
  celdaHora.textContent = nuevaReserva.hora;

  let celdaPersonas = document.createElement('td');
  celdaPersonas.textContent = nuevaReserva.personas;

  fila.appendChild(celdaNombre);
  fila.appendChild(celdaCorreo);
  fila.appendChild(celdaFecha);
  fila.appendChild(celdaHora);
  fila.appendChild(celdaPersonas);

  tablaReservas.appendChild(fila);

  formReserva.reset();
  btnEnviar.disabled = true;
  actualizarResumen();
}
/*
funcion actualizarResumen() primero obtiene el total de reservas registradas, mediante el ciclo for suma la cantidad de personas que se esperan e identifica la reserva con mayor cantidad de persinas. Luego se muestran 
los datos dentro de la seccion del resumen de la página.
*/
function actualizarResumen() {
  let totalReservas = reservas.length;
  let totalPersonas = 0;
  let mayorReserva = 0;

  for (let i = 0; i < reservas.length; i++) {
    totalPersonas += reservas[i].personas;

    if (reservas[i].personas > mayorReserva) {
      mayorReserva = reservas[i].personas;
    }
  }

  resumenReservas.innerHTML = `
    <p><strong>Total de reservas registradas:</strong> ${totalReservas}</p>
    <p><strong>Total de personas esperadas:</strong> ${totalPersonas}</p>
    <p><strong>Reserva con mayor número de personas:</strong> ${mayorReserva}</p>
  `;
}

nombre.addEventListener('input', validarFormulario);
correo.addEventListener('input', validarFormulario);
fecha.addEventListener('input', validarFormulario);
personas.addEventListener('input', validarFormulario);
formReserva.addEventListener('submit', agregarReserva);

renderMenu(menu);
actualizarResumen();
