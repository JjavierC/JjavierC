// Array para guardar los productos del carrito
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Función para guardar el carrito en localStorage
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Mostrar mensaje de confirmación al añadir un producto
function showAddedToCartMessage(productName) {
    const message = document.createElement("div");
    message.className = "added-to-cart";
    message.textContent = `Añadido al carrito: ${productName}`;
    document.body.appendChild(message);

    setTimeout(() => message.classList.add("visible"), 10);
    setTimeout(() => {
        message.classList.remove("visible");
        setTimeout(() => message.remove(), 500);
    }, 2000);
}

// Función para agregar productos al carrito
function addToCart(productName, productPrice, productImage) {
    const existingProduct = cart.find(product => product.name === productName);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1, image: productImage });
    }
    saveCart();
    updateCartUI();
    showAddedToCartMessage(productName);
}

// Función para actualizar la interfaz del carrito
function updateCartUI() {
    const cartItemsContainer = document.querySelector(".cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");

    cartItemsContainer.innerHTML = "";

    let totalItems = 0;
    let totalPrice = 0;

    cart.forEach(product => {
        totalItems += product.quantity;
        totalPrice += product.quantity * product.price;

        const itemElement = document.createElement("div");
        itemElement.className = "cart-item";
        itemElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <p>${product.name} x${product.quantity} - $${product.price * product.quantity} COP</p>
            <button onclick="removeFromCart('${product.name}')">Eliminar</button>
        `;
        cartItemsContainer.appendChild(itemElement);
    });

    cartCount.textContent = totalItems;
    cartTotal.textContent = totalPrice;
}

// Función para eliminar un producto del carrito
function removeFromCart(productName) {
    const productIndex = cart.findIndex(product => product.name === productName);
    if (productIndex > -1) {
        cart[productIndex].quantity--;
        if (cart[productIndex].quantity === 0) {
            cart.splice(productIndex, 1);
        }
    }
    saveCart();
    updateCartUI();
}

// Función para vaciar todo el carrito
function clearCart() {
    cart = [];
    saveCart();
    updateCartUI();
}

// Mostrar el carrito al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    const cartMenu = document.getElementById("cart");
    const cartIcon = document.querySelector(".cart-icon-container");

    cartIcon.addEventListener("mouseover", () => {
        cartMenu.classList.add("visible");
    });

    cartMenu.addEventListener("mouseleave", () => {
        cartMenu.classList.remove("visible");
    });

    updateCartUI();
    document.addEventListener("DOMContentLoaded", () => {
        const cartIcon = document.querySelector(".cart-icon-container");
        const cartMenu = document.getElementById("cart");
    
        // Función para abrir el menú con animación
        function openCartMenu() {
            cartMenu.classList.add("visible");
        }
    
        // Función para cerrar el menú con animación
        function closeCartMenu() {
            cartMenu.classList.remove("visible");
        }
    
        // Abre el menú al pasar el mouse sobre el ícono
        cartIcon.addEventListener("mouseover", openCartMenu);
    
        // Cierra el menú al mover el mouse fuera del menú
        cartMenu.addEventListener("mouseleave", closeCartMenu);
    });
    
});


;
let slideIndex = 1;
showSlides(slideIndex);

// Cambiar el slide actual (prev/next)
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Mostrar el slide específico
function currentSlide(n) {
    showSlides(slideIndex = n);
}

// Función principal para mostrar slides
function showSlides(n) {
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");

    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

// Iniciar auto-play
let autoPlay = setInterval(() => {
    plusSlides(1);
}, 5000);

// Detener auto-play al pasar el mouse
const container = document.querySelector('.slideshow-container');
container.addEventListener('mouseover', () => clearInterval(autoPlay));
container.addEventListener('mouseout', () => {
    autoPlay = setInterval(() => {
        plusSlides(1);
    }, 5000);
});
