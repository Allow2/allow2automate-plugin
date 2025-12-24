# Contributing to {{PLUGIN_NAME}}

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to this plugin.

## Code of Conduct

This project adheres to a code of conduct. By participating, you are expected to uphold this code. Please be respectful and constructive in all interactions.

## How to Contribute

### Reporting Bugs

Before creating a bug report:
- Check the existing issues to avoid duplicates
- Collect information about the bug (error messages, steps to reproduce, etc.)

When creating a bug report, include:
- A clear, descriptive title
- Detailed steps to reproduce the issue
- Expected vs actual behavior
- Environment information (Node.js version, OS, etc.)
- Any relevant logs or screenshots

### Suggesting Features

Feature requests are welcome! Please:
- Check if the feature has already been suggested
- Provide a clear description of the feature
- Explain the use case and benefits
- Consider if it fits the plugin's scope

### Pull Requests

1. **Fork the repository** and create your branch from `main`

2. **Set up development environment**:
   ```bash
   npm install
   cp .env.example .env
   # Configure your .env file
   ```

3. **Make your changes**:
   - Follow the code style (see below)
   - Add tests for new functionality
   - Update documentation as needed
   - Ensure all tests pass

4. **Test your changes**:
   ```bash
   npm run lint
   npm run test
   npm run test:coverage
   ```

5. **Commit your changes**:
   - Use clear, descriptive commit messages
   - Follow conventional commits format:
     ```
     feat: add new feature
     fix: resolve bug in x
     docs: update readme
     test: add tests for y
     refactor: improve z
     ```

6. **Push and create pull request**:
   - Provide a clear PR description
   - Reference any related issues
   - Wait for review and address feedback

## Development Guidelines

### Code Style

- Use ESLint configuration provided
- Follow existing code patterns
- Write self-documenting code
- Add comments for complex logic
- Keep functions small and focused

### Testing

- Write tests for all new features
- Maintain >80% code coverage
- Test edge cases and error conditions
- Use descriptive test names

Example:
```javascript
describe('Feature Name', () => {
  test('should handle specific case correctly', () => {
    // Arrange
    const input = 'test';

    // Act
    const result = functionToTest(input);

    // Assert
    expect(result).toBe('expected');
  });
});
```

### Documentation

Update documentation when:
- Adding new features
- Changing configuration options
- Modifying API interfaces
- Fixing significant bugs

Documentation to update:
- README.md - User-facing documentation
- API.md - API reference
- Code comments - JSDoc format
- CHANGELOG.md - Version history

### Commit Messages

Follow conventional commits:
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `test:` Test additions/changes
- `refactor:` Code refactoring
- `perf:` Performance improvements
- `chore:` Maintenance tasks

Example:
```
feat: add support for batch operations

- Implement batch API wrapper
- Add tests for batch functionality
- Update documentation

Closes #123
```

### Branch Naming

Use descriptive branch names:
- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation
- `refactor/description` - Refactoring

## Project Structure

```
{{PLUGIN_NAME}}/
├── index.js              # Main plugin file
├── src/
│   ├── config-ui.js     # Configuration UI component
│   └── api-wrapper.js   # API client wrapper
├── test/
│   └── index.test.js    # Test files
├── docs/
│   └── API.md           # API documentation
├── .github/
│   └── workflows/       # CI/CD workflows
├── package.json         # Dependencies and scripts
├── README.md            # User documentation
├── CONTRIBUTING.md      # This file
└── CHANGELOG.md         # Version history
```

## Testing Checklist

Before submitting a PR, ensure:

- [ ] All tests pass (`npm test`)
- [ ] Code coverage is maintained (`npm run test:coverage`)
- [ ] Linter passes (`npm run lint`)
- [ ] Code is properly formatted
- [ ] Documentation is updated
- [ ] Commit messages follow conventions
- [ ] No sensitive data in code/commits
- [ ] Environment variables are in `.env.example`

## Release Process

1. Update version in `package.json`
2. Update `CHANGELOG.md` with changes
3. Create git tag: `git tag v1.x.x`
4. Push tag: `git push origin v1.x.x`
5. Create GitHub release with changelog
6. Publish to npm: `npm publish`

## Getting Help

If you need help:
- Check existing documentation
- Search closed issues
- Ask in GitHub Discussions
- Email maintainers

## Recognition

Contributors will be:
- Listed in the README.md
- Mentioned in release notes
- Credited in the project

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to {{PLUGIN_NAME}}!
