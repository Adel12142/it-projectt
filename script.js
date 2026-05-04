(LocalStorage)
let cart = JSON.parse(localStorage.getItem("cart")) || [];


function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    if (cartCount) {
        let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.innerText = totalItems;
    }
}


function updateTotalPrice() {
    const totalPriceElement = document.getElementById("total-price");
    if (totalPriceElement) {
        let total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        totalPriceElement.innerText = total + " ج.م";
    }
}


function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    updateTotalPrice();
}


function addToCart(name, price) {
    if (!name || isNaN(price)) {
        console.error("خطأ في بيانات المنتج:", { name, price });
        return;
    }

    let existingProduct = cart.find(item => item.name === name);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }

    saveCart();
    alert(name + " أضيف للسلة بنجاح ✅");
}


function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    saveCart();
    displayCart();
}


function checkout() {
    if (cart.length === 0) {
        alert("السلة فارغة حالياً! 🛒");
    } else {
        alert("تم استلام طلبك بنجاح! 🎉");
        cart = [];
        saveCart();
        displayCart();
    }
}


function displayCart() {
    const cartContainer = document.getElementById("cart-items");
    if (!cartContainer) return;

    cartContainer.innerHTML = "";

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p style='text-align:center;'>السلة فارغة.</p>";
        updateTotalPrice();
        return;
    }

    cart.forEach(item => {
        let div = document.createElement("div");
        div.className = "cart-item";
        div.style = "border-bottom: 1px solid #eee; padding: 15px; display: flex; justify-content: space-between; align-items: center;";
        div.innerHTML = `
            <div>
                <strong>${item.name}</strong><br>
                السعر: ${item.price} ج.م | الكمية: ${item.quantity}
            </div>
            <button onclick="removeFromCart('${item.name}')" style="background:#ff4d4d; color:white; border:none; padding:5px 10px; cursor:pointer; border-radius:3px;">إزالة</button>
        `;
        cartContainer.appendChild(div);
    });
    updateTotalPrice();
}


document.addEventListener("DOMContentLoaded", function() {
    
    const header = document.getElementById("main-header");
    const footer = document.getElementById("main-footer");

    if(header) {
        header.innerHTML = `
            <div class="logo"><h2>متجر شوزاتك</h2></div>
            <nav>
                <a href="index.html">الرئيسية</a> | 
                <a href="shop.html">المتجر</a> | 
                <a href="contact.html">اتصل بنا</a> |
                <a href="about.html">من نحن</a> |
                <a href="blog.html">المدونه</a> |
                <a href="faqs.html">الاسئله الشائعه</a> |
                
                <a href="cart.html">🛒 السلة (<span id="cart-count">0</span>)</a>
            </nav>`;
    }
    if(footer) {
        footer.innerHTML = `<p>© 2026 جميع الحقوق محفوظة لمتجر شوزاتك</p>`;
    }

    
    document.addEventListener("click", function(e) {
        if (e.target && e.target.classList.contains("add-to-cart")) {
            const btn = e.target;
            const card = btn.closest(".product-card"); 
            
            
            let name = btn.getAttribute("data-name") || card.querySelector("strong").innerText;
            
            
            let priceRaw = btn.getAttribute("data-price") || card.querySelector(".price").innerText;
            let price = parseInt(priceRaw.replace(/[^\d]/g, ""));

            addToCart(name, price);
        }
    });

    updateCartCount();
    displayCart();
});
