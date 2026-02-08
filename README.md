# @deafwave/osrs-botmaker-config-manager

Config manager helpers extracted from `@deafwave/osrs-botmaker-api`.

## Install

```bash
pnpm add @deafwave/osrs-botmaker-config-manager
```

## Direct Import Usage

```ts
import { createConfigScope, group, profile } from '@deafwave/osrs-botmaker-config-manager'
```

## Global Usage (Initialized Upstream)

This package can also register globals when it is imported at runtime (for example, by `@deafwave/osrs-botmaker-api`):

```ts
group.setString('builder', 'mode', 'safe')
profile.getString('builder', 'mode', 'fallback')
```

Globals exposed by this package:

- `group`
- `profile`
- `createConfigScope`

Installing a package alone does not execute runtime initialization code. Globals are available only after some runtime import has loaded this package.

The runtime still depends on Botmaker-provided globals:

- `configManager`
- `bot`

Type bindings come from `@deafwave/osrs-botmaker-types`.
