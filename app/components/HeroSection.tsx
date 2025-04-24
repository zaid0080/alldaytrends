// components/HeroSection.tsx
interface HeroSectionProps {
  country?: string;
}

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export default function HeroSection({ country }: HeroSectionProps) {
  const isWorldwide = !country || country.toLowerCase() === 'worldwide';
  const formattedCountry = country ? capitalizeFirstLetter(country) : '';
  const title = isWorldwide 
    ? "Discover What's Trending Worldwide" 
    : `Discover What's Trending In ${formattedCountry}`;

  return (
    <div className={'bg-gradient-to-r from-indigo-500 to-blue-600 dark:from-indigo-600 dark:to-blue-700 py-16 md:py-20'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className={'text-4xl md:text-6xl font-bold text-white mb-4 md:mb-6'}>
          {title}
        </h1>
        <p className={'text-xl text-indigo-100'}>
          Real-time social media trends from X (twitter) platform around the world.
        </p>
      </div>
    </div>
  )
}