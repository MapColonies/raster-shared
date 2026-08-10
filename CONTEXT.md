# Context

Glossary for the Raster domain as this package models it. Terms only — no implementation
detail, no specification. If a term here disagrees with the code, one of them is wrong.

## Deletion

**Layer deletion** — Removing a layer from the system entirely: its catalog record, its
serving configuration, its polygon parts, and its stored resources. Terminal; the layer
ceases to exist. Job type `Delete_Layer`.

**Cache deletion** — Invalidating entries in the Redis tile cache so that stale tiles stop
being served. The layer itself survives. Distinct from layer deletion in both intent and
lifetime: cache deletion is routine maintenance that follows a change to a live layer, not
the retirement of one.

**Swap cache invalidation** — Cache deletion following a layer _swap_, where the layer's
tiles were replaced wholesale. Every cached entry for the layer is stale, so the whole key
prefix is removed. Job type `Swap_Delete_Cache`.

**Update cache invalidation** — Cache deletion following an _in-place update_, where only
part of the layer changed. Only the affected tiles are stale, so invalidation is scoped to
a set of tile ranges. Job type `Update_Delete_Cache`.

**Artifacts deletion** — Removing a layer's non-tile stored resources (GPKG files,
metadata files, and similar) from their storage provider. Job type `Delete_Layer`, task
type `artifacts-deletion`.

**Tiles deletion** — Removing tile _files_ from a path-based store (S3 or FS), addressed by
a base path, tile ranges, and a file extension. Not to be confused with cache deletion,
which removes cache _entries_ from a key-value store and has no paths or file extensions.

## Storage

**Source type** — Where raster data originates: `S3`, `GPKG`, or `FS`.

**Storage provider** — Where a deletion operation acts: `S3`, `FS`, or `REDIS`. Deliberately
a separate term from source type: Redis is a deletion target but never a data source, and
GPKG is a data source but never a deletion target. The two sets overlap without being equal.

**Prefix** — The locator for a set of entries in a key-value store, as a path is the locator
for a file. For the Redis tile cache, a prefix identifies every cached tile belonging to one
layer in one grid.

## Jobs and tasks

**Job type** — What work was requested and why, chosen when the job is created. It reflects
the upstream event (a swap happened, an update happened, a layer was retired).

**Task type** — What kind of work a single unit performs.

A task's parameter shape is determined by the **pair** of job type and task type, not by the
task type alone. The same task type carries different parameters under different job types —
this is deliberate, and it is why task types are not sufficient on their own to identify a
unit of work.
