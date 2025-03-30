window.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('emailForm');
    const emailInput = document.getElementById('email');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = emailInput.value.trim();

        if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        try {
            const res = await fetch("https://barter-backend-d085.onrender.com/subscribe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            });

            if (res.ok) {
                form.classList.add('fade-out');
                setTimeout(() => {
                    form.innerHTML = '<p class="confirmation-message show" style="color: white; font-size: 1.2rem;">Thanks! We’ll keep you posted.</p>';
                }, 500);
            } else {
                alert("❌ Something went wrong. Try again.");
            }
        } catch (error) {
            console.error('Email submission failed:', error);
            alert("⚠️ Network error. Try again.");
        }
    });

    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
});