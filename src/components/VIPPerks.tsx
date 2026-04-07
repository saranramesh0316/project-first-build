import { useState } from "react";
import { Utensils, Camera, ShoppingBag, Star } from "lucide-react";

const perks = [
  {
    icon: Utensils,
    title: "20% Off Concessions",
    description: "Show your VIP pass at any stadium vendor",
    active: true,
  },
  {
    icon: Camera,
    title: "Pregame Field Access",
    description: "Enter field 90 min before kickoff",
    active: true,
  },
  {
    icon: ShoppingBag,
    title: "Exclusive Merch Drop",
    description: "Limited edition VIP scarf available",
    isNew: true,
    active: true,
  },
  {
    icon: Star,
    title: "Priority Renewal 2026",
    description: "Lock in your seats before public sale",
    badge: "2026",
    active: false,
  },
];

const VIPPerks = () => {
  const [expandedPerk, setExpandedPerk] = useState<number | null>(null);

  return (
    <div className="px-4 mt-6">
      <h3 className="text-xs text-primary uppercase tracking-widest font-medium mb-3">Your VIP Perks</h3>
      <div className="bg-card rounded-xl border border-border overflow-hidden divide-y divide-border">
        {perks.map((perk, index) => (
          <button
            key={perk.title}
            className="w-full flex items-center gap-4 p-4 text-left transition-colors active:bg-secondary"
            onClick={() => setExpandedPerk(expandedPerk === index ? null : index)}
          >
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
              <perk.icon className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-foreground">{perk.title}</span>
                {perk.isNew && (
                  <span className="bg-primary text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded">NEW</span>
                )}
                {perk.badge && (
                  <span className="bg-primary text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded">{perk.badge}</span>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">{perk.description}</p>
              {expandedPerk === index && (
                <div className="mt-3 p-3 bg-secondary rounded-lg">
                  <p className="text-xs text-secondary-foreground">
                    {perk.active
                      ? "✅ This perk is active and ready to use on gameday. Show this screen at the venue."
                      : "🔒 This perk will be available after the current season ends."}
                  </p>
                </div>
              )}
            </div>
            <div className={`w-2 h-2 rounded-full flex-shrink-0 ${perk.active ? "bg-win" : "bg-muted-foreground"}`} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default VIPPerks;
