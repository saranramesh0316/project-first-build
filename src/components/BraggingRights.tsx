import { useState } from "react";
import { Trophy, Share2, Flame, Check, ChevronRight } from "lucide-react";

const seasonGames = [
  { opponent: "vs. Fresno State", date: "Aug 30", result: "W 45-10", attended: true },
  { opponent: "vs. Texas", date: "Sep 13", result: "W 28-24", attended: true },
  { opponent: "vs. Arkansas State", date: "Sep 20", result: "W 52-7", attended: true },
  { opponent: "vs. USC", date: "Sep 27", result: "W 31-21", attended: true },
  { opponent: "vs. Northwestern", date: "Oct 11", result: "W 35-14", attended: true },
  { opponent: "vs. Illinois", date: "Oct 25", result: "L 20-24", attended: false },
  { opponent: "vs. Indiana", date: "Nov 8", result: "W 27-17", attended: true },
  { opponent: "vs. Ohio State", date: "Nov 29", result: null, attended: false },
];

interface BraggingRightsProps {
  onShare: () => void;
}

const BraggingRights = ({ onShare }: BraggingRightsProps) => {
  const attendedCount = seasonGames.filter((g) => g.attended).length;

  return (
    <div className="px-4 mt-6">
      <h3 className="text-xs text-muted-foreground uppercase tracking-widest font-medium mb-3">Bragging Rights</h3>

      {/* Streak Card */}
      <div className="bg-card rounded-xl border border-border p-4 mb-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <Trophy className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm font-semibold text-foreground">Season Streak</p>
              <p className="text-xs text-muted-foreground">Consecutive games attended</p>
            </div>
          </div>
          <button
            onClick={onShare}
            className="p-2 rounded-full bg-secondary active:bg-muted transition-colors"
            aria-label="Share stats"
          >
            <Share2 className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-2">
          <div className="flex items-end gap-1 mb-1">
            <span className="text-4xl font-display font-bold text-foreground">{attendedCount}</span>
            <span className="text-sm text-muted-foreground mb-1">/ {seasonGames.length} games</span>
          </div>
          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${(attendedCount / seasonGames.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="flex items-center gap-1 text-primary">
          <Flame className="w-4 h-4 animate-pulse-glow" />
          <span className="text-xs font-semibold">Hot streak!</span>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3 mt-4 pt-3 border-t border-border">
          <div className="text-center">
            <p className="text-2xl font-display font-bold text-foreground">23</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Lifetime</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-display font-bold text-foreground">3rd</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Season</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-display font-bold text-primary">Top 5%</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Fan Rank</p>
          </div>
        </div>
      </div>

      {/* Season Results */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="p-4 pb-2">
          <h4 className="text-xs text-muted-foreground uppercase tracking-widest font-medium">2025 Season</h4>
        </div>
        <div className="divide-y divide-border">
          {seasonGames.map((game) => (
            <button
              key={game.opponent}
              className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors active:bg-secondary"
            >
              <div className="flex-shrink-0">
                {game.attended ? (
                  <Check className="w-4 h-4 text-win" />
                ) : (
                  <div className={`w-4 h-4 rounded-full ${game.result ? "bg-loss" : "bg-muted-foreground"}`} style={{ width: 6, height: 6, margin: 5 }} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">{game.opponent}</p>
                <p className="text-xs text-muted-foreground">{game.date}</p>
              </div>
              {game.result ? (
                <span className={`text-sm font-semibold ${game.result.startsWith("W") ? "text-win" : "text-loss"}`}>
                  {game.result}
                </span>
              ) : (
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BraggingRights;
