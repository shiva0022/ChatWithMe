# ChatWithMe - AI Assistant

A modern, responsive AI chatbot interface built with Next.js 15, featuring a beautiful purple-themed design with glassmorphism effects.

## 🚀 Features

- **Modern UI/UX**: Beautiful glassmorphism design with purple gradient theme
- **Responsive Design**: Works seamlessly on all device sizes
- **Smooth Animations**: Framer Motion powered page transitions and interactions
- **Authentication Ready**: Structured for NextAuth.js integration
- **TypeScript**: Fully typed for better development experience
- **Tailwind CSS**: Utility-first CSS framework for rapid styling

## 🎨 Design System

### Color Palette
- **Primary Gradient**: `#a970ff` → `#8a4fff` → `#6a3fff`
- **Background**: `#0a0a0a` (deep black)
- **Secondary**: `#1a0f1f` (dark purple-tinted)
- **Text**: White, gray variants
- **Borders**: Purple with opacity variants

### Typography
- **Primary Font**: Poppins (Google Fonts)
- **Fallback**: System fonts

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── login/             # Login page
│   ├── register/          # Registration page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── loading.tsx        # Loading component
│   ├── error.tsx          # Error boundary
│   └── not-found.tsx      # 404 page
├── components/            # Reusable components
│   ├── Layout/           # Layout components
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   └── Hero.tsx
│   ├── Forms/            # Form components
│   │   ├── AnimatedFormContainer.tsx
│   │   ├── FormInput.tsx
│   │   ├── GoogleButton.tsx
│   │   └── SubmitButton.tsx
│   ├── Chat/             # Chat components
│   │   ├── ChatResponse.tsx
│   │   ├── Welcome.tsx
│   │   ├── SearchInput.tsx
│   │   └── Responses.tsx
│   └── Auth/             # Auth components
│       ├── AuthButtons.tsx
│       └── Account.tsx
public/
├── assets/               # Static assets
│   ├── logo.svg         # Main logo
│   ├── google-icon.svg  # Google OAuth icon
│   └── exit.svg         # Exit icon
└── grid.svg             # Background grid pattern
```

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd chatbot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📦 Dependencies

### Core
- **Next.js 15.4.4** - React framework
- **React 19.1.0** - UI library
- **TypeScript** - Type safety

### Styling
- **Tailwind CSS 4** - Utility-first CSS
- **Framer Motion 12** - Animations

### Icons & UI
- **Heroicons 2.2.0** - SVG icons
- **React Icons 5.5.0** - Icon library

### HTTP Client
- **Axios 1.11.0** - HTTP requests

## 🎯 Pages Overview

### Home Page (`/`)
- **Layout**: Split-screen design
- **Left**: Sidebar with chat history (20% width)
- **Right**: Main chat interface (76% width)
- **Features**: Welcome screen, chat interface, auto-resizing input

### Login Page (`/login`)
- **Features**: Email/password login, Google OAuth, remember me
- **Validation**: Form validation with show/hide password
- **Navigation**: Link to registration page

### Register Page (`/register`)
- **Features**: Full registration form, Google OAuth, terms agreement
- **Validation**: Password confirmation, required fields
- **Navigation**: Link to login page

## 🧩 Key Components

### Layout Components
- **Navbar**: Top navigation with logo and auth buttons
- **Sidebar**: Chat history with new chat functionality
- **Hero**: Main chat interface container

### Form Components
- **AnimatedFormContainer**: Glassmorphism form wrapper with smooth animations
- **FormInput**: Styled input fields with labels
- **GoogleButton**: Google OAuth integration button

### Chat Components
- **Welcome**: Initial greeting screen with logo
- **SearchInput**: Auto-resizing textarea for user input
- **Responses**: Chat message display with bubbles

## 🔧 TODO - Authentication Integration

The project is structured for NextAuth.js integration. To complete the authentication:

1. **Install NextAuth**
   ```bash
   npm install next-auth
   ```

2. **Configure Google OAuth**
   - Set up Google OAuth credentials
   - Create NextAuth configuration
   - Replace placeholder auth functions

3. **Environment Variables**
   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

## 🎨 Customization

### Colors
Update the color palette in `globals.css` and Tailwind classes:
- Primary: `#a970ff`, `#8a4fff`, `#6a3fff`
- Background: `#0a0a0a`, `#1a0f1f`

### Fonts
Change fonts in `globals.css` Google Fonts import

### Components
All components are modular and can be easily customized or extended

## 📱 Responsive Design

- **Desktop**: Full sidebar and chat interface
- **Tablet**: Responsive sidebar, maintained chat functionality
- **Mobile**: Optimized for touch interactions

## 🚀 Performance

- **Next.js App Router**: Server-side rendering and static generation
- **Image Optimization**: Next.js Image component for assets
- **Code Splitting**: Automatic code splitting for optimal loading
- **CSS Optimization**: Tailwind CSS with purging

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request
