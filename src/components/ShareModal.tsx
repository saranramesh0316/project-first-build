import { useState } from "react";
import { X, Instagram, Twitter, Facebook, Link2, Check, Camera, Trophy, Flame } from "lucide-react";
import stadiumHero from "@/assets/stadium-hero.jpg";

interface ShareModalProps {
  open: boolean;
  onClose: () => void;
}

const ShareModal = ({ open, onClose }: ShareModalProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState<string | null>(null);

  const templates = [
    {
      id: 0,
      label: "Gameday",
      emoji: "🏈",
      text: "Live at The Big House! Michigan vs. Ohio State 〽️ #GoBlue #MichiganFootball",
    },
    {
      id: 1,
      label: "Streak",
      emoji: "🔥",
      text: "7 games and counting! Top 5% fan rank this season 🏆 #GoBlue #WolverineNation",
    },
    {
      id: 2,
      label: "VIP",
      emoji: "💎",
      text: "Season ticket holder perks hitting different today. Pregame field access ✅ #MichiganVIP #GoBlue",
    },
  ];

  const socialPlatforms = [
    { name: "Instagram", icon: Instagram, color: "bg-gradient-to-br from-purple-500 to-pink-500" },
    { name: "X / Twitter", icon: Twitter, color: "bg-foreground" },
    { name: "Facebook", icon: Facebook, color: "bg-blue-600" },
  ];

  const handleShare = (platform: string) => {
    setShared(platform);
    setTimeout(() => setShared(null), 2000);
  };

  const handleCopyLink = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!open) return null;

  const currentTemplate = templates[selectedTemplate];

  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-background animate-in slide-in-from-bottom duration-300">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-lg font-bold text-foreground">Share Experience</h2>
        <button onClick={onClose} className="p-2 rounded-full bg-secondary" aria-label="Close">
          <X className="w-5 h-5 text-foreground" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-8">
        {/* Preview Card */}
        <div className="rounded-xl overflow-hidden border border-border mb-6">
          <div className="relative h-44">
            <img src={stadiumHero} alt="Michigan Stadium" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
            <div className="absolute bottom-3 left-4 right-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-primary text-sm font-bold">M</span>
                <span className="text-xs text-primary font-semibold">MICHIGAN VIP</span>
              </div>
              <p className="text-sm text-foreground font-semibold">Michigan vs. Ohio State</p>
              <p className="text-xs text-muted-foreground">Nov 29, 2025 · The Big House</p>
            </div>
          </div>

          <div className="bg-card p-4">
            {/* Stats row */}
            <div className="flex gap-4 mb-3">
              <div className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-primary" />
                <span className="text-xs text-foreground font-semibold">7 game streak</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-primary" />
                <span className="text-xs text-foreground font-semibold">Top 5%</span>
              </div>
            </div>
            <p className="text-sm text-secondary-foreground">{currentTemplate.text}</p>
          </div>
        </div>

        {/* Template Selector */}
        <h3 className="text-xs text-muted-foreground uppercase tracking-widest font-medium mb-3">Choose a template</h3>
        <div className="flex gap-2 mb-6">
          {templates.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedTemplate(t.id)}
              className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-semibold transition-colors ${
                selectedTemplate === t.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              <span className="block text-base mb-0.5">{t.emoji}</span>
              {t.label}
            </button>
          ))}
        </div>

        {/* Add Photo */}
        <button className="w-full flex items-center gap-3 p-4 bg-card rounded-xl border border-border mb-6 active:bg-secondary transition-colors">
          <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
            <Camera className="w-5 h-5 text-primary" />
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-foreground">Add a Photo</p>
            <p className="text-xs text-muted-foreground">Take a gameday selfie to include</p>
          </div>
        </button>

        {/* Share Platforms */}
        <h3 className="text-xs text-muted-foreground uppercase tracking-widest font-medium mb-3">Share to</h3>
        <div className="grid grid-cols-3 gap-3 mb-4">
          {socialPlatforms.map((platform) => (
            <button
              key={platform.name}
              onClick={() => handleShare(platform.name)}
              className="flex flex-col items-center gap-2 p-4 bg-card rounded-xl border border-border active:bg-secondary transition-colors"
            >
              {shared === platform.name ? (
                <div className="w-10 h-10 rounded-full bg-win/20 flex items-center justify-center">
                  <Check className="w-5 h-5 text-win" />
                </div>
              ) : (
                <div className={`w-10 h-10 rounded-full ${platform.color} flex items-center justify-center`}>
                  <platform.icon className="w-5 h-5 text-foreground" />
                </div>
              )}
              <span className="text-[10px] text-muted-foreground font-medium">
                {shared === platform.name ? "Shared!" : platform.name}
              </span>
            </button>
          ))}
        </div>

        {/* Copy link */}
        <button
          onClick={handleCopyLink}
          className="w-full flex items-center justify-center gap-2 p-3 bg-secondary rounded-xl active:bg-muted transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-win" />
              <span className="text-sm font-semibold text-win">Link Copied!</span>
            </>
          ) : (
            <>
              <Link2 className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-semibold text-foreground">Copy Link</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ShareModal;
