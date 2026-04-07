import { useState } from "react";
import HeroHeader from "@/components/HeroHeader";
import TicketCard from "@/components/TicketCard";
import GamedayInfo from "@/components/GamedayInfo";
import VIPPerks from "@/components/VIPPerks";
import BraggingRights from "@/components/BraggingRights";
import QRModal from "@/components/QRModal";
import FoodOrderModal from "@/components/FoodOrderModal";
import ShareModal from "@/components/ShareModal";
import { Utensils } from "lucide-react";

const Index = () => {
  const [qrOpen, setQrOpen] = useState(false);
  const [foodOpen, setFoodOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative">
      <HeroHeader />
      <TicketCard onShowQR={() => setQrOpen(true)} />
      <GamedayInfo />

      {/* Order Food CTA */}
      <div className="px-4 mt-4">
        <button
          onClick={() => setFoodOpen(true)}
          className="w-full flex items-center gap-4 p-4 bg-card rounded-xl border border-border active:bg-secondary transition-colors"
        >
          <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0">
            <Utensils className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-sm font-semibold text-foreground">Order Food to Your Seat</p>
            <p className="text-xs text-muted-foreground">Skip the lines · VIP discount applied</p>
          </div>
          <span className="text-xs text-primary font-semibold">Order →</span>
        </button>
      </div>

      <VIPPerks />
      <BraggingRights onShare={() => setShareOpen(true)} />

      {/* Footer */}
      <div className="px-4 py-8 mt-4 text-center">
        <p className="text-xs text-muted-foreground">Michigan VIP Season Ticket · 2025</p>
        <p className="text-xs text-primary font-semibold mt-1">Go Blue! 〽️</p>
      </div>

      {/* Modals */}
      <QRModal open={qrOpen} onClose={() => setQrOpen(false)} />
      <FoodOrderModal open={foodOpen} onClose={() => setFoodOpen(false)} />
      <ShareModal open={shareOpen} onClose={() => setShareOpen(false)} />
    </div>
  );
};

export default Index;
