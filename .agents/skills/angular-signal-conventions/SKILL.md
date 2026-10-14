---
name: angular-signal-conventions
description: Modern Angular state-management conventions — Signals vs RxJS Subject, the effect/linkedSignal/computed/untracked decision, and component/service class member ordering. Use when writing or reviewing an Angular component or service that manages state, especially anything using effect(), input(), or a Subject.
---

# Angular Signal Conventions

## Signals First, Subject Only When Needed

Default to Signals for state. Reach for `Subject`/`BehaviorSubject` only
when a service needs to expose a subscription or an RxJS operator chain
(`debounceTime`, `switchMap`, `combineLatest`, ...) to external consumers.

| Need | Use |
|---|---|
| Local component state | `signal()` |
| Derived, read-only value | `computed()` |
| Writable state seeded from an input/another signal, user-overridable | `linkedSignal()` |
| Drive DOM / third-party libs / I/O from a signal change | `effect()` |
| Async pipeline with real operators (`switchMap`, `debounceTime`, ...) | `Subject`/RxJS, exposed as `x$` |
| Bridge an `Observable` into signal-consuming code | `toSignal()` |

Signals need no manual unsubscribe and integrate natively with `OnPush`
change detection — that's the whole reason to prefer them by default.

## The `effect()` Anti-Pattern: Don't Use It to Sync State

`effect()` is for driving something **outside** the signal system (DOM,
`localStorage`, a third-party widget, `setInterval`). It is not a tool for
keeping one signal in sync with another.

```ts
// ❌ DON'T — sync input to local state via effect + onCleanup
readonly editingUser = signal<UserData>(EMPTY_USER);
constructor() {
  effect((onCleanup) => {
    if (this.visible()) {
      this.editingUser.set(this.originalUser() ?? EMPTY_USER);
    }
    onCleanup(() => this.editingUser.set(EMPTY_USER));
  });
}

// ✅ DO — linkedSignal re-derives automatically when the source changes,
// and still lets the user override the value afterward
readonly editingUser = linkedSignal<UserData>(() => {
  if (!this.visible()) return EMPTY_USER;
  return this.originalUser() ?? EMPTY_USER;
});
```

If a cleanup callback's only job is `signal.set(emptyValue)`, that's the
tell: the effect is being used as a state-sync switch and should be a
`linkedSignal` instead. Reserve `onCleanup` for releasing real external
resources (`clearInterval`, closing a WebSocket, disposing a third-party
instance).

## `untracked()`: Read Without Re-Triggering

Every signal read inside `effect()` becomes a dependency by default. When a
signal only needs to be *read* for its current value — not used as a
trigger — wrap it in `untracked()` so an unrelated change-detection pass
doesn't rerun the effect (and its `onCleanup`) unnecessarily.

```ts
// ✅ react to visible() only; read other inputs without tracking them
effect(() => {
  const isVisible = this.visible();
  untracked(() => {
    if (isVisible) {
      this.refresh(this.rule(), this.lockedContextType());
    }
  });
});
```

Without `untracked`, a parent's change-detection cycle can cause other
input signals to re-notify even when their value is unchanged, rerunning
the effect and firing `onCleanup` — which can silently reset form state a
user was mid-way through editing.

## Class Member Ordering

Build a stable header before the method area, in this order:

**Component / Directive**: constants → `inject()` dependencies →
`input()`/`model()`/`output()` → `viewChild()`/`contentChild()` queries →
state (`signal`, `Subject`, plain fields) → derived state (`computed()`) →
`effect()` → lifecycle → method sections by feature.

**Service**: constants → `inject()` dependencies → state → derived
state/readonly observables → constructor (if needed) → lifecycle → public
API / private helpers.

Rules that matter most in practice:

- Anything the template touches (`protected`/`public` getters, signals,
  handlers) must not be `private`.
- Keep the different forms of one semantic variable together — `subject`,
  `x$`, a getter, and its `signal`/readonly adapter should sit next to each
  other, not scattered by "kind."
- Don't interleave unrelated signals/computed/getters — keep state readable
  as one block, not `signal → getter → signal → computed`.

## Migration: `@Input`/`@Output` → `input()`/`output()`

```ts
// ❌ Decorator-based
export class UserComponent {
  @Input() userId!: number;
  @Output() userSelected = new EventEmitter<UserData>();
}

// ✅ Signal-based
export class UserComponent {
  readonly userId = input.required<number>();
  readonly userSelected = output<UserData>();
}
```

## File Naming

Kebab-case is standard either way. Two acceptable conventions:

- **Type-suffixed** (`user-profile.component.ts`) — makes file purpose
  greppable and IDE-searchable without opening the file. Common in older
  or larger Angular codebases.
- **Suffix-free** (`user-profile.ts`, Angular 21+ default) — less
  boilerplate for a brand-new project with no existing convention to match.

For a new solo project, pick one and apply it consistently — there's no
existing codebase convention to preserve, so either is a reasonable
default.

## Checklist

- [ ] New state defaults to `signal()`; `Subject` only if something external
      needs to subscribe or chain RxJS operators
- [ ] No `effect()` used purely to copy one signal's value into another —
      use `linkedSignal()` instead
- [ ] `effect()` reads that shouldn't re-trigger it are wrapped in `untracked()`
- [ ] Template-facing members (`signal`, getter, handler) are not `private`
- [ ] New `@Input`/`@Output` usage replaced with `input()`/`output()`
