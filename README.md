# Vibe Coding Security Lab

This lab demonstrates the security issues that can arise when **vibe coding** a web application. Each commit introduces new functionality while documenting the security implications, potential vulnerabilities, and recommended mitigations.

---

# First Commit

The first commit contains the initial implementation of **SharedDashboard**, a browser-based dashboard that stores personal lists using the browser's **LocalStorage**.

The application is entirely client-side and does not include:

- A backend
- Authentication
- External dependencies

Because of its simple architecture, there are relatively few exploitable vulnerabilities in this initial version. However, one notable security concern exists.

---

## Finding 1 – LocalStorage Is Trusted

**Severity:** Medium

Application data is stored in the browser's **LocalStorage**.

Any user with access to the browser can modify stored values using the browser's Developer Tools.

### Example

```javascript
localStorage.setItem(...)
```

### Impact

An attacker can:

- Modify existing lists
- Delete stored data
- Corrupt the application's state

Since the application has no backend, these attacks are limited to the current browser and do not affect other users.

### Recommendation

LocalStorage should be treated as **untrusted input**.

Before using stored data, the application should:

- Validate the data structure
- Handle malformed or unexpected values gracefully
- Detect corrupted storage and notify the user when appropriate

---

## Lessons Learned

Even simple client-side applications have security considerations. While LocalStorage is convenient for storing user data, it should never be assumed to contain valid or trustworthy information. Treating browser storage as untrusted input is a foundational secure coding practice and helps prevent unexpected application behavior.
