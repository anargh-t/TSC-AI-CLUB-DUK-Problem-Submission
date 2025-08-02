# TCS AI Club x DUK Portal

A modern web application for the TCS AI Club and DUK collaboration, built with React, TypeScript, and Supabase.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm, yarn, or bun package manager

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd duk-tcs

# Install dependencies
npm install
# or
yarn install
# or
bun install
```

### Development

```bash
# Start development server
npm run dev
# or
yarn dev
# or
bun dev
```

The application will be available at `http://localhost:8080`

### Available Commands

```bash
# Development
npm run dev          # Start development server with hot reload
npm run build        # Create production build
npm run build:dev    # Create development build
npm run preview      # Preview production build locally
npm run lint         # Run ESLint for code quality checks
```

## 🏗️ Project Structure

```
duk-tcs/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── forms/          # Form components
│   │   └── ui/             # Base UI components (shadcn/ui)
│   ├── hooks/              # Custom React hooks
│   ├── integrations/       # External service integrations
│   │   └── supabase/       # Supabase database configuration
│   ├── lib/                # Utility functions and helpers
│   ├── pages/              # Page components
│   ├── App.tsx            # Main application component
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles
├── public/                 # Static assets
├── supabase/              # Database migrations and config
├── package.json           # Dependencies and scripts
├── vite.config.ts         # Vite build configuration
└── tailwind.config.ts     # Tailwind CSS configuration
```

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **shadcn/ui** - Component library
- **React Hook Form** - Form management
- **Zod** - Schema validation

### Backend & Services
- **Supabase** - Database and backend services
- **React Query** - Server state management

### Development Tools
- **ESLint** - Code linting
- **TypeScript** - Type checking
- **PostCSS** - CSS processing

## 📝 Features

### Core Functionality
- **Home Page** - Landing page with navigation and hero section
- **Problem Submission** - Form for submitting AI challenges
- **Form Validation** - Client-side validation with Zod schemas
- **Database Integration** - Supabase for data persistence
- **Responsive Design** - Mobile-first responsive layout

### User Experience
- **Dark Theme** - Modern dark UI design
- **Toast Notifications** - User feedback for actions
- **Loading States** - Form submission feedback
- **Error Handling** - Comprehensive error management
- **Accessibility** - ARIA-compliant components

## 🔧 Configuration

### Environment Variables
The application uses Supabase for backend services. Configuration is handled in:
- `src/integrations/supabase/client.ts` - Supabase client setup

### Database Schema
The application uses the following Supabase table:
- `problem_submissions` - Stores submitted problem statements

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deployment Options
- **Vercel** - Recommended for React applications
- **Netlify** - Static site hosting
- **Supabase** - Full-stack hosting with database

## 🧪 Development Guidelines

### Code Style
- Use TypeScript for all new code
- Follow ESLint configuration
- Use Prettier for code formatting
- Write meaningful commit messages

### Component Structure
- Use functional components with hooks
- Implement proper TypeScript types
- Follow React best practices
- Use shadcn/ui components for consistency

### Form Handling
- Use React Hook Form for all forms
- Implement Zod schemas for validation
- Provide clear error messages
- Handle loading and success states

## 🔍 Troubleshooting

### Common Issues

**Development server won't start**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**TypeScript errors**
```bash
# Check TypeScript configuration
npm run lint
```

**Supabase connection issues**
- Verify Supabase URL and API keys
- Check network connectivity
- Review browser console for errors

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Supabase Documentation](https://supabase.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
