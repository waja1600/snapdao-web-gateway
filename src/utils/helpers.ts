
// Helper function to generate a random ID
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

// Format currency based on user's locale
export const formatter = new Intl.NumberFormat('ar-SA', {
  style: 'currency',
  currency: 'SAR',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

