/**
 * Tests for models index
 * Kept outside src/ so TS build for runtime won't try to compile them.
 */

import * as path from 'path';

describe('models index', () => {
  const indexPath = path.resolve(__dirname, '../src/models/index');

  test('imports without throwing', () => {
    // require the module to surface runtime import errors
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    expect(() => require(indexPath)).not.toThrow();
  });

  test('exports expected model constructors', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const models = require(indexPath);

    const expected = [
      'User',
      'Profile',
      'KYCDocument',
      'Listing',
      'Bid',
      'Order',
      'Payment',
      'Delivery',
      'AuditLog',
    ];

    for (const name of expected) {
      expect(models).toHaveProperty(name);
      const value = models[name];
      expect(value).toBeDefined();
      if (typeof value === 'function') expect(typeof value).toBe('function');
    }
  });
});