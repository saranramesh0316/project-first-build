import { useState } from "react";
import { X, Minus, Plus, ShoppingCart, Clock, MapPin, Check } from "lucide-react";

interface FoodItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  vipDiscount: boolean;
  image: string;
}

const menuItems: FoodItem[] = [
  { id: 1, name: "Big House Burger", description: "1/3 lb Angus patty, cheddar, pickles", price: 12.00, category: "Mains", vipDiscount: true, image: "🍔" },
  { id: 2, name: "Loaded Nachos", description: "Queso, jalapeños, sour cream, salsa", price: 10.00, category: "Mains", vipDiscount: true, image: "🧀" },
  { id: 3, name: "Wolverine Dog", description: "All-beef frank, stadium mustard, relish", price: 7.00, category: "Mains", vipDiscount: true, image: "🌭" },
  { id: 4, name: "Soft Pretzel", description: "Warm salted pretzel with cheese dip", price: 6.00, category: "Snacks", vipDiscount: true, image: "🥨" },
  { id: 5, name: "Popcorn Bucket", description: "Freshly popped, lightly salted", price: 5.00, category: "Snacks", vipDiscount: true, image: "🍿" },
  { id: 6, name: "Craft Beer", description: "Local Michigan IPA, 16oz", price: 11.00, category: "Drinks", vipDiscount: false, image: "🍺" },
  { id: 7, name: "Lemonade", description: "Fresh-squeezed, served cold", price: 5.00, category: "Drinks", vipDiscount: true, image: "🍋" },
  { id: 8, name: "Hot Chocolate", description: "Rich and creamy, topped with marshmallows", price: 4.50, category: "Drinks", vipDiscount: true, image: "☕" },
];

interface FoodOrderModalProps {
  open: boolean;
  onClose: () => void;
}

const FoodOrderModal = ({ open, onClose }: FoodOrderModalProps) => {
  const [cart, setCart] = useState<Record<number, number>>({});
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Mains");

  const categories = ["Mains", "Snacks", "Drinks"];

  const addToCart = (id: number) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => {
      const newCart = { ...prev };
      if (newCart[id] > 1) newCart[id]--;
      else delete newCart[id];
      return newCart;
    });
  };

  const cartTotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = menuItems.find((i) => i.id === Number(id));
    if (!item) return sum;
    const price = item.vipDiscount ? item.price * 0.8 : item.price;
    return sum + price * qty;
  }, 0);

  const cartCount = Object.values(cart).reduce((s, q) => s + q, 0);

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      setOrderPlaced(false);
      setCart({});
      onClose();
    }, 3000);
  };

  if (!open) return null;

  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-background animate-in slide-in-from-bottom duration-300">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div>
          <h2 className="text-lg font-bold text-foreground">Order Food</h2>
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
            <MapPin className="w-3 h-3" />
            <span>Delivering to Section 27, Row AA, Seat 12</span>
          </div>
        </div>
        <button onClick={onClose} className="p-2 rounded-full bg-secondary" aria-label="Close">
          <X className="w-5 h-5 text-foreground" />
        </button>
      </div>

      {/* VIP discount banner */}
      <div className="mx-4 mt-3 p-2.5 bg-primary/10 border border-primary/20 rounded-lg flex items-center gap-2">
        <span className="text-primary text-xs font-semibold">🏷️ VIP: 20% off most items applied automatically</span>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 px-4 mt-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              activeCategory === cat
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Order placed confirmation */}
      {orderPlaced && (
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <div className="w-16 h-16 rounded-full bg-win/20 flex items-center justify-center mb-4">
            <Check className="w-8 h-8 text-win" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">Order Placed!</h3>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span className="text-sm">Estimated delivery: 10-15 min to your seat</span>
          </div>
        </div>
      )}

      {/* Menu items */}
      {!orderPlaced && (
        <div className="flex-1 overflow-y-auto px-4 mt-3 pb-32">
          {menuItems
            .filter((item) => item.category === activeCategory)
            .map((item) => {
              const discountedPrice = item.vipDiscount ? item.price * 0.8 : item.price;
              const qty = cart[item.id] || 0;

              return (
                <div key={item.id} className="flex items-center gap-4 py-3 border-b border-border last:border-0">
                  <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center text-2xl flex-shrink-0">
                    {item.image}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">{item.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm font-bold text-primary">${discountedPrice.toFixed(2)}</span>
                      {item.vipDiscount && (
                        <span className="text-xs text-muted-foreground line-through">${item.price.toFixed(2)}</span>
                      )}
                    </div>
                  </div>

                  {qty === 0 ? (
                    <button
                      onClick={() => addToCart(item.id)}
                      className="px-4 py-1.5 rounded-full bg-secondary text-foreground text-xs font-semibold active:bg-muted transition-colors"
                    >
                      Add
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center active:bg-muted"
                      >
                        <Minus className="w-3 h-3 text-foreground" />
                      </button>
                      <span className="text-sm font-bold text-foreground w-4 text-center">{qty}</span>
                      <button
                        onClick={() => addToCart(item.id)}
                        className="w-7 h-7 rounded-full bg-primary flex items-center justify-center active:bg-primary/80"
                      >
                        <Plus className="w-3 h-3 text-primary-foreground" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      )}

      {/* Cart footer */}
      {cartCount > 0 && !orderPlaced && (
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-card border-t border-border z-10">
          <button
            onClick={handlePlaceOrder}
            className="w-full flex items-center justify-between bg-primary text-primary-foreground rounded-xl p-4 font-semibold active:bg-primary/90 transition-colors"
          >
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              <span>{cartCount} item{cartCount > 1 ? "s" : ""}</span>
            </div>
            <span className="text-lg font-bold">${cartTotal.toFixed(2)}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default FoodOrderModal;
