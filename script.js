// Glam Beauty Products - basic website interactions

let cart = [];

function refreshCart() {
  const count = document.getElementById("cartCount");
  const list = document.getElementById("cartItems");
  const totalText = document.getElementById("cartTotal");

  if (count) count.textContent = cart.length;

  if (list && totalText) {
    list.innerHTML = "";
    let total = 0;

    cart.forEach(function(product) {
      const row = document.createElement("li");
      row.textContent = product.name + " - ₹" + product.price;
      list.appendChild(row);
      total += product.price;
    });

    totalText.textContent = total;
  }
}

// Add selected product to the cart
document.querySelectorAll(".add-cart").forEach(function(button) {
  button.addEventListener("click", function() {
    cart.push({
      name: button.dataset.name,
      price: Number(button.dataset.price)
    });
    refreshCart();
    alert("Product added to your cart!");
  });
});

// Show or hide cart details
const cartToggle = document.getElementById("cartToggle");
if (cartToggle) {
  cartToggle.addEventListener("click", function() {
    const cartSection = document.getElementById("cartSection");
    cartSection.hidden = !cartSection.hidden;
    if (!cartSection.hidden) cartSection.scrollIntoView({ behavior: "smooth" });
  });
}

// Empty the cart
const clearCart = document.getElementById("clearCart");
if (clearCart) {
  clearCart.addEventListener("click", function() {
    cart = [];
    refreshCart();
  });
}

// Registration demo. Do not use localStorage for real customer passwords.
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("fullName").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value;
    const confirm = document.getElementById("confirmPassword").value;
    const message = document.getElementById("registerMessage");

    if (password.length < 6) {
      message.textContent = "Password must contain at least 6 characters.";
      return;
    }

    if (password !== confirm) {
      message.textContent = "Passwords do not match. Please try again.";
      return;
    }

    // This is only a classroom demonstration, not secure authentication.
    localStorage.setItem("glamDemoUser", JSON.stringify({
      name: name,
      email: email,
      password: password
    }));

    message.textContent = "Registration successful. You can now log in.";
    registerForm.reset();
  });
}

// Demo login checks the details registered in this same browser.
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;
    const savedUser = JSON.parse(localStorage.getItem("glamDemoUser") || "null");
    const message = document.getElementById("loginMessage");

    if (savedUser && savedUser.email === email && savedUser.password === password) {
      message.textContent = "Welcome, " + savedUser.name + "! Login successful.";
    } else {
      message.textContent = "Account not found or details are incorrect. Please register first.";
    }
  });
}
