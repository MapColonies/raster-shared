# Raster-Shared

A centralized TypeScript package for the Raster domain, designed to reduce code duplication and improve type safety across Map Colonies services.

📚 [Full Documentation on Confluence](https://mapcolonies.atlassian.net/wiki/spaces/MAPConflicResolution/pages/2454781971/Raster+Shared)

## Package Design

This package serves as a single source of truth for shared resources in the Raster domain, following these key principles:
- **Centralization**: Eliminates code duplication across services
- **Type Safety**: Ensures consistent typing across the entire domain
- **Modular Architecture**: Organized into clear sub-domains
- **Minimal Dependencies**: Reduces external dependencies for better maintainability

## Package Structure

```
raster-shared/
├─ src/
│  ├─ constants/        # Shared constants
│  │  ├─ core/         # Core system constants
│  │  ├─ ingestion/    # Ingestion-related constants
│  │  ├─ export/       # Export-related constants
│  │  └─ serving/      # Serving-related constants
│  ├─ types/           # TypeScript type definitions
│  │  ├─ core/         # Core system types
│  │  ├─ ingestion/    # Ingestion-related types
│  │  ├─ export/       # Export-related types
│  │  └─ serving/      # Serving-related types
│  ├─ zod/             # Zod validation schemas
│  │  ├─ core/         # Core validation schemas
│  │  ├─ export/       # Export-related schemas
│  │  ├─ ingestion/    # Ingestion-related schemas
│  │  └─ serving/      # Serving-related schemas
│  └─ openapi/         # OpenAPI schema definitions
│     ├─ core/         # Core API schemas
│     ├─ ingestion/    # Ingestion API schemas
│     ├─ export/       # Export API schemas
│     └─ serving/      # Serving API schemas
└─ [Configuration files]
```