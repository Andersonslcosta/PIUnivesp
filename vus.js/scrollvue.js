document.addEventListener("DOMContentLoaded", function() {
  const menuButton = document.getElementById("menuButton");
  const mobileMenu = document.querySelector(".mobile_menu");
  const aside = document.querySelector("aside");
  const menuItems = document.querySelectorAll(".cabecalho_menu li");

  // Toggle mobile menu visibility and hide menu button
  menuButton.addEventListener("click", function(event) {
    event.stopPropagation();
    mobileMenu.classList.toggle("show");
    menuButton.style.display = "none";
  });

  // Close mobile menu and show menu button when clicking outside
  document.addEventListener("click", function(event) {
    if (mobileMenu.classList.contains("show") && !mobileMenu.contains(event.target) && event.target !== menuButton) {
      mobileMenu.classList.remove("show");
      menuButton.style.display = "block";
    }
  });

  // Show menu button and hide mobile menu when clicking menu items
  menuItems.forEach(item => {
    item.addEventListener("click", function() {
      mobileMenu.classList.remove("show");
      menuButton.style.display = "block";
    });
  });

  // Adjust aside position based on window width
  const adjustAsidePosition = () => {
    if (document.body.clientWidth < window.innerWidth) {
      aside.style.position = "sticky";
      aside.style.top = "20px";
    } else {
      aside.style.position = "relative";
      aside.style.top = "auto";
    }
  };

  // Create ResizeObserver to watch for window resize
  const observer = new ResizeObserver(adjustAsidePosition);
  observer.observe(document.body);

  // Initial call to set aside position
  adjustAsidePosition();
});
