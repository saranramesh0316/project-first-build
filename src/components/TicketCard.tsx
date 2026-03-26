import { useState } from "react";
import { Diamond } from "lucide-react";

const TicketCard = () => {
  const [showQR, setShowQR] = useState(false);

  return (
    <div className="mx-4 -mt-12 relative z-20">
      <div className="bg-card rounded-xl border border-border p-5 shadow-lg shadow-background/50">
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
            onClick={() => setShowQR(!showQR)}
            className="w-24 h-24 bg-foreground rounded-lg flex items-center justify-center transition-transform active:scale-95"
            aria-label="Show QR Code"
          >
            {showQR ? (
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
            ) : (
              <div className="text-center">
                <div className="grid grid-cols-5 gap-0.5 p-2 opacity-40">
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
              </div>
            )}
          </button>
        </div>

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
          <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Season Ticket Holder · 2025</span>
          <span className="text-sm font-semibold text-primary">Gate 4</span>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
