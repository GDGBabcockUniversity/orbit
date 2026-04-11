import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { TEAM_MEMBERS } from "../lib/team";
import SectionBadge from "../components/ui/section-badge";
import SongEmbed from "../components/song-embed";

const TeamPage = () => {
  const [selectedTeam, setSelectedTeam] = useState<string>("All");

  const teamOrder = useMemo(
    () => [
      "Organizing",
      "Logistics (Events Planning Team)",
      "Engineering",
      "Design",
      "Media (Content & Editors)",
    ],
    [],
  );

  // Extract unique team names for the filter
  const teams = useMemo(() => {
    const allTeams = TEAM_MEMBERS.map((m) => m.team);
    // Handle cases where a person is on multiple teams (comma separated)
    const splitTeams = allTeams.flatMap((t) =>
      t.split(",").map((s) => s.trim()),
    );
    const uniqueTeams = Array.from(new Set(splitTeams)).filter(Boolean);

    uniqueTeams.sort((a, b) => {
      const aIdx = teamOrder.indexOf(a);
      const bIdx = teamOrder.indexOf(b);
      return (aIdx === -1 ? 999 : aIdx) - (bIdx === -1 ? 999 : bIdx);
    });

    return ["All", ...uniqueTeams];
  }, [teamOrder]);

  const filteredMembers = useMemo(() => {
    let members = TEAM_MEMBERS;
    if (selectedTeam !== "All") {
      members = TEAM_MEMBERS.filter((m) => m.team.includes(selectedTeam));
    }

    return [...members].sort((a, b) => {
      const aTeams = a.team.split(",").map((t) => t.trim());
      const bTeams = b.team.split(",").map((t) => t.trim());

      const aIdx = Math.min(
        ...aTeams.map((t) => {
          const idx = teamOrder.indexOf(t);
          return idx === -1 ? 999 : idx;
        }),
      );

      const bIdx = Math.min(
        ...bTeams.map((t) => {
          const idx = teamOrder.indexOf(t);
          return idx === -1 ? 999 : idx;
        }),
      );

      return aIdx - bIdx;
    });
  }, [selectedTeam, teamOrder]);

  return (
    <div className="bg-foreground min-h-screen pt-24 pb-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="hero-planet-glow opacity-30" />
      <div className="hero-grain" />

      {/* Back link */}
      <div className="px-6 md:px-12 pt-8 relative z-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-background/60 font-google-sans text-sm hover:text-background transition"
        >
          <span>&larr;</span>
          Back to Home
        </Link>
      </div>

      {/* Header */}
      <div className="text-center px-6 pt-8 pb-12 relative z-10">
        <SectionBadge>BEHIND THE SCENES</SectionBadge>
        <h1 className="font-space-grotesk text-3xl md:text-4xl lg:text-5xl font-bold text-background mt-5 mb-4">
          Meet the Orbit Team
        </h1>
        <p className="text-background/50 font-google-sans text-sm md:text-base max-w-xl mx-auto leading-relaxed">
          The brilliant minds working tirelessly behind the scenes to close the
          distance between campus and industry.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="px-6 max-w-6xl mx-auto mb-12 relative z-10">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {teams.map((teamName) => (
            <button
              key={teamName}
              onClick={() => setSelectedTeam(teamName)}
              className={`px-4 py-2 rounded-full font-google-sans text-sm transition-all duration-300 ${
                selectedTeam === teamName
                  ? "bg-primary text-white font-medium"
                  : "bg-surface border border-background/10 text-background/60 hover:text-background hover:border-background/30"
              }`}
            >
              {teamName}
            </button>
          ))}
        </div>
      </div>

      {/* Team Grid */}
      <div className="px-6 md:px-12 lg:px-20 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMembers.map((member, i) => (
            <div
              key={i}
              className="group bg-surface border border-background/10 rounded-3xl overflow-hidden flex flex-col hover:border-primary/30 transition-colors duration-300"
            >
              {/* Headshot */}
              <div className="aspect-square bg-background/5 relative overflow-hidden shrink-0">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-primary-bright/20 to-primary-deep/20">
                    <span className="font-space-grotesk text-primary/30 text-6xl font-bold">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 flex flex-col flex-1">
                <div className="mb-6 flex-1">
                  <h3 className="font-space-grotesk text-xl font-bold text-background mb-3">
                    {member.name}
                  </h3>

                  <div className="flex flex-wrap gap-2 mb-5">
                    {member.team.split(",").map((t, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-background/5 text-background/80 text-[10px] uppercase tracking-wider font-google-sans rounded-full border border-background/10"
                      >
                        {t.trim()}
                      </span>
                    ))}
                  </div>

                  {member.quote && (
                    <p className="text-background/50 font-google-sans text-sm italic mt-3 border-l-2 border-primary/30 pl-3 py-1">
                      "{member.quote.replace(/^["']|["']$/g, "")}"
                    </p>
                  )}

                  <div className="mt-5 space-y-3 font-google-sans text-sm">
                    {member.surprisingFact && (
                      <div>
                        <span className="text-background/40 uppercase tracking-wider text-[10px] font-bold block mb-0.5">
                          Surprising Fact
                        </span>
                        <span className="text-background/80">
                          {member.surprisingFact}
                        </span>
                      </div>
                    )}
                    {member.comfortActivity && (
                      <div>
                        <span className="text-background/40 uppercase tracking-wider text-[10px] font-bold block mb-0.5">
                          Comfort Activity
                        </span>
                        <span className="text-background/80">
                          {member.comfortActivity}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Spotify Embed */}
                {member.song && (
                  <div className="mb-6">
                    <SongEmbed song={member.song} />
                  </div>
                )}

                {/* Socials Footer */}
                <div className="mt-auto pt-4 border-t border-background/10 flex items-center justify-between">
                  <span className="text-background/40 text-xs font-google-sans uppercase tracking-widest">
                    Connect
                  </span>
                  <div className="flex items-center gap-4">
                    {member.socials.twitter && (
                      <a
                        href={member.socials.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-background/40 hover:text-background transition-colors"
                        title="Twitter / X"
                      >
                        <svg
                          fill="currentColor"
                          viewBox="0 0 1200 1227"
                          className="size-5"
                        >
                          <path
                            // fill="#fff"
                            d="M714.163 519.284 1160.89 0h-105.86L667.137 450.887 357.328 0H0l468.492 681.821L0 1226.37h105.866l409.625-476.152 327.181 476.152H1200L714.137 519.284h.026ZM569.165 687.828l-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721H892.476L569.165 687.854v-.026Z"
                          />
                        </svg>
                      </a>
                    )}
                    {member.socials.instagram && (
                      <a
                        href={member.socials.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-background/40 hover:text-background transition-colors"
                        title="Instagram"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="size-5"
                        >
                          <rect
                            x="2"
                            y="2"
                            width="20"
                            height="20"
                            rx="5"
                            ry="5"
                          />
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                        </svg>
                      </a>
                    )}
                    {member.socials.linkedin && (
                      <a
                        href={member.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-background/40 hover:text-background transition-colors"
                        title="LinkedIn"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="size-5"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredMembers.length === 0 && (
            <div className="col-span-full py-12 text-center">
              <p className="text-background/40 font-google-sans">
                No team members found for this filter.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
