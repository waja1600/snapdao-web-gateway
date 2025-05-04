
// Helper function to generate a random ID
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}
