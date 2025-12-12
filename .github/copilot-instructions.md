# What is Mini-games?

- Mini Games Platform: A React-based modular gaming dashboard that hosts multiple interactive mini-games accessible via a persistent Sidebar/Navbar navigation. The platform currently features two core games: a physics-based "Wheel of Fortune" where users spin to win random prizes based on probability, and a reflex-based "Time Attack" challenge where the user attempts to stop a high-precision chronometer exactly at the 10.00-second mark. The project aims to be scalable, allowing new games to be added as independent modules without affecting the core architecture.

## Form Validations

- Use always *yup* for form validations.

## Typing 

All type definitions in the project are located under the */src/@types* folder.

- Important Rules:

- We do NOT use import syntax for type definitions
- Type files are named with the .d.ts extension: [FILE_NAME].d.ts
- Types are globally available without explicit imports
- Example structure:

```
resources/js/landing/@types/
    ├── api.d.ts
    ├── oracle.d.ts
    ├── contract.d.ts
    └── user.d.ts

```

## React Query Usage

We use React Query for all API requests.

*Mandatory Requirements:*

- Always destructure data, isLoading, and isError from query results
- Handle all three states in your components
- Never use only data without handling loading and error states


const { data, isLoading, isError } = useQuery({
  queryKey: ['oracleData'],
  queryFn: fetchOracleData
});

if (isLoading) return <LoadingSpinner />;
if (isError) return <ErrorMessage />;
return <DataDisplay data={data} />;


## Component Structure

- Each section must be created as a separate component and imported into the relevant file.

- Use this path for components: */src/components*

- Break down pages into logical sections

- Each section = separate component file

- Import sections into the main page/parent component

- Promote reusability and maintainability

### Example Structure:

```
import StatsSection from './components/StatsSection';
import OracleListSection from './components/OracleListSection';
import ActivitySection from './components/ActivitySection';

export default function Dashboard() {
  return (
    <div>
      <StatsSection />
      <OracleListSection />
      <ActivitySection />
    </div>
  );
}
```


- *CRITICAL:* NEVER define components inside other components

- ❌ NEVER DO THIS:

```
const A = () => {
  // DON'T define component B inside component A
  const B = () => {
    return <div>Inner Component</div>;
  };
  
  return <div><B /></div>;
};
```

- ✅ DO THIS INSTEAD:

```
// components/B.tsx
export default function B() {
  return <div>Inner Component</div>;
}

// components/A.tsx
import B from './B';

export default function A() {
  return <div><B /></div>;
}
```


### Why This Matters:

- ❌ Nested components recreate on every render (performance issue)
- ❌ Breaks React DevTools
- ❌ Lost component state on re-renders
- ✅ Each component in its own file maintains proper lifecycle
- ✅ Better performance and debugging
- ✅ Better code organization
- ✅ Easier testing and maintenance
- ✅ Component reusability
- ✅ Clearer separation of concerns


## Prop Definitions

- *NEVER* destructure object properties when passing props. Pass the entire object instead.

- ❌ DON'T DO THIS:

```
const object = {
  a: 'value1',
  b: 'value2',
  c: 'value3',
  d: 'value4'
};

<Component a={object.a} b={object.b} c={object.c} d={object.d} />
```


- ✅ DO THIS INSTEAD:

```
const object = {
  a: 'value1',
  b: 'value2',
  c: 'value3',
  d: 'value4'
};

<Component data={object} />
```


### Benefits

Benefits:

- Cleaner code
- Less repetition
- Easier refactoring
- Better prop management

## Conditional UI States

- Do not use inline JSX for rendering conditional UI states such as loading, error, or pending.
- Always use a clean control flow pattern:

- ❌ Avoid

```
{isError && <ErrorComponent />}
{isLoading && <LoadingComponent />}
{!isLoading && !isError && <Content />}
```

- ✅ Prefer

```
if (isError) {
  return <ErrorComponent />;
}

if (isLoading) {
  return <LoadingComponent />;
}

return <Content />;
```

## Conditons & Magic Strings/Numbers

- Never use magic strings or numbers in the codebase. Always replace them with well-named constants or enums. This improves readability, prevents bugs, and makes refactoring safer. Use examples like below:


- ✅ Prefer
```
const USER_ROLES = {
  ADMIN: "admin",
  EDITOR: "editor",
  VIEWER: "viewer",
};

export default function Dashboard({ currentUser }) {
  if (currentUser.role === USER_ROLES.ADMIN) {
    return <AdminPanel />;
  }

  if (currentUser.role === USER_ROLES.EDITOR) {
    return <EditorPanel />;
  }

  return <ViewerPanel />;
}
```

```
const ORDER_STATUS = {
  PENDING: 0,
  PROCESSING: 1,
  SHIPPED: 2,
  DELIVERED: 3,
  CANCELLED: 4,
}

export default function OrderCard({ order }) {
  if (order.status === ORDER_STATUS.SHIPPED) {
    return <span>Your package is on the way 🚚</span>;
  }

  if (order.status === ORDER_STATUS.CANCELLED) {
    return <span>This order was cancelled ❌</span>;
  }

  return <span>Status: {order.status}</span>;
}
```

- ❌ Avoid

```
export default function OrderCard({ order }) {
  if (order.status === 2) {
    return <span>Your package is on the way 🚚</span>;
  }

  if (order.status === 4) {
    return <span>This order was cancelled ❌</span>;
  }

  return <span>Status: {order.status}</span>;
}
```


```
export default function Dashboard({ currentUser }) {
  if (currentUser.role === "admin") {
    return <AdminPanel />;
  }

  if (currentUser.role === "editor") {
    return <EditorPanel />;
  }

  return <ViewerPanel />;
}
```

---
- *THIS COMMAND IS NOT FOR CHANGE/OR UPDATE ANYTHING DO NOT APPLY THESE INSTRUCTIONS FOR PREVIOUS CHANGES ONLY APPLY FOR NEXTS*


## File Naming Conventions

All files in the project must follow **kebab-case** naming convention.

### Rules:

- Use lowercase letters only
- Separate words with hyphens (-)
- No spaces, underscores, or camelCase
- Be descriptive but concise

### Examples:

✅ **Correct:**
```
user-profile.tsx
order-history.tsx
shipment-tracking-card.tsx
api-client.ts
use-fetch-orders.ts
button-primary.tsx
form-validation-schema.ts
```

### Why kebab-case?

- ✅ URL-friendly
- ✅ Case-insensitive file systems compatible
- ✅ Easy to read
- ✅ Consistent with modern web standards
- ✅ No conflicts with component names (which use PascalCase internally)

### Note:

Component **export names** should still use PascalCase:
```typescript
// File: shipment-form.tsx
export default function ShipmentForm() {
  return ...;
}
```

## Styling

The project uses **shadcn/ui** components and **Tailwind CSS** for all styling needs.

### Rules:

- **NO custom CSS files** - Use Tailwind utility classes only
- **NO inline styles** - Use Tailwind classes instead
- **NO CSS modules** - Tailwind is the single source of styling
- Use **shadcn/ui** components for common UI patterns
- Customize shadcn components using Tailwind classes

- Common components you should use:

- `Button` - For all button variations
- `Card` - For content containers
- `Input`, `Textarea` - For form inputs
- `Select` - For dropdowns
- `Dialog`, `Sheet` - For modals and side panels
- `Table` - For data tables
- `Badge` - For status indicators
- `Alert` - For notifications
- `Tabs` - For tabbed interfaces
- `Form` - For form handling with validation