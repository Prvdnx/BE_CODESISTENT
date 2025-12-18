# Form Validator

A modern registration form with real-time validation built with vanilla HTML, CSS, and JavaScript featuring custom error messages and visual feedback.

## Demo

![Form Validator Demo](demo.gif)

## Features

- Real-time input validation with visual feedback
- Username length validation (3-15 characters)
- Email format validation using regex
- Password length validation (6-25 characters)
- Password confirmation matching
- Custom error messages for each field
- Success/error state indicators with color coding
- Modern orange/coral theme
- Clean, compact UI with Poppins font

## How to Run

Simply open `index.html` in your web browser.

## Project Structure

```
.
├── index.html    # main HTML structure
├── style.css     # styling with CSS variables and validation states
├── script.js     # form validation logic with ternary operators
└── demo.gif      # demo recording
```

## Technologies Used

- HTML5
- CSS3 (CSS Variables, Transitions)
- JavaScript (ES6+, Ternary Operators, Arrow Functions)
- Regular Expressions for email validation
- Poppins font family

## Validation Rules

- **Username**: 3-15 characters
- **Email**: Valid email format (name@domain.ext)
- **Password**: 6-25 characters
- **Confirm Password**: Must match password field
- **All fields**: Required
