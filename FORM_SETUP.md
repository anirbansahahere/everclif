# Contact Form Setup Instructions

The contact form is configured to send submissions to **anirban@everclif.com** using Formspree.

## Quick Setup (5 minutes):

1. **Sign up for Formspree** (free):
   - Go to https://formspree.io
   - Click "Sign Up" and create a free account

2. **Create a new form**:
   - After signing in, click "New Form"
   - Set the email address to: **anirban@everclif.com**
   - Copy your Form ID (it will look like: `xyz123abc` or `abc123xyz`)

3. **Update the form in your website**:
   - Open `index.html`
   - Find the line: `<form class="contact-form" id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">`
   - Replace `YOUR_FORM_ID` with your actual Form ID from step 2
   - Example: `action="https://formspree.io/f/xyz123abc"`

4. **Test the form**:
   - Submit a test message through your website
   - Check your email at anirban@everclif.com

## Alternative Options:

If you prefer a different service, you can also use:
- **Web3Forms**: https://web3forms.com (no signup required, uses access key)
- **EmailJS**: https://www.emailjs.com (requires email service setup)
- **Netlify Forms**: If hosting on Netlify (free, no setup needed)

## Current Configuration:

- **Email recipient**: anirban@everclif.com
- **Email subject**: "New Contact Form Submission from EverClif Website"
- **Form fields**: Name, Email, Phone, Message
- **Spam protection**: Enabled via honeypot field

The form is fully functional once you complete the Formspree setup above!

