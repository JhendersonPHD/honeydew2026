# Security Policy

## Reporting Security Issues

If you discover a security vulnerability, please report it responsibly:

1. **DO NOT** create a public GitHub issue for security vulnerabilities
2. Email the security team directly (or contact via internal channels)
3. Include a detailed description of the vulnerability
4. Provide steps to reproduce the issue
5. If possible, suggest a fix

We will respond within 48 hours and work to address any confirmed vulnerabilities.

---

## Security Best Practices

### Authentication

- All API endpoints (except public product/farm/category listings) require authentication
- JWT tokens are used for session management
- Tokens expire after 24 hours (configurable via environment)
- Refresh tokens are not implemented (re-authentication required)

### API Security

- CORS is enabled for allowed origins only
- Rate limiting is not yet implemented (planned for v2)
- Input validation is performed on all endpoints
- SQL injection protection via SQLAlchemy ORM

### Data Protection

- Passwords are hashed using bcrypt
- Sensitive environment variables are required for production
- Database is stored locally (not accessible via network)

---

## Environment Variables

### Required for Production

```bash
SECRET_KEY=<random-secret-key>  # JWT signing key
DATABASE_URL=<database-url>     # Database connection
CORS_ORIGINS=<allowed-origins>   # Comma-separated allowed origins
```

### Security Recommendations

- Use strong, randomly generated SECRET_KEY values
- Never commit .env files to version control
- Rotate SECRET_KEY periodically
- Use HTTPS in production (not implemented yet - planned for v2)

---

## Known Limitations

### Current Version (v1.0)

1. **No HTTPS** - HTTP only, HTTPS planned for v2
2. **No rate limiting** - API is vulnerable to brute force attacks
3. **No 2FA** - Single factor authentication only
4. **No refresh tokens** - Users must re-authenticate after token expiry
5. **Local database only** - No cloud database backup

---

## Security Headers

The following security headers are implemented:

- `Access-Control-Allow-Origin: *` (CORS)
- `Cache-Control: no-cache`
- Content Security Policy (not yet implemented)

---

## Updates

This security policy was last updated: 2026-04-13

For questions about security, refer to [SUPPORT.md](SUPPORT.md).