# ScrollTableWithFrozenColumns

A React-based, dynamic table component that allows smooth scrolling with frozen
columns. This component is designed to handle large datasets efficiently,
providing a flexible and customizable solution for data display requirements.

![ScrollTableWithFrozenColumns](./path/to/screenshot.png)

<!-- Optional: Add a screenshot here for better visual representation -->

---

## Table of Contents

-   [Installation](#installation)
-   [Setup](#setup)
-   [Overview](#overview)
-   [Architecture](#architecture)
-   [Technologies Used](#technologies-used)
-   [Key Features](#key-features)
-   [Usage](#usage)
-   [Contributing](#contributing)
-   [License](#license)

---

## Installation

To get started with this project, follow these steps:

1. **Clone the repository**:

    ```bash
    git clone https://github.com/kritipare/ScrollTableWithFrozenColumns.git
    cd ScrollTableWithFrozenColumns
    ```

2. **Install dependencies**: Ensure you have [Node.js](https://nodejs.org/) and
   [npm](https://www.npmjs.com/) installed.

    ```bash
    npm install
    ```

3. **Run the application**: To start the development server, run:
    ```bash
    npm start
    ```
    This command launches the app at `http://localhost:3000` in development
    mode.

---

## Overview

The **ScrollTableWithFrozenColumns** is a React component that offers a
performant, scrollable table with support for frozen (fixed) columns. It is
particularly useful in scenarios where large datasets need to be displayed,
allowing users to scroll horizontally and vertically while maintaining
visibility for critical columns on the left side of the table.

---

## Architecture

The application follows a component-based architecture, leveraging React's
powerful rendering capabilities to create a modular, reusable table component.
Key architectural highlights include:

1. **Component Structure**:

    - A main table component that wraps rows and cells with optimized rendering
      for frozen columns.
    - Child components handle individual cells, rows, and scrolling behavior.

2. **State Management**:

    - React’s built-in state and hooks are utilized to manage table data, scroll
      positions, and user interactions.

3. **Styling**:

    - CSS-in-JS libraries such as Styled Components are used to manage
      component-specific styles, while global styles are handled with standard
      CSS.

4. **Performance Optimization**:
    - The app optimizes rendering with `React.memo`, `useCallback` and other
      memoization techniques, ensuring smooth scrolling and fast data handling.

---

## Technologies Used

-   **React**: For building user interface components.
-   **TypeScript** : Type safety and better tooling support.
-   **ESLint** and **Prettier**: For code quality and consistent formatting.
-   **API** : NodeJS server deployed on render for fetching data.

---

## Key Features

-   **Frozen Columns**: Essential columns remain visible as you scroll
    horizontally.
-   **Smooth Scrolling**: Optimized scrolling behavior for large datasets.
-   **Responsive Design**: Adapts to various screen sizes for a better user
    experience.
-   **Customizable**: Configurable column freezing, styling, and row heights.
-   **Performance Optimizations**: Designed to handle extensive data without
    compromising on performance.
-   **Accessibility**: Make sure the table is accessible, including proper ARIA
    roles for table elements and keyboard navigation.

---

## Usage

To integrate the ScrollTableWithFrozenColumns component into your project:

1. Import the component:

2. Pass in the required data and configurations as props:
    ```jsx
    <FrozenColumnsTable
        data={filteredData}
        frozenColumns={FROZEN_COLUMNS}
        sortConfig={sortConfig}
        handleSort={handleSort}
    />
    ```

---
