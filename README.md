# Code2Consult Hackathon

A modern web platform built for the **Code2Consult Hackathon**, developed with Next.js, React, TypeScript, Tailwind CSS, Framer Motion, and Lucide React.

The project provides a structured and interactive web experience for the hackathon, including dedicated pages for registration and recruitment-related content.

## Live Development

The application is currently accessible locally at:

**http://localhost:3003/**

> The port may differ depending on the local development environment. The project can be configured to run on a specific port using the Next.js CLI.

---

## Tech Stack

### Frontend

* **Next.js 16.3.5** — React framework using the App Router
* **React 19.1.0**
* **TypeScript 5.9**
* **Tailwind CSS 4**
* **Framer Motion 12** — animations and interactions
* **Lucide React** — icon library
* **next-themes** — theme management
* **clsx** — conditional class utilities
* **tailwind-merge** — Tailwind class merging

### Development Tools

* ESLint
* PostCSS
* pnpm
* TypeScript

The versions and dependencies are defined in the project's `package.json`.

---

## Project Structure

```text
code2consult-hackathon/
│
├── public/
│   └── Static assets
│
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   ├── providers.tsx
│   │   ├── globals.css
│   │   │
│   │   ├── recruitments/
│   │   │   └── ...
│   │   │
│   │   └── register/
│   │       └── ...
│   │
│   ├── components/
│   │   └── Reusable UI components
│   │
│   ├── data/
│   │   └── Application and page data
│   │
│   └── lib/
│       └── Shared utilities
│
├── RECRUITMENT_PAGE.md
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

The repository uses a `src`-based application structure with separate directories for the App Router, reusable components, data, and utility code.

---

## Application Routes

The project currently contains the following main application areas:

| Route           | Purpose                  |
| --------------- | ------------------------ |
| `/`             | Main landing page        |
| `/recruitments` | Recruitment-related page |
| `/register`     | Registration page        |

The corresponding route directories are present under `src/app`.

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Keerrthanahey/code2consult-hackathon.git
cd code2consult-hackathon
```

### 2. Install dependencies

Using pnpm:

```bash
pnpm install
```

### 3. Start the development server

```bash
pnpm dev
```

Next.js uses `next dev` for the development server.

If you want to run it specifically on port `3003`:

```bash
pnpm dev -- -p 3003
```

Then open:

```text
http://localhost:3003/
```

---

## Available Scripts

The project currently defines these scripts in `package.json`:

### Development

```bash
pnpm dev
```

Starts the Next.js development server.

### Production Build

```bash
pnpm build
```

Creates an optimized production build.

### Production Server

```bash
pnpm start
```

Starts the application after a successful production build.

### Lint

```bash
pnpm lint
```

Runs ESLint against the project.

These correspond to the standard Next.js development, build, production, and lint workflow.

---

## Development Workflow

A typical development workflow is:

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Check linting
pnpm lint

# Create production build
pnpm build

# Start production server
pnpm start
```

For local development, the application can be opened at:

```text
http://localhost:3003/
```

---

## Styling & UI

The project uses **Tailwind CSS** alongside global CSS and reusable React components.

The main global styling entry point is:

```text
src/app/globals.css
```

The project also uses:

* **Framer Motion** for animations
* **Lucide React** for interface icons
* **next-themes** for theme-related functionality
* **clsx** and **tailwind-merge** for flexible styling

These dependencies are declared in `package.json`.

---

## Recruitment Page

The repository includes a dedicated recruitment experience under:

```text
src/app/recruitments/
```

Additional recruitment documentation is maintained in:

```text
RECRUITMENT_PAGE.md
```

This keeps the recruitment-specific implementation and documentation organized separately from the main landing page.

---

## Registration

The project also contains a dedicated registration route:

```text
/register
```

Its implementation is located under:

```text
src/app/register/
```

---

## Configuration

Important project configuration files include:

```text
next.config.ts
tsconfig.json
eslint.config.mjs
postcss.config.mjs
pnpm-workspace.yaml
```

The project is configured as a private Next.js application and uses TypeScript, ESLint, Tailwind CSS, and the Next.js App Router.

---

## Deployment

The application can be built for production using:

```bash
pnpm build
```

and started using:

```bash
pnpm start
```

Next.js supports deployment as a Node.js server, Docker container, static export where applicable, and platform-specific adapters. The exact deployment configuration depends on the target hosting platform.

---

## Contributing

Contributions are welcome.

### Suggested workflow

1. Fork the repository.
2. Create a feature branch.

```bash
git checkout -b feature/your-feature
```

3. Make your changes.
4. Run linting:

```bash
pnpm lint
```

5. Verify the application locally:

```bash
pnpm dev
```

6. Create a production build to check for build issues:

```bash
pnpm build
```

7. Commit your changes:

```bash
git add .
git commit -m "feat: add your feature"
```

8. Push the branch:

```bash
git push origin feature/your-feature
```

9. Open a pull request.

---

## Repository

**GitHub:**
https://github.com/Keerrthanahey/code2consult-hackathon

---

## Project Status

**Code2Consult Hackathon — Active Development**

The project is currently being developed and refined for the hackathon.

---

## License

No explicit license is currently specified in the repository.

If this project is intended to be distributed publicly, add an appropriate `LICENSE` file to the repository.
