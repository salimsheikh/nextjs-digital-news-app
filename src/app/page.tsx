import Hero from "@/sections/Hero"; // Imports the Hero section component
import News from "@/sections/News"; // Imports the News section component

// Home page component, serving as the main entry point for the homepage layout
export default function Home() {
  return (
    <main id="main">
      {/* Hero Section - Displays the main hero slider with featured content */}
      <Hero />

      {/* News Section - Displays the latest news items */}
      <News />
    </main>
  );
}
