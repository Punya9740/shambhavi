# MedVault Security Specification

## Data Invariants
1. A user can only read/write their own user document.
2. A user can only read/write their own profile (patient or doctor).
3. The `role` and `onboarded` fields in the `users` collection cannot be changed by the user after onboarding (except through specific transitions).
4. `email` must match the authenticated email.
5. All writes must include server timestamps where applicable.

## The Dirty Dozen Payloads (Red Team Test Cases)
1. **Identity Spoofing**: Attempt to create a user profile for a different UID.
2. **Role Elevation**: Attempt to change `role` to 'admin' after creation.
3. **Ghost Fields**: Attempt to add `isVIP: true` to a patient profile.
4. **Invalid IDs**: Attempt to use `../../etc/passwd` as a userId.
5. **PII Breach**: Attempt to read another user's address.
6. **State Skip**: Attempt to set `onboarded: true` without providing profile data.
7. **Size Poisoning**: Send a 2MB string for the `address` field.
8. **Type Poisoning**: Send `age: "ancient"` instead of a number.
9. **Timestamp Fraud**: Send a client-side timestamp for `updatedAt`.
10. **Email Spoofing**: Create a user document with an email that doesn't match `auth.token.email`.
11. **Orphaned Writes**: Create a patient profile without a corresponding core user document.
12. **Blanket Read**: Fetch all users via `getDocs(collection(db, 'users'))` without a filter.

## Test Runner (Mock Logic)
Existing rules in `firestore.rules` will be validated against these cases.
