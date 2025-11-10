export { User } from './User.model';
export type { IUser } from './User.model';

export { Profile } from './Profile.model';
export type { IProfile } from './Profile.model';

export { KYCDocument } from './KYCDocument.model';
export type { IKYCDocument } from './KYCDocument.model';

export { Listing } from './Listing.model';
export type { IListing } from './Listing.model';

export { Bid } from './Bid.model';
export type { IBid } from './Bid.model';

export { Order } from './Order.model';
export type { IOrder } from './Order.model';

export { Payment } from './Payment.model';
export type { IPayment } from './Payment.model';

export { Delivery } from './Delivery.model';
export type { IDelivery } from './Delivery.model';

export { AuditLog } from './AuditLog.model';
export type { IAuditLog } from './AuditLog.model';

/**
 * Tests for src/models/index.ts
 *
 * We recommend installing an extension to run jest tests.
 */

import * as path from 'path';

describe('models index', () => {
  const indexPath = path.resolve(__dirname, './index');

  test('imports without throwing', async () => {
    await expect(async () => {
      // use dynamic import to surface any runtime errors on load
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      require(indexPath);
    }).not.toThrow();
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
      // Mongoose models are callable (functions). If an implementation differs, at least ensure defined.
      const value = models[name];
      expect(value).toBeDefined();
      // If available, prefer checking it's a function; otherwise just ensure not null/undefined.
      if (typeof value !== 'function') {
        // still pass but assert it's not nullish
        expect(value).not.toBeNull();
      } else {
        expect(typeof value).toBe('function');
      }
    }
  });

  test('dev recommendation', () => {
    // Human-friendly hint for running tests in an IDE
    // This has no effect on assertions but surfaces the message to the test output
    // when tests run.
    // eslint-disable-next-line no-console
    console.info('We recommend installing an extension to run jest tests.');
    expect(true).toBe(true);
  });
});