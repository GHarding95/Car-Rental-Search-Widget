# 🚗 Car Rental Search Widget

A modern car rental search application built with React 19, TypeScript, and Vite. The app is mounted to the DOM element with id `app` in `index.html`, rendering the SearchForm component as the root component. When the form is submitted, users are redirected to `result.html` which displays the search parameters.

## ✨ Features

### **Core Functionality**
- **Location Selection**: Dropdown with predefined airport locations
- **Date & Time Pickers**: Pickup and drop-off scheduling with validation
- **Form Validation**: Required field validation with visual indicators
- **Query String Generation**: Redirects to results page with search parameters
- **Loading States**: Visual feedback during form submission

### **Performance Optimisations**
- **React.memo**: Prevents unnecessary component re-renders
- **useMemo**: Memoizes expensive date calculations
- **useCallback**: Memoizes event handlers for optimal performance

### **Accessibility & SEO**
- **Semantic HTML**: Proper heading hierarchy and landmark roles
- **ARIA Support**: Screen reader compatibility
- **Rich Meta Tags**: Comprehensive descriptions and keywords
- **Open Graph**: Social media sharing optimisation
- **Structured Data**: Schema.org markup for search engines

### **User Experience**
- **Responsive Design**: Mobile-first approach with breakpoints
- **Modern UI**: Clean, modern interface
- **Error Boundaries**: Graceful error handling with retry options
- **Form States**: Loading and validation states

## 🏗️ Architecture

### **Component Structure**
```
src/
├── components/
│   ├── Header/              # Page header with title and subtitle
│   ├── LocationSelect/      # Airport location dropdown
│   ├── DateInput/           # Reusable date input component
│   ├── TimeInput/           # Reusable time input component
│   ├── SearchForm/          # Main form orchestrator
│   ├── ErrorBoundary/       # Error handling component
│   └── index.ts             # Component exports
├── types/
│   ├── index.ts             # TypeScript interfaces
│   └── json.d.ts            # JSON module declarations
├── App.tsx                  # Main application component
├── App.css                  # Application styles
└── main.tsx                 # Application entry point
```

### **Technology Stack**
- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite 7
- **Styling**: Modern CSS with custom properties
- **Linting**: ESLint with TypeScript and React rules

## 🚀 Getting Started

### **Prerequisites**
- Node.js 18+ 
- npm 9+ or yarn 1.22+

### **Installation**
```bash
# Clone the repository
git clone <repository-url>
cd enjoy-travel-tech-test

# Install dependencies
npm install
```

### **Development**
```bash
# Start development server
npm run dev

```

### **Building for Production**
```bash
# Build the application
npm run build

# Preview the production build
npm run preview

# Analyze bundle size
npm run build:analyze
```

