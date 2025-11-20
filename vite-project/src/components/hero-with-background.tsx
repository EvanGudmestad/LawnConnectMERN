import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroWithBackgroundProps {
  heading: string;
  description: string;
  buttons?: {
    primary?: {
      text: string;
      url: string;
    };
    secondary?: {
      text: string;
      url: string;
    };
  };
  backgroundImage: string;
}

const HeroWithBackground = ({
  heading,
  description,
  buttons,
  backgroundImage,
}: HeroWithBackgroundProps) => {
  return (
    <section className="relative py-32 md:py-48 flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="container relative z-10 px-4 text-center text-white">
        <h1 className="mx-auto mb-6 max-w-4xl text-4xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl drop-shadow-md">
          {heading}
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-lg md:text-xl text-gray-100 drop-shadow-sm">
          {description}
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          {buttons?.primary && (
            <Button asChild size="lg" className="w-full sm:w-auto text-lg px-8 py-6">
              <a href={buttons.primary.url}>{buttons.primary.text}</a>
            </Button>
          )}
          {buttons?.secondary && (
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto bg-white/10 border-white text-white hover:bg-white hover:text-black text-lg px-8 py-6 backdrop-blur-sm">
              <a href={buttons.secondary.url}>
                {buttons.secondary.text}
                <ArrowRight className="ml-2 size-5" />
              </a>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export { HeroWithBackground };
