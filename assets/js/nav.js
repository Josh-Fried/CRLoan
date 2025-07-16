// Nav Menu
window.addEventListener('scroll', function() {
    // Use a unique variable name to avoid any potential conflict.
    // This should target the <header class="nav-header"> we created.
    const headerElementForScrollEffect = document.querySelector('.nav-header');

    if (!headerElementForScrollEffect) {
        // If the specific nav-header isn't found, do nothing further for this function.
        return;
    }

    if (window.scrollY > 1) {
        headerElementForScrollEffect.classList.add('scrolled');
    } else {
        headerElementForScrollEffect.classList.remove('scrolled');
    }
});