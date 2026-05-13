# Security Specification: PathFinder AI

## 1. Data Invariants
- Users can only read and write their own profile (`/users/{userId}`).
- Career paths, institutions, and scholarships are read-only for students; restricted write for admins.
- Roadmaps can only be read/written by the owner.
- `userId` in roadmaps must match the authenticated user.
- All IDs must be strictly validated.

## 2. The "Dirty Dozen" Payloads (Denial Tests)
1. **Identity Spoofing**: Attempt to create a user profile with a different UID.
2. **PathVariable Poisoning**: Attempt to write to `/users/INVALID_ID_WITH_JUNK_CHARS`.
3. **Privilege Escalation**: Attempt to mark an institution as `isVerified: true` as a student.
4. **State Shortcutting**: Attempt to update a roadmap status from `active` to `completed` without finishing steps.
5. **PII Leak**: Attempt to read another user's profile.
6. **Shadow Update**: Attempt to add `isAdmin: true` to a user profile.
7. **Resource Poisoning**: Attempt to inject 1MB of text into the `name` field.
8. **Immutability Breach**: Attempt to change `createdAt` on a roadmap.
9. **Relational Sync Break**: Attempt to create a roadmap for a non-existent `careerId`.
10. **Query Scraping**: Attempt to list all users without a `where` clause matching UID.
11. **Future-Proof Tampering**: Attempt to change the `futureProof` flag on a career path as a student.
12. **Deadline Forging**: Attempt to update a scholarship deadline.

## 3. Test Runner (Draft)
A `firestore.rules.test.ts` will be implemented to verify these denials.
