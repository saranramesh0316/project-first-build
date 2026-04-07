import { Bell, User } from "lucide-react";
import stadiumHero from "@/assets/stadium-hero.jpg";
import michiganM from "@/assets/michigan-m.png";

const HeroHeader = () => {
  return (
    <div className="relative h-56 overflow-hidden">
      <img
        src={stadiumHero}
        alt="Michigan Stadium at night"
        className="absolute inset-0 w-full h-full object-cover"
        width={1024}
        height={576}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
      <div className="relative z-10 flex items-start justify-between p-5 pt-12">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <img src={michiganM} alt="Michigan M" className="w-5 h-4" />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Welcome Back</span>
          </div>
          <h1 className="text-3xl font-body font-bold text-primary">Gordon</h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative p-2 rounded-full bg-secondary/60 backdrop-blur-sm" aria-label="Notifications">
            <Bell className="w-5 h-5 text-foreground" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
          </button>
          <button className="p-2 rounded-full bg-secondary/60 backdrop-blur-sm" aria-label="Profile">
            <User className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroHeader;
