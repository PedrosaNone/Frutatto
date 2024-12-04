// Função para inicializar o carrinho
function initializeCart() {
    const cartLink = document.querySelector('.cart-link');
    const cartDropdown = document.querySelector('.cart-dropdown');
    const cartItems = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.total-value');
    const clearCartBtn = document.querySelector('.clear-cart');
    const comprarBtns = document.querySelectorAll('.btn-comprar');

    let cartItemsArray = [];

    cartLink.addEventListener('click', () => {
        cartDropdown.classList.toggle('show');
    });

    window.addEventListener('click', (e) => {
        if (!e.target.closest('.cart-icon')) {
            cartDropdown.classList.remove('show');
        }
    });

    function addToCart(item) {

        const existingItem = cartItemsArray.find(cartItem => cartItem.name === item.name);

        if (existingItem) {

            existingItem.quantity++;
        } else {

            cartItemsArray.push({ ...item, quantity: 1 });
        }


        renderCartItems();
        updateCartTotal();
        updateCartCount();
    }

    function renderCartItems() {
        cartItems.innerHTML = '';
        cartItemsArray.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <span class="cart-item-name">${item.name}</span>
                    <span class="cart-item-price">R$ ${item.price.toFixed(2)} x ${item.quantity}</span>
                </div>
                <button class="cart-item-remove">Remover</button>
            `;
            cartItems.appendChild(cartItem);

            const removeBtn = cartItem.querySelector('.cart-item-remove');
            removeBtn.addEventListener('click', () => {
                removeFromCart(item);
            });
        });
    }

    function removeFromCart(item) {
        cartItemsArray = cartItemsArray.filter(cartItem => cartItem.name !== item.name);
        renderCartItems();
        updateCartTotal();
        updateCartCount();
    }

    function updateCartTotal() {
        const total = cartItemsArray.reduce((acc, item) => {
            return acc + item.price * item.quantity;
        }, 0);
        cartTotal.textContent = `R$ ${total.toFixed(2)}`;
    }


    function updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        const totalItems = cartItemsArray.reduce((acc, item) => acc + item.quantity, 0);
        cartCount.textContent = totalItems;
    }


    clearCartBtn.addEventListener('click', () => {
        cartItemsArray = [];
        renderCartItems();
        updateCartTotal();
        updateCartCount();
    });


    comprarBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const produtoCard = btn.closest('.produto-card');
            const produtoNome = produtoCard.querySelector('h3').textContent;
            const produtoPreco = parseFloat(produtoCard.querySelector('p').textContent.replace('R$ ', '').replace('A partir de ', ''));
            const produtoImagem = produtoCard.querySelector('img').src;


            btn.style.backgroundColor = 'red';

            addToCart({ name: produtoNome, price: produtoPreco, image: produtoImagem });
        });
    });
}


window.addEventListener('DOMContentLoaded', initializeCart);
