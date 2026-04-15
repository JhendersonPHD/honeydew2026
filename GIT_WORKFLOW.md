# HoneyDew2026 Git Workflow

## Branch Strategy

- `main` - Production-ready code
- `develop` - Integration branch
- `feature/*` - New features
- `fix/*` - Bug fixes
- `docs/*` - Documentation updates

## Commits

Use conventional commits:

```
feat: add new product feature
fix: resolve cart calculation bug
docs: update API documentation
refactor: simplify checkout flow
test: add product API tests
```

## Workflow

```bash
# Create feature branch
git checkout -b feature/my-feature

# Make changes and commit
git add .
git commit -m "feat: description"

# Push to remote
git push origin feature/my-feature

# Create pull request
gh pr create --base main --head feature/my-feature
```

## Pre-commit Checks

Before committing:

```bash
# Run pre-commit manually
./scripts/pre-commit

# Skip pre-commit (not recommended)
git commit --no-verify
```

## Tags

```bash
# Tag a release
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0
```
