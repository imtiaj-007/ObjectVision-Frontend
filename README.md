# ObjectVision Frontend

ObjectVision is a cutting-edge object detection platform that leverages advanced machine learning techniques for real-time object identification and analysis. The frontend of ObjectVision is built using **Next.js 15**, **TypeScript**, and **ShadCN** for the UI components, making it a modern and robust solution for interacting with the platform.

## Table of Contents

- [Installation](#installation)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Building for Production](#building-for-production)
- [License](#license)

## Installation

To get started with the frontend of ObjectVision, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/objectvision-frontend.git
   cd objectvision-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

   This will install the necessary dependencies listed in the `package.json`, including **Next.js**, **TypeScript**, and **ShadCN** components.

3. For generating TypeDoc documentation (if required), run:
   ```bash
   npx typedoc --out docs
   ```

## Development Setup

1. To start the development server:
   ```bash
   npm run dev
   ```

   This will launch the frontend app at `http://localhost:3000`. Any changes you make will be automatically reflected in the browser.

2. For TypeScript development, ensure your IDE has TypeScript support enabled to get benefits like auto-completion and type safety.

3. If you need to install additional ShadCN components, you can run the following command:
   ```bash
   npx shadcn@latest
   ```

   This will allow you to install or update components as needed.

## Project Structure

The frontend project follows a clean and modular structure:

- **pages/** - Contains Next.js route-based pages.
- **components/** - Reusable components built with ShadCN UI.
- **public/** - Static assets like images and fonts.
- **styles/** - Global styles for the application.
- **types/** - TypeScript type definitions for the project.
- **utils/** - Utility functions for the project.
- **docs/** - Generated TypeDoc documentation files (if applicable).

## Technologies Used

- **Next.js 15**: A powerful React framework for building fast, static, and dynamic websites.
- **TypeScript**: Provides type safety for JavaScript, ensuring fewer bugs and better tooling.
- **ShadCN**: A collection of customizable and reusable UI components that help create beautiful user interfaces quickly.
- **TypeDoc**: A documentation generator for TypeScript projects that can be used to automatically generate project documentation.

## Building for Production

To create an optimized production build, run the following command:

```bash
npm run build
```

This will generate an optimized build in the `.next` directory. To serve the production build locally, you can run:

```bash
npm start
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to contribute to the project or open issues if you encounter any problems.
