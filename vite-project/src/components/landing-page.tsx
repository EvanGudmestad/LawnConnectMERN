import { Hero1 } from "@/components/hero1";

export function LandingPage() {
  return(
    <Hero1 image={{src:"https://images.pexels.com/photos/1546166/pexels-photo-1546166.jpeg", alt:"LawnConnect Hero Image"}} heading="Welcome to LawnConnect" description="LawnConnect is a marketplace for Lawn Mowing Companies and Residents who want their lawns mowed" />
  );
}