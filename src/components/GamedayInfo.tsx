import { Car, MapPin, Clock, Navigation } from "lucide-react";

const infoItems = [
  {
    icon: Car,
    label: "Parking",
    value: "Lot SC-2",
    detail: "Pioneer High School · Opens 7:00 AM",
  },
  {
    icon: MapPin,
    label: "Your Gate",
    value: "Gate 4",
    detail: "South side · Stadium Blvd entrance",
  },
  {
    icon: Clock,
    label: "Gates Open",
    value: "10:00 AM",
    detail: "2 hours before kickoff",
  },
  {
    icon: Navigation,
    label: "Distance",
    value: "12 min",
    detail: "From your location · Ann Arbor",
  },
];

const GamedayInfo = () => {
  return (
    <div className="px-4 mt-6">
      <h3 className="text-xs text-primary uppercase tracking-widest font-medium mb-3">Gameday Info</h3>
      <div className="grid grid-cols-2 gap-3">
        {infoItems.map((item) => (
          <button
            key={item.label}
            className="bg-card rounded-xl border border-border p-4 text-left transition-colors active:bg-secondary"
          >
            <div className="flex items-center gap-2 mb-2">
              <item.icon className="w-4 h-4 text-muted-foreground" />
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest">{item.label}</span>
            </div>
            <p className="text-lg font-bold text-foreground mb-0.5">{item.value}</p>
            <p className="text-xs text-muted-foreground leading-relaxed">{item.detail}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default GamedayInfo;
