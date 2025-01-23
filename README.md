# ChatGPT Usage Heatmap

This is a [Next.js](https://nextjs.org) project designed to visualize ChatGPT conversation patterns through a heatmap.

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm (v7 or later)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/chat-heatmap.git
cd chat-heatmap
```

2. Install dependencies:

```bash
npm install
```

### Development

To run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build

To build the project for production:

```bash
npm run build
```

### Start

To start the production server:

```bash
npm start
```

### Lint

To lint the codebase:

```bash
npm run lint
```

## Project Structure

- **`.vscode/`**: Contains Visual Studio Code settings.
- **`chat-heatmap/`**: Main project directory.
  - **`.next/`**: Next.js build output directory.
  - **`app/`**: Contains the main application components and pages.
    - **`components/`**: Contains UI components like `HeatmapGenerator`, `Card`, `Select`, and `Button`.
    - **`globals.css`**: Global CSS styles.
    - **`layout.tsx`**: Root layout component.
    - **`page.tsx`**: Main page component.
  - **`lib/`**: Utility functions.
    - **`utils.ts`**: Contains the `cn` function for class name merging.
  - **`public/`**: Public assets.
  - **`README.md`**: Project documentation.
  - **`next.config.js`**: Next.js configuration file.
  - **`postcss.config.mjs`**: PostCSS configuration.
  - **`tailwind.config.js`**: Tailwind CSS configuration.
  - **`tsconfig.json`**: TypeScript configuration.
  - **`package.json`**: Project dependencies and scripts.
  - **`.gitignore`**: Git ignore file.

## Key Components

- **`HeatmapGenerator.tsx`**: Main component for generating and displaying the heatmap based on uploaded conversation data.
- **`Card.tsx`**: UI component for displaying content in a card layout.
- **`Select.tsx`**: UI component for creating dropdown select menus.
- **`Button.tsx`**: UI component for creating buttons.

## Main Features

- **Heatmap Generation**: Users can upload a `conversations.json` file to generate a heatmap of their ChatGPT conversation patterns.
- **Timezone and Year Selection**: Users can select their timezone and the year for which they want to visualize the data.
- **Data Processing**: The `processConversations` function processes the uploaded JSON data to generate the heatmap data.
- **Dynamic Styling**: The `getColor` function dynamically styles the heatmap cells based on conversation frequency.

## Deployment on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.

### Steps for Vercel Deployment

1. **Create a Vercel Account**: If you don't have one, create an account at [vercel.com](https://vercel.com).

2. **Install Vercel CLI**: Install the Vercel CLI globally on your machine:

```bash
npm install -g vercel
```

3. **Login to Vercel**: Login to your Vercel account using the CLI:

```bash
vercel login
```

4. **Deploy the Project**: Navigate to the project directory and run the deploy command:

```bash
vercel
```

5. **Follow the Prompts**: Follow the prompts to set up and deploy your project. Vercel will automatically detect the Next.js project and configure the deployment.

6. **Visit the Deployed Site**: Once the deployment is complete, Vercel will provide a URL where you can view your live site.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## License

This project is licensed under the MIT License.