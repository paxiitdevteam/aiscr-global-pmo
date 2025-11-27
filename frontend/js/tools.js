// Tools Menu Functions

function toggleToolsMenu() {
    const dropdown = document.getElementById('toolsDropdown');
    if (dropdown) {
        dropdown.classList.toggle('active');
    }
}

// Close tools menu
function closeToolsMenu() {
    const dropdown = document.getElementById('toolsDropdown');
    if (dropdown) {
        dropdown.classList.remove('active');
    }
}

// Make function globally available
window.toggleToolsMenu = toggleToolsMenu;
window.closeToolsMenu = closeToolsMenu;

