import { Diamond } from "lucide-react";
import { useRef, useEffect, useState } from "react";

interface TicketCardProps {
  onShowQR: () => void;
}

const TicketCard = ({ onShowQR }: TicketCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new ResizeObserver(([entry]) => {
      setDims({ w: entry.contentRect.width, h: entry.contentRect.height });
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const r = 16; // corner radius
  const n = 12; // notch radius
  const { w, h } = dims;
  const cy = h / 2; // notch center Y

  const ticketPath = w && h ? `
    M ${r} 0
    H ${w - r}
    A ${r} ${r} 0 0 1 ${w} ${r}
    V ${cy - n}
    A ${n} ${n} 0 0 0 ${w} ${cy + n}
    V ${h - r}
    A ${r} ${r} 0 0 1 ${w - r} ${h}
    H ${r}
    A ${r} ${r} 0 0 1 0 ${h - r}
    V ${cy + n}
    A ${n} ${n} 0 0 0 0 ${cy - n}
    V ${r}
    A ${r} ${r} 0 0 1 ${r} 0
    Z
  ` : "";

  return (
    <div className="mx-4 -mt-12 relative z-20">
      <div ref={cardRef} className="relative">
        {/* SVG ticket-shaped border */}
        {w > 0 && h > 0 && (
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-30"
            viewBox={`0 0 ${w} ${h}`}
            preserveAspectRatio="none"
          >
            <path
              d={ticketPath}
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="1.5"
              strokeOpacity="0.6"
            />
          </svg>
        )}

        {/* Card background with notch cutouts */}
        <div className="bg-card rounded-2xl shadow-lg shadow-background/50 overflow-hidden">
          {/* Left notch */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-3 w-6 h-6 rounded-full bg-background z-10" />
          {/* Right notch */}
          <div className="absolute top-1/2 -translate-y-1/2 -right-3 w-6 h-6 rounded-full bg-background z-10" />

          {/* Dashed perforation line */}
          <div className="absolute top-0 bottom-0 right-[8.5rem] w-px border-l border-dashed border-muted-foreground/25 z-10" />

          <div className="px-7 py-5 relative z-10">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-muted-foreground uppercase tracking-widest font-medium">Next Game</span>
              <span className="flex items-center gap-1 bg-primary/15 text-primary text-xs font-semibold px-2.5 py-1 rounded-full">
                <Diamond className="w-3 h-3" />
                VIP
              </span>
            </div>

            <h2 className="text-xl font-display font-bold text-primary mb-0.5">Michigan vs. Ohio State</h2>
            <p className="text-sm text-muted-foreground mb-5">Nov 29, 2025 · 12:00 PM ET</p>

            <div className="flex items-end justify-between gap-6">
              <div className="space-y-2 flex-1">
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
                className="w-20 h-20 bg-foreground rounded-lg flex items-center justify-center transition-transform active:scale-95 flex-shrink-0"
                aria-label="Show QR Code"
              >
                <div className="grid grid-cols-5 gap-0.5 p-1.5">
                  {Array.from({ length: 25 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-2.5 h-2.5 rounded-sm ${
                        [0,1,2,4,5,6,8,10,12,14,16,18,20,22,23,24].includes(i)
                          ? "bg-background"
                          : "bg-foreground"
                      }`}
                    />
                  ))}
                </div>
              </button>
            </div>

            <div className="flex items-center justify-between mt-5 pt-3 border-t border-dashed border-muted-foreground/25">
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Season Ticket Holder · 2025</span>
              <span className="text-sm font-semibold text-primary">Gate 4</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
