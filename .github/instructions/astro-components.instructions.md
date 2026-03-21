---
description: Use when creating or editing Astro components in src/components/ - follow component patterns with TypeScript props and scoped styles.
applyTo: "src/components/**/*.astro"
---

# Astro Component Guidelines

When editing files in the `src/components/` directory, follow these patterns:

## Structure

1. **Props Interface**: Define all props with TypeScript interface
2. **Destructure Props**: Extract props in frontmatter
3. **Scoped Styles**: Use `<style scoped>` for component-specific styling
4. **Semantic HTML**: Use appropriate HTML elements

## Template

```astro
---
interface Props {
  title: string;
  subtitle?: string;
  variant?: 'primary' | 'secondary';
  onSubmit?: (data: FormData) => Promise<void>;
}

const { title, subtitle, variant = 'primary', onSubmit } = Astro.props;

// Component logic here
const isLoading = false;
const errorMessage = '';
---

<article class={`component variant-${variant}`}>
  <header>
    <h2>{title}</h2>
    {subtitle && <p>{subtitle}</p>}
  </header>

  <form method="POST">
    <!-- Form content -->
  </form>
</article>

<style scoped>
  article {
    padding: 1rem;
    border-radius: 0.5rem;
  }

  article.variant-primary {
    background: #667eea;
    color: white;
  }

  article.variant-secondary {
    background: #f5f5f5;
    color: #333;
  }

  header h2 {
    margin-bottom: 0.5rem;
  }
</style>
```

## Best Practices

- Use `interface Props` for all components
- Mark optional props with `?`
- Provide sensible defaults (e.g., `variant = 'primary'`)
- Use semantic HTML tags (article, section, nav, etc.)
- Scope all styles to prevent conflicts
- Keep components focused on single responsibility
- Use `Astro.props` when accessing passed data
- Add JSDoc comments for complex logic
