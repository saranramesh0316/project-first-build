import HeroHeader from "@/components/HeroHeader";
import TicketCard from "@/components/TicketCard";
import GamedayInfo from "@/components/GamedayInfo";
import VIPPerks from "@/components/VIPPerks";
import BraggingRights from "@/components/BraggingRights";

const Index = () => {
  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative">
      <HeroHeader />
      <TicketCard />
      <GamedayInfo />
      <VIPPerks />
      <BraggingRights />

      {/* Footer */}
      <div className="px-4 py-8 mt-4 text-center">
        <p className="text-xs text-muted-foreground">Michigan VIP Season Ticket · 2025</p>
        <p className="text-xs text-primary font-display font-semibold mt-1">Go Blue! 〽️</p>
      </div>
    </div>
  );
};

export default Index;
