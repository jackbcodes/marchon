# Marchon Take Home App

## Overview
This project is a take-home assignment built using React Native and Expo. The app uses a Supabase PostgreSQL database to manage workout-related information, with a UI allowing users to view, reset, and interact with workout data.

## Prerequisites

Before getting started, ensure the following are installed:

- [Node.js v20.17.0](https://nodejs.org/en/download/package-manager)
- [pnpm v9.9.0](https://pnpm.io/installation#using-corepack)

## Get started

1. Set up env vars

   ```bash
   cp .env.example .env
   ```

2. Install dependencies

   ```bash
   pnpm install
   ```

3. Start the app

   ```bash
    pnpm start
   ```

Upon successful startup, you'll have the option to open the app in the following environments:

- [Development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go)


## Backend

The backend is powered by [Supabase](https://supabase.com/), which handles the storage of workout-related data in a PostgreSQL database.

Key details:
- Data seeding: The database is seeded with workout data from [./constants/seed.ts](./constants/seed.ts).
- Reset functionality: During development, a "Reset data" button is available on the home screen. This feature allows easy data reset for testing purposes. In a production environment, user-driven data management (such as deletion) would be implemented.
- Authentication: Currently, authentication is not implemented, meaning all users share the same data. This was excluded due to time constraints but would be a required in a production-ready version.

### Performance Optimizations
While functional, the current implementation lacks certain performance optimizations, such as:

- Caching: Using tools like react-query to minimize redundant fetches and cache results.
- Offline support: Leveraging a database such as WatermelonDB to enable offline-first functionality.
- Selective refetching: Currently, all workouts are refetched upon any change, which could be optimized to reduce unnecessary network calls.
