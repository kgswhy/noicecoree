# NoiseCore - Premium Audio Technology Website

## Project Overview
NoiseCore is an innovative audio technology brand specializing in high-quality sound experiences. This project implements a comprehensive website showcasing NoiseCore's products and enhancing customer engagement through an intuitive user interface.

## Design Process
### Figma Prototype
The website design was first prototyped in Figma, implementing:
- Color and text style systems
- Interactive components and variants
- Navigation flows
- Consistent layout structures
- Different designs from the final implementation while maintaining theme consistency

### Design Principles
- **Color Scheme**: 
  - Primary: #ff6b00 (Orange)
  - Secondary: #1e1e1e (Dark Gray)
  - Dark: #121212
  - Light: #f8f8f8
  - White: #ffffff

- **Typography**: 
  - Font Family: Poppins
  - Weights: 300, 400, 500, 600, 700
  - Responsive sizing using rem units

- **Layout Structure**:
  - Consistent header and footer across all pages
  - Responsive grid and flexbox layouts
  - Mobile-first approach

## Technical Implementation

### Responsive Design
- Meta viewport tag implementation
- Media queries for different screen sizes:
  - Mobile: < 480px
  - Tablet: < 768px
  - Desktop: > 768px

### CSS Features
1. Flexbox Layout
2. CSS Grid System
3. Animations & Transitions
4. Custom Properties (CSS Variables)
5. Box Shadow Effects
6. Gradient Backgrounds
7. Transform Properties

### JavaScript Features
1. Product Filtering System
2. Form Validation
3. Cart Functionality
4. Mobile Navigation
5. Dynamic Content Loading

### Form Validation (Membership Page)
Five types of form validation implemented:
1. Name validation (minimum length, no special characters)
2. Email format validation
3. Password strength check
4. Date of birth validation
5. Terms and conditions agreement check

## Project Structure
```
noicecore/
├── css/
│   ├── style.css
│   ├── products.css
│   ├── about.css
│   ├── deals.css
│   ├── membership.css
│   └── cart.css
├── js/
│   ├── script.js
│   ├── products.js
│   ├── cart.js
│   └── membership.js
├── images/
│   └── [product images]
├── pages/
│   ├── products.html
│   ├── about.html
│   ├── deals.html
│   ├── membership.html
│   └── cart.html
└── index.html
```

## Features by Page

### Home Page
- Hero section with membership promotion
- Top 5 products showcase
- Current promotions section
- Call-to-action buttons for Products and Deals pages

### Products Page
- Product filtering by category
- Product search functionality
- Responsive product grid
- Product cards with:
  - Product image
  - Product name
  - Ratings
  - Price
  - Add to cart button

### About Page
- Company introduction
- Brand mission and values
- Company history
- Team section

### Deals Page
- Membership promotion section
- Current deals and discounts
- Special offers
- Limited time promotions

### Join Membership Page
- Interactive registration form
- Custom form validation
- Terms and conditions section
- Success/error message handling

## Responsive Design
The website is fully responsive across all devices:
- Desktop: Full layout with grid systems
- Tablet: Adjusted layouts and navigation
- Mobile: Streamlined interface with hamburger menu

## References
1. Font Awesome Icons: https://fontawesome.com/
2. Google Fonts (Poppins): https://fonts.google.com/
3. CSS Tricks (Flexbox Guide): https://css-tricks.com/snippets/css/a-guide-to-flexbox/
4. MDN Web Docs: https://developer.mozilla.org/
5. Images: All images used in this project are sourced from Unsplash (https://unsplash.com/), a platform providing high-quality, free-to-use images under the Unsplash License.

## Language Consistency
The website maintains English language throughout all pages for consistency.

## Browser Compatibility
Tested and working on:
- Google Chrome
- Mozilla Firefox
- Safari
- Microsoft Edge

## Future Improvements
1. Add product search autocomplete
2. Implement user authentication
3. Add shopping cart persistence
4. Enhance form validation feedback
5. Add product filtering by price range 