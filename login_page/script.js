function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;
    
    // Here you would typically make an API call to your backend
    console.log('Login attempted:', { email, password, remember });
    
    // For demo purposes, show a success message
    alert('Login successful!');
    
    return false;
}

// Add input validation and visual feedback
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('invalid', (event) => {
        event.target.classList.add('error');
    });
    
    input.addEventListener('input', (event) => {
        if (event.target.validity.valid) {
            event.target.classList.remove('error');
        }
    });
});