import { AuthMode } from "@/types/erpnext";

export interface RouteConfig {
  pattern: RegExp;
  authMode: AuthMode;
  methods: string[];
  description: string;
}

/**
 * CRITICAL SECURITY: ALLOWLIST OF PERMITTED ROUTES
 * Only routes matching these patterns are allowed through the proxy.
 *
 * Rules:
 * 1. NO internal Frappe methods (delete_doc, run_doc_method, etc.)
 * 2. NO direct database access
 * 3. NO file system access
 * 4. Explicit method whitelisting
 */
export const ROUTE_ALLOWLIST: RouteConfig[] = [
  // ==================== PUBLIC ROUTES (API Key) ====================
  {
    pattern: /^\/api\/resource\/Item$/,
    authMode: AuthMode.API_KEY,
    methods: ["GET"],
    description: "Public: List all items",
  },
  {
    pattern: /^\/api\/resource\/Item\/[A-Za-z0-9\-\_\.\%\+\s]+$/,
    authMode: AuthMode.API_KEY,
    methods: ["GET"],
    description: "Public: Get single item details",
  },
  {
    pattern: /^\/api\/resource\/Item\%20Price$/,
    authMode: AuthMode.API_KEY,
    methods: ["GET"],
    description: "Public: Get item pricing",
  },
  {
    pattern: /^\/api\/resource\/Website\%20Item$/,
    authMode: AuthMode.API_KEY,
    methods: ["GET"],
    description: "Public: Get website items (published products)",
  },
  {
    pattern:
      /^\/api\/method\/erpnext\.e_commerce\.api\.get_product_filter_data$/,
    authMode: AuthMode.API_KEY,
    methods: ["GET", "POST"],
    description: "Public: Get product filters",
  },
  {
    pattern:
      /^\/api\/method\/erpnext\.stock\.get_item_details\.get_item_details$/,
    authMode: AuthMode.API_KEY,
    methods: ["POST"],
    description: "Public: Get item availability",
  },
  {
    pattern: /^\/api\/resource\/Item\%20Group$/,
    authMode: AuthMode.API_KEY,
    methods: ["GET"],
    description: "Public: Get item pricing",
  },

  // ==================== PRIVATE ROUTES (OAuth) ====================
  {
    pattern: /^\/api\/resource\/Customer\/[A-Z0-9\-]+$/,
    authMode: AuthMode.OAUTH,
    methods: ["GET", "PUT"],
    description: "Private: Customer profile",
  },
  {
    pattern: /^\/api\/resource\/Sales\%20Order$/,
    authMode: AuthMode.OAUTH,
    methods: ["GET", "POST"],
    description: "Private: Sales orders (list/create)",
  },
  {
    pattern: /^\/api\/resource\/Sales\%20Order\/[A-Z0-9\-]+$/,
    authMode: AuthMode.OAUTH,
    methods: ["GET"],
    description: "Private: Single sales order details",
  },
  {
    pattern: /^\/api\/resource\/Address$/,
    authMode: AuthMode.OAUTH,
    methods: ["GET", "POST"],
    description: "Private: User addresses",
  },
  {
    pattern: /^\/api\/resource\/Address\/[A-Z0-9\-]+$/,
    authMode: AuthMode.OAUTH,
    methods: ["GET", "PUT", "DELETE"],
    description: "Private: Single address CRUD",
  },
  {
    pattern:
      /^\/api\/method\/erpnext\.e_commerce\.shopping_cart\.cart\.get_cart_quotation$/,
    authMode: AuthMode.OAUTH,
    methods: ["GET"],
    description: "Private: Get user cart",
  },
  {
    pattern:
      /^\/api\/method\/erpnext\.e_commerce\.shopping_cart\.cart\.update_cart$/,
    authMode: AuthMode.OAUTH,
    methods: ["POST"],
    description: "Private: Update shopping cart",
  },
  {
    pattern: /^\/api\/method\/erpnext\.e_commerce\.api\.place_order$/,
    authMode: AuthMode.OAUTH,
    methods: ["POST"],
    description: "Private: Place order (checkout)",
  },
  {
    pattern: /^\/api\/method\/frappe\.integrations\.oauth2\.openid_profile$/,
    authMode: AuthMode.OAUTH,
    methods: ["GET"],
    description: "Private: OAuth user profile",
  },
];

/**
 * SECURITY: Explicitly blocked patterns (defense in depth)
 */
const BLOCKED_PATTERNS = [
  /delete_doc/i,
  /run_doc_method/i,
  /frappe\.client\.delete/i,
  /frappe\.db\.sql/i,
  /frappe\.execute/i,
  /eval/i,
  /exec/i,
];

/**
 * Validate if a route is allowed through the proxy
 */
export function validateRoute(
  path: string,
  method: string
): { allowed: boolean; authMode?: AuthMode; reason?: string } {
  // First check: Blocked patterns (explicit deny)
  for (const blockedPattern of BLOCKED_PATTERNS) {
    if (blockedPattern.test(path)) {
      return {
        allowed: false,
        reason: `Blocked: Path matches prohibited pattern (${blockedPattern})`,
      };
    }
  }

  // Second check: Allowlist validation
  for (const route of ROUTE_ALLOWLIST) {
    if (route.pattern.test(path)) {
      // Check if HTTP method is allowed
      if (!route.methods.includes(method.toUpperCase())) {
        return {
          allowed: false,
          reason: `Method ${method} not allowed for this route. Allowed: ${route.methods.join(
            ", "
          )}`,
        };
      }

      return {
        allowed: true,
        authMode: route.authMode,
      };
    }
  }

  // Not in allowlist
  return {
    allowed: false,
    reason: "Route not in allowlist",
  };
}
