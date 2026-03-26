import { X, Diamond, Maximize2 } from "lucide-react";

interface QRModalProps {
  open: boolean;
  onClose: () => void;
}

const QRModal = ({ open, onClose }: QRModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-sm mx-4 flex flex-col items-center">
        {/* Close button */}
        <button
          onClick={onClose}
          className="self-end mb-6 p-2 rounded-full bg-secondary active:bg-muted transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-foreground" />
        </button>

        {/* VIP Badge */}
        <div className="flex items-center gap-2 mb-2">
          <Diamond className="w-4 h-4 text-primary" />
          <span className="text-xs text-primary font-semibold uppercase tracking-widest">VIP Season Ticket</span>
          <Diamond className="w-4 h-4 text-primary" />
        </div>

        {/* Game Info */}
        <h2 className="text-2xl font-display font-bold text-primary text-center">Michigan vs. Ohio State</h2>
        <p className="text-sm text-muted-foreground mt-1 mb-8">Nov 29, 2025 · 12:00 PM ET</p>

        {/* Large QR Code */}
        <div className="w-64 h-64 bg-foreground rounded-2xl flex items-center justify-center p-4 shadow-lg shadow-primary/10">
          <div className="grid grid-cols-7 gap-1 w-full h-full">
            {Array.from({ length: 49 }).map((_, i) => {
              const isBlock = [
                0,1,2,4,5,6, 7,13, 14,16,18,20, 21,22,23,25,26,27,
                28,30,32,34, 35,37,39,41, 42,43,44,46,47,48,
                8,9,10,38,39,40, 3,24,45, 11,17,31
              ].includes(i);
              return (
                <div
                  key={i}
                  className={`rounded-sm ${isBlock ? "bg-background" : "bg-foreground"}`}
                />
              );
            })}
          </div>
        </div>

        {/* Instruction */}
        <div className="mt-8 flex items-center gap-2 text-muted-foreground">
          <Maximize2 className="w-4 h-4" />
          <span className="text-sm">Hold up to scanner at gate</span>
        </div>

        {/* Ticket Details */}
        <div className="mt-6 w-full bg-card rounded-xl border border-border p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest block">Section</span>
              <span className="text-xl font-display font-bold text-foreground">27</span>
            </div>
            <div>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest block">Row</span>
              <span className="text-xl font-display font-bold text-foreground">AA</span>
            </div>
            <div>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest block">Seat</span>
              <span className="text-xl font-display font-bold text-foreground">12</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-border flex justify-between items-center">
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Gordon Freeman</span>
            <span className="text-sm font-semibold text-primary">Gate 4</span>
          </div>
        </div>

        {/* Brightness hint */}
        <p className="text-[10px] text-muted-foreground mt-4 text-center">
          Screen brightness has been maximized for scanning
        </p>
      </div>
    </div>
  );
};

export default QRModal;
