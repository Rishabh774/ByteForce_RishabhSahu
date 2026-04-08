# Contributing Guide

## Code Style

### JavaScript/React
- Use ES6+ features
- Use functional components
- Follow Airbnb style guide
- Use meaningful variable names

### CSS
- Use Tailwind classes
- Mobile-first approach
- Consistent spacing
- Semantic class names

## Git Workflow

1. **Create a branch**
```bash
git checkout -b feature/your-feature-name
```

2. **Make changes and commit**
```bash
git add .
git commit -m "feat: add new feature"
```

3. **Push and create PR**
```bash
git push origin feature/your-feature-name
```

## Commit Message Format

```
<type>: <subject>

<body>

<footer>
```

**Types:**
- feat: new feature
- fix: bug fix
- docs: documentation
- style: formatting
- refactor: code refactoring
- test: tests
- ci: CI/CD

**Example:**
```
feat: add QR code scanning

Add QR code scanner component for event check-in
- Integrated QRCode reader library
- Added verification endpoint
- Updated event controller

Closes #123
```

## Code Review Checklist

- [ ] Code follows style guide
- [ ] All tests pass
- [ ] No console errors
- [ ] Comments added where needed
- [ ] Commit messages are clear
- [ ] No hardcoded values
- [ ] Proper error handling
- [ ] CORS and security considered

## Reporting Issues

Include:
- Description of the issue
- Steps to reproduce
- Expected behavior
- Actual behavior
- System information
- Screenshots if applicable
