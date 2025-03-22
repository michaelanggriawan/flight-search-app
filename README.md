# Flight Search App

## Overview

This project is a modern **Flight Search Web App** built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**. Users can search for flight availability by specifying:

- **Origin airport**
- **Destination airport**
- **Cabin class** (Economy, Premium, Business, First, All Cabins)
- **Date range**

## Features Implemented

- ✅ Live airport search with auto-suggestion (supports searching by name, code, city, and country)
- ✅ Geolocation support: Preselects **nearest airport** as default origin
- ✅ Sticky and responsive search form
- ✅ Date range picker for flexible travel dates
- ✅ Cabin class dropdown with default "All Cabins"
- ✅ Loading state when fetching flights
- ✅ Error state handling (e.g., no flights found, network issues)
- ✅ Dynamic flight cards UI with grid layout
- ✅ Real-time filtering with accurate results based on selected criteria

---

## Key Code Changes

### 1. Live Airport Search (`AirportSelect.tsx`)
- Custom input with dropdown using `useAirportSearch` hook.
- Enhanced to support searching by:
  - Airport name
  - IATA code
  - City
  - **Country** (via country ISO mapping and merged JSON data)

### 2. Syncing Input with External Value
- When `SearchForm` sets default values (e.g., nearest airport), `AirportSelect` now updates the `inputValue` via `useEffect`.

```tsx
useEffect(() => {
  if (!selectionMade) {
    setInputValue(value);
  }
}, [value]);
```

### 3. Nearest Airport Detection
- Utility added to compute the closest airport using Haversine formula.
- Automatically sets default **origin** based on user's geolocation.

```ts
const nearest = getNearestAirport(latitude, longitude);
setOrigin(nearest.code);
```

### 4. Updated Airport Dataset
- Used [airports.json](https://raw.githubusercontent.com/jbrooksuk/JSON-Airports/master/airports.json) as base.
- Augmented data by adding full **country names** based on ISO codes.
- Stored locally and imported as JSON for performance and flexibility.

### 5. SearchForm Props
- `onSearch` now receives a structured object:

```ts
{
  origin: string;
  destination: string;
  cabin: string;
  startDate: string;
  endDate: string;
}
```

### 6. Error & Loading States
- Loading spinner shown while fetching
- Displays error messages on:
  - API errors
  - No flights found
  - Invalid or empty input

---

## 🗂 Directory Structure (Key Files)

```
src/
  components/
    AirportSelect.tsx
    SearchForm.tsx
    FlightCard.tsx
    Loader.tsx
  hooks/
    useAirportSearch.ts
  lib/
    getNearestAirport.ts
    countryMap.ts
  pages/
    api/
      flights/route.ts
      airports/route.ts
  public/
    airports.json
```

---

## 📌 Setup Notes

- Ensure `airports.json` is available locally under `public/airports.json`
- Geolocation API will ask for browser permission
- Tested on modern Chromium-based browsers

---

## ✅ Final Remarks

This implementation prioritizes:

- Real-world UX (responsive, auto-detection, search refinement)
- Scalability (custom hooks, modular components)
- Type safety (Zod schemas, TypeScript models)
- Clean UI/UX (Tailwind CSS, accessible form handling)

---

Feel free to fork and expand it with pagination, price filters, or real booking APIs!

