import { Diamond } from "lucide-react";

interface TicketCardProps {
  onShowQR: () => void;
}

const TicketCard = ({ onShowQR }: TicketCardProps) => {
  return (
    <div className="mx-4 -mt-12 relative z-20">
      {/* Ticket shape with notches */}
      <div className="relative bg-card rounded-2xl shadow-lg shadow-background/50 overflow-hidden">
        {/* Dashed perforation line */}
        <div className="absolute top-0 bottom-0 right-[7.5rem] w-px border-l border-dashed border-muted-foreground/30" />

        {/* Left notch */}
        <div className="absolute top-1/2 -translate-y-1/2 -left-3 w-6 h-6 rounded-full bg-background" />
        {/* Right notch */}
        <div className="absolute top-1/2 -translate-y-1/2 -right-3 w-6 h-6 rounded-full bg-background" />

        <div className="p-5">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-muted-foreground uppercase tracking-widest font-medium">Next Game</span>
            <span className="flex items-center gap-1 bg-primary/15 text-primary text-xs font-semibold px-2.5 py-1 rounded-full">
              <Diamond className="w-3 h-3" />
              VIP
            </span>
          </div>

          <h2 className="text-xl font-display font-bold text-primary mb-0.5">Michigan vs. Ohio State</h2>
          <p className="text-sm text-muted-foreground mb-4">Nov 29, 2025 · 12:00 PM ET</p>

          <div className="flex items-end justify-between">
            <div className="space-y-2">
              <div>
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Section</span>
                <p className="text-2xl font-display font-bold text-foreground">27</p>
              </div>
              <div className="flex gap-6">
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Row</span>
                  <p className="text-lg font-display font-bold text-foreground">AA</p>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Seat</span>
                  <p className="text-lg font-display font-bold text-foreground">12</p>
                </div>
              </div>
            </div>

            <button
              onClick={onShowQR}
              className="w-24 h-24 bg-foreground rounded-lg flex items-center justify-center transition-transform active:scale-95"
              aria-label="Show QR Code"
            >
              <div className="grid grid-cols-5 gap-0.5 p-2">
                {Array.from({ length: 25 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-sm ${
                      [0,1,2,4,5,6,8,10,12,14,16,18,20,22,23,24].includes(i)
                        ? "bg-background"
                        : "bg-foreground"
                    }`}
                  />
                ))}
              </div>
            </button>
          </div>

          <div className="flex items-center justify-between mt-4 pt-3 border-t border-dashed border-muted-foreground/30">
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Season Ticket Holder · 2025</span>
            <span className="text-sm font-semibold text-primary">Gate 4</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
