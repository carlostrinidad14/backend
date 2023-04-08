const socketClient = io();
socketClient.on("message0", (data) => {
  console.log(data);
});

socketClient.on("message1", (data) => {
  console.log(data);
});

socketClient.on("message2", (data) => {
  console.log(data);
});

socketClient.on("message3", (data) => {
  console.log(data);
});

socketClient.on("message4", (data) => {
  console.log(data);
});

//Recupero datos del formulario en la vista
const form = document.querySelector("#create-product-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = document.querySelector("#product-title").value;
  const description = document.querySelector("#product-description").value;
  const code = document.querySelector("#product-code").value;
  const price = document.querySelector("#product-price").value;
  const stock = document.querySelector("#product-stock").value;
  const category = document.querySelector("#product-category").value;
  const thumbnail = document.querySelector("#product-category").value;

  const product = {
    title,
    description,
    code,
    price,
    status: true,
    stock,
    category,
    thumbnail,
  };
  // Envio datos del formulario al server
  socketClient.emit("createProduct", product);
  form.reset();
});

// Escucho para actualizar  la tabla
socketClient.on("product-list", (products) => {
  console.log(products);
  const productTable = document.querySelector("#product-table tbody");
  productTable.innerHTML = "";
  console.log(products);
  products.forEach((product) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${product.title}</td><td>$${product.price}</td><td><button class="delete-product" data-id="${product._id}">Borrar</button></td>`;
    productTable.appendChild(tr);
  });
});

const productTable = document.querySelector("#product-table tbody");
productTable.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-product")) {
    const id = event.target.dataset.id;
    //emit para deletear producto

    socketClient.emit("deleteProduct", { _id: id });
  }
});
