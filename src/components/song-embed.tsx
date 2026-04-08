import React from "react";

interface SongEmbedProps {
  song: string;
  className?: string;
}

const SongEmbed: React.FC<SongEmbedProps> = ({ song, className = "" }) => {
  // If no song is provided, or it's a common placeholder, don't render anything
  if (
    !song ||
    song.trim().toLowerCase() === "nil" ||
    song.trim().toLowerCase() === "none"
  ) {
    return null;
  }

  // Clean up the song string (remove newlines, extra spaces)
  const cleanSong = song.replace(/\n/g, " ").trim();

  // Create a Spotify search URL using the song text
  const searchUrl = `https://open.spotify.com/search/${encodeURIComponent(
    cleanSong
  )}`;

  return (
    <a
      href={searchUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center gap-3 bg-[#1DB954]/10 hover:bg-[#1DB954]/20 border border-[#1DB954]/20 rounded-xl p-3 transition-colors group ${className}`}
      title={`Search "${cleanSong}" on Spotify`}
    >
      <div className="size-8 rounded-full bg-[#1DB954]/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-4 text-[#1DB954]"
        >
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.24 1.021zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.84.24 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] uppercase tracking-wider text-[#1DB954]/70 font-google-sans font-bold mb-0.5">
          Currently Listening To
        </p>
        <p className="text-white/90 font-google-sans text-sm font-medium truncate">
          {cleanSong}
        </p>
      </div>
      <div className="shrink-0 text-white/30 group-hover:text-white/60 transition-colors">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </div>
    </a>
  );
};

export default SongEmbed;
