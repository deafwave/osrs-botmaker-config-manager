# @deafwave/osrs-botmaker-config-manager

## Install

```bash
pnpm add @deafwave/osrs-botmaker-config-manager
```

## Usage

```ts
group.set('builder', 'mode', 'safe')
const mode = group.getString('builder', 'mode', 'fallback')

profile.set('builder', 'enabled', true)
profile.set('builder', 'bankitems', [1171, 1])
profile.set('builder', 'mode', 'safe')
const enabled = profile.getBoolean('builder', 'enabled', false)

const scope = createConfigScope({ group: 'builder.scope', scope: 'group' })
scope.set('runs', 7)
scope.set('drops', [526, 2])
scope.set('meta', { mode: 'safe' })

const storage: RsProfileStorage = { group: 'builder', sync: true }
setStoredString(storage, 'mode', 'safe')
const storedMode = getStoredString(storage, 'mode', 'fallback')
```

## Generic Setter Values

`group.set`, `profile.set`, and `scope.set` accept any JSON-serializable value.

Accepted values include:

- strings
- numbers
- booleans
- `null`
- arrays
- plain objects

Rejected values throw `TypeError("Config value must be JSON-serializable.")`:

- `undefined`
- functions
- symbols
- bigint values
- circular / non-serializable objects

## Sync Behavior

Writes do not call `configManager.sendConfig()` unless sync is enabled.
- Manual sync: call `sendConfig()` to force sending config.

