import React from 'react';
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import GlobeComponent from "../../components/GlobeComponent"; // Import the correct component

export default function GlobeDemo() {
  return (
    <div className="flex h-screen w-screen items-center justify-center px-4">
      <div className="group relative mx-auto flex flex-col overflow-hidden rounded-2xl border border-white/5 bg-zinc-800 w-full max-w-md h-80 md:h-96 lg:h-[500px]">
        <div className="absolute inset-0 bg-[radial-gradient(40%_128px_at_50%_0%,theme(backgroundColor.white/5%),transparent)]"></div>

        <div className="flex items-center justify-center h-full">
          <GlobeComponent
            dark
            baseColor="#FFFFFF'"
            glowColor="#50505A"
            markerColor="#22d3ee"
            opacity={0.85}
            brightness={1}
            offsetX={320}
            offsetY={64}
            scale={1.125}
          />
        </div>

        <div className="pointer-events-none mt-auto px-4 pb-4 md:px-6 md:pb-6">
          <div className="relative transition duration-300 group-hover:-translate-y-9">
            <div className="text-lg text-white transition-all duration-300 group-hover:text-base">
              Interactive components
            </div>

            <p className="mt-2 text-sm font-light leading-relaxed text-white/75">
              Build interactive headlines and content blocks that react as users interact with elements or scroll
              through the page.
            </p>

            <div className="absolute -left-2 bottom-0 translate-y-11 opacity-0 transition duration-300 group-hover:opacity-100">
              <a
                href="/components"
                className="pointer-events-auto inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-medium text-white transition hover:bg-white/5">
                <span>Explore components</span>
                <ArrowRightIcon className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
