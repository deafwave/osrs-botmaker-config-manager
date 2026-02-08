# @deafwave/osrs-botmaker-config-manager

## Install

```bash
pnpm add @deafwave/osrs-botmaker-config-manager
```

## Usage

```ts
import { createConfigScope, group, profile } from '@deafwave/osrs-botmaker-config-manager'

group.setString('builder', 'mode', 'safe')
const mode = group.getString('builder', 'mode', 'fallback')

profile.setBoolean('builder', 'enabled', true)
const enabled = profile.getBoolean('builder', 'enabled', false)

const scope = createConfigScope({ group: 'builder.scope', scope: 'group' })
scope.setInt('runs', 7)
```
