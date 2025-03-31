window.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('emailForm');
    const emailInput = document.getElementById('email');
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const email = emailInput.value.trim();
      const submitButton = form.querySelector('button');
  
      if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
      }
  
      submitButton.disabled = true;
      submitButton.textContent = "Submitting...";
  
      try {
        const res = await fetch("https://barter-backend-d085.onrender.com/api/subscribe", {
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
          const data = await res.json();
          alert("⚠️ " + (data.error || "Something went wrong. Try again."));
          submitButton.disabled = false;
          submitButton.textContent = "Notify Me";
        }
      } catch (error) {
        console.error('Email submission failed:', error);
        alert("⚠️ Network error. Try again.");
        submitButton.disabled = false;
        submitButton.textContent = "Notify Me";
      }
    });
  
    function validateEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    }
  });  