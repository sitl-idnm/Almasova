import { FC } from "react";

import { Hero } from "./sections/hero/Hero";
import { Advantages } from "./sections/advantages/Advantages";
import { Zones } from "./sections/zones/Zones";
import { Approach } from "./sections/approach/Approach";
import { Works } from "./sections/works/Works";
import { Audience } from "./sections/audience/Audience";
import { Trust } from "./sections/trust/Trust";

export const HomeView: FC = () => {
  return (
    <main>
      <Hero />
      <Advantages />
      <Zones />
      <Approach />
      <Works />
      <Audience />
      <Trust />
    </main>
  );
};
