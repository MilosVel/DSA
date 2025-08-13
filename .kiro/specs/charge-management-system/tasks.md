# Implementation Plan

- [ ] 1. Create type guards and validation utilities

  - Implement `isPriceType` type guard function to validate PriceType values at runtime
  - Create `validateChargeEntry` function to validate complete charge entry objects
  - Write unit tests for type guard functions with valid and invalid inputs
  - _Requirements: 1.1, 1.2, 4.2_

- [ ] 2. Implement factory functions for type-safe charge creation

  - Create `createChargeEntry` factory function that ensures proper type inference
  - Implement `createChargeMap` function to build charge maps with correct typing
  - Add `defineChargeEntry` helper for individual charge entries with type narrowing
  - Write unit tests for factory functions with various PriceType combinations
  - _Requirements: 3.1, 3.2, 4.1_

- [ ] 3. Create custom error classes for charge validation

  - Implement `InvalidPriceTypeError` class with descriptive error messages
  - Create `InvalidChargeEntryError` class for malformed charge data
  - Add `DateParsingError` class for date-related validation issues
  - Write unit tests for error classes and error message formatting
  - _Requirements: 1.2, 4.3_

- [ ] 4. Enhance the grouping function with improved type safety

  - Refactor `groupChargesCurrentAndFuture` to use validation utilities
  - Add proper error handling for invalid charge entries
  - Improve type assertions with runtime validation
  - Write unit tests for grouping function with edge cases
  - _Requirements: 2.1, 2.2, 2.3_

- [ ] 5. Fix the immediate TypeScript issue in charges.ts

  - Replace the problematic `charge_by_date_map` object with factory function approach
  - Use `createChargeMap` or `as const` assertion to fix type inference
  - Verify that the TypeScript error is resolved
  - Test the existing functionality still works correctly
  - _Requirements: 3.1, 3.2, 3.3_

- [ ] 6. Add comprehensive utility functions for charge management

  - Create helper functions for common charge operations
  - Implement safe conversion utilities for external data
  - Add date validation and formatting utilities
  - Write unit tests for all utility functions
  - _Requirements: 4.1, 4.3_

- [ ] 7. Create integration tests for the complete charge management workflow
  - Write end-to-end tests for charge creation, validation, and grouping
  - Test error handling scenarios with invalid data
  - Verify TypeScript compilation with strict type checking
  - Add performance tests for large charge datasets
  - _Requirements: 2.1, 2.2, 2.3, 4.2_
