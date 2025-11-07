# 🧠 Copilot Project Instructions: ITPidia Company Website

## 🎯 Project Goal
Generate a **modern, responsive, and professional company website** for **ITPidia**, an IT service provider that builds and consults on cutting-edge digital solutions.

The site should highlight:
- The company’s vision and mission.
- The services offered (web, cloud, digital transformation, custom IT solutions).
- The founder (Youssef Abid).
- A contact form for client inquiries.

Use **HTML, CSS, and JavaScript only** — no frameworks or libraries.  
This will be a **static single-page site (SPA-style scroll navigation)**.

---

## 🏢 Company Overview

**Name:** ITPidia  
**Founded:** 2023  
**Founder:** Youssef Abid — 29 years old, Diplomed in 2021  
**Tagline (optional):** “You name it. We build it.”  

### Company Description
> We are ITPidia, a cutting-edge IT solutions company that specializes in web development, cloud services, digital transformation, and innovative technology solutions that drive your business forward.  
> Founded in 2023, ITPidia emerged from a vision to bridge the gap between complex technology and business success.  
> We believe that the right technology solutions can transform any business, regardless of size or industry.  
> Our journey began with a simple mission: to deliver cutting-edge IT solutions that drive real business value.  
> Today, we're proud to be trusted partners for businesses worldwide, helping them navigate the digital landscape with confidence and innovation.

---

## 🧩 Assets

Store assets in an `/assets` folder:
- `assets/logo.png` → company logo  
- `assets/founder.jpg` → image of founder Youssef Abid  

These files should be referenced appropriately in the HTML structure.

---

## 🧱 Page Structure

### Header / Navigation
- Logo + company name (“ITPidia”)
- Navigation links: Home, About, Services, Team, Contact
- Mobile-friendly hamburger menu for small screens

### Hero Section
- Brief tagline: “Cutting-edge IT solutions that drive your business forward.”
- CTA button: **“Get a Free Consultation”** (scrolls to contact form)
- Optional animated background or subtle motion (CSS or small JS)

### About Section
- Use the company description text above
- Include founder image and short blurb:
  > “Founded by Youssef Abid, 29, Diplomed in 2021. Passionate about technology and digital transformation.”

### Services Section
Show four service cards:
1. **Web Development** – Modern, scalable, user-focused websites  
2. **Cloud Services** – Reliable and secure cloud solutions  
3. **Digital Transformation** – Turning ideas into digital success  
4. **Custom IT Solutions** – Tailored systems that fit business needs

### Values / Why Choose Us
Highlight three core pillars:
- Innovation  
- Reliability  
- Partnership  

### Contact Section
- Form with fields: name, email, company, message  
- Client-side validation (JavaScript)  
- Fallback `mailto:` link if JS is disabled  
- Include placeholders for contact email (`contact@itpidia.com`) and phone number

### Footer
- Copyright line: `© 2025 ITPidia. All rights reserved.`  
- Social media icons (non-functional placeholders)
- Address placeholder (optional)

---

## 🎨 Design Guidelines

- **Layout:** Mobile-first, responsive (Flexbox or Grid)  
- **Palette:** Light and modern (white, blue/gray/tech accent tones)  
- **Typography:** Clean sans-serif (e.g., system font stack)  
- **Accessibility:** Use semantic HTML5 + ARIA where needed  
- **Animations:** Minimal, smooth (hover states, fade-ins, smooth scroll)  
- **Performance:** Optimized assets, proper `alt` text, lazy loading if possible  

---

## ⚙️ Technical Requirements

- **Files to generate:**
  - `index.html`
  - `styles.css`
  - `script.js`
  - `README.md`

- **HTML:** Semantic structure, meta tags (SEO + Open Graph)  
- **CSS:** Organized with variables for color theme, consistent spacing and typography  
- **JS:** 
  - Smooth scrolling  
  - Mobile nav toggle  
  - Contact form validation  
- **README.md:** Explain how to run locally and customize (text, colors, assets)

---

## 🧭 Output Format

When generating, Copilot should output **four complete code blocks**:
1. Full `index.html`  
2. Full `styles.css`  
3. Full `script.js`  
4. Full `README.md`  

Each file should contain inline comments explaining key parts of the code.

---

## 🪄 Tone & Brand Feel

- Confident, modern, professional  
- Slightly youthful energy — innovative but trustworthy  
- Focus on simplicity, clarity, and forward-thinking design  
- Voice example: “We make IT happen.” / “You name it. We build it.”

---

## ✅ End Goal
Deliver a **polished, responsive company website** that visually represents ITPidia’s innovation, reliability, and commitment to client success — ready to deploy on GitHub Pages, Netlify, or any static hosting service.

---
