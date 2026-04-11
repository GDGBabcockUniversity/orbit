import React from "react";

interface SongEmbedProps {
  song: { title: string; artist: string } | string | null | undefined;
  className?: string;
}

const SongEmbed: React.FC<SongEmbedProps> = ({ song, className = "" }) => {
  if (!song) return null;

  let title = "";
  let artist = "";

  if (typeof song === "string") {
    if (
      song.trim().toLowerCase() === "nil" ||
      song.trim().toLowerCase() === "none"
    ) {
      return null;
    }
    title = song.replace(/\n/g, " ").trim();
  } else {
    title = song.title;
    artist = song.artist;
  }

  if (!title) return null;

  const searchQuery = artist ? `${title} ${artist}` : title;
  const searchUrl = `https://open.spotify.com/search/${encodeURIComponent(
    searchQuery,
  )}`;

  return (
    <a
      href={searchUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center justify-between bg-background/5 rounded-full p-2 pr-3 transition-transform hover:scale-[1.02] active:scale-[0.98] border border-background/10 hover:border-primary/30 ${className}`}
      title={`Search "${searchQuery}" on Spotify`}
    >
      <div className="flex items-center gap-3 overflow-hidden">
        {/* Spotify Logo */}
        <div className="shrink-0 flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-11 text-primary"
          >
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.24 1.021zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.84.24 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
          </svg>
        </div>

        {/* Text Container */}
        <div className="flex flex-col justify-center min-w-0 pr-2">
          <p className="text-background font-google-sans text-[15px] font-bold truncate leading-tight">
            {title}
          </p>
          {artist && (
            <p className="text-background/70 font-google-sans text-[13px] truncate leading-tight mt-0.5">
              {artist}
            </p>
          )}
        </div>
      </div>

      {/* Play Button */}
      <div className="size-10 rounded-full bg-primary flex items-center justify-center shrink-0 ml-2 shadow-lg shadow-primary/30">
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-5 text-white ml-0.5"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    </a>
  );
};

export default SongEmbed;
