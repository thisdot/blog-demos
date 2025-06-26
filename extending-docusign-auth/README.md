# TaskVibe Docusign Extension App

This is an example of how to integrate Docusign with an imaginary TaskVibe task management app, as an extension app for Docusign. The project is a Next.js app that serves as the backend for the extension app and authentication proxy.

## Installation

1. Clone the repository.
2. Install dependencies:

```bash
pnpm install
```

3. Create a `.env.local` file in the root directory and add your environment variables:

```bash
JWT_SECRET=your-secret-key-here-replace-in-production
```

## Development

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Production

To build the application for production:

```bash
npm run build
```

To start the production server:

```bash
npm start
```
