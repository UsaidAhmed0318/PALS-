export type CartItem = {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  qty: number;
  badge?: string;
};

const CART_STORAGE_KEY = "rbs-cart-items";

function canUseStorage() {
  return typeof window !== "undefined";
}

export function getCartItems(): CartItem[] {
  if (!canUseStorage()) return [];

  const stored = window.localStorage.getItem(CART_STORAGE_KEY);
  if (!stored) return [];

  try {
    const parsed = JSON.parse(stored) as CartItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveCartItems(items: CartItem[]) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("rbs-cart-updated"));
}

export function addCartItem(item: CartItem) {
  const currentItems = getCartItems();
  const existingItem = currentItems.find(
    (currentItem) => currentItem.id === item.id,
  );

  if (existingItem) {
    const updatedItems = currentItems.map((currentItem) =>
      currentItem.id === item.id
        ? { ...currentItem, qty: currentItem.qty + item.qty }
        : currentItem,
    );
    saveCartItems(updatedItems);
    return;
  }

  saveCartItems([...currentItems, item]);
}
