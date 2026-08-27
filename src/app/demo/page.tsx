"use client";

import { FrameSequenceHero, type FrameSequenceStep } from "@/components/ui/mac-book-neo-hero";
import { Camera, Sunrise, Map, Battery } from "lucide-react";

// Use an array of 5 Unsplash images for the "sequence" to avoid downloading 900+ images from unsplash.
const images = [
  "https://images.unsplash.com/photo-1506744626753-1fa28f673b0c",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
  "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d",
  "https://images.unsplash.com/photo-1433086966358-54859d0ed716",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e"
];

const FRAME_COUNT = 5;
const framePath = (i: number) => {
  // Map the index to one of the 5 images (1-based index)
  const idx = Math.max(0, Math.min(i - 1, images.length - 1));
  return `${images[idx]}?auto=format&fit=crop&w=1200&q=80`;
};

const steps: FrameSequenceStep[] = [
  { from: 0.02, to: 0.28, color: "#ff9f3a", num: "01", total: "04", icon: <Camera size={16} />,
    title: "Five vivid colors.",
    description: "Bright yellow, soft pink, deep blue, silver, and midnight. Pick the one that's you.",
    label: "Colors" },
  { from: 0.28, to: 0.55, color: "#ff6f9c", num: "02", total: "04", icon: <Sunrise size={16} />,
    title: "A refined silhouette.",
    description: "11.3 mm thin, 1.24 kg light. The most portable MacBook ever built.",
    label: "Design" },
  { from: 0.55, to: 0.82, color: "#5e9bff", num: "03", total: "04", icon: <Map size={16} />,
    title: "A display that captivates.",
    description: "Liquid Retina XDR, 1,000 nits sustained. ProMotion 120 Hz for silky-smooth motion.",
    label: "Display" },
  { from: 0.82, to: 1.01, color: "#a37bff", num: "04", total: "04", icon: <Battery size={16} />,
    title: "Built to last all day.",
    description: "Up to 22 hours of battery life. Whisper-quiet, wherever you go.",
    label: "Battery" },
];

export default function Demo() {
  return (
    <div className="bg-black text-white min-h-screen">
      <FrameSequenceHero
        frameCount={FRAME_COUNT}
        framePath={framePath}
        eagerCount={5}
        scrollHeight="600vh"
        brand={
          <>
            <span className="fsh-brand-dot" />
            neo.
          </>
        }
        navLinks={[
          { label: "Overview", href: "#" },
          { label: "Specs", href: "#" },
          { label: "Colors", href: "#" },
          { label: "Support", href: "#" },
        ]}
        ctaLabel="Buy"
        ctaHref="#"
        title={
          <>
            <span className="fsh-title-dark">MacBook</span>{" "}
            <span className="fsh-title-rainbow">Neo</span>
          </>
        }
        subtitle="Scroll to explore."
        steps={steps}
      />
    </div>
  );
}
