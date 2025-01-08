// It defines constants used in authentication and authorization processes.

// The short lifespan of the ACCESS_TOKEN means that if it gets stolen, the attacker can only use it for a limited time.
// The REFRESH_TOKEN is longer-lasting and is usually stored more securely.

export const ACCESS_TOKEN = "access";
export const REFRESH_TOKEN = "refresh";
