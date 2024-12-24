# Agenda360

A modern task management application built with Angular 17, featuring advanced categorization, real-time statistics, and smart notifications.

## Features

- Task Management (CRUD operations)
- Custom Categories
- Real-time Search
- Priority Levels
- Due Date Tracking
- Statistical Dashboard
- Responsive Design
- Local Data Persistence
- Real-time Notifications

## Technical Stack

- Angular 17
- SCSS
- Bootstrap/Tailwind CSS
- NgxCharts/Chart.js (for statistics)
- LocalStorage for data persistence

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI (v17)

## Installation

```bash
git clone https://github.com/bachiriy/Agenda360.git
cd taskmaster-pro
npm install
ng serve
```

Visit `http://localhost:4200` in your browser.

## Core Functionality

- **Task Management**
  - Create, update, delete tasks
  - Set priorities (High, Medium, Low)
  - Track completion status
  - Set due dates with time

- **Categories**
  - Custom category creation
  - Category-based task organization
  - Duplicate prevention

- **Search & Filter**
  - Real-time search functionality
  - Filter by title or description

- **Statistics Dashboard**
  - Task completion percentages
  - Overdue task tracking
  - Interactive charts

## Project Structure

```
src/
├── app/
│   ├── components/
│   ├── services/
│   ├── models/
│   ├── guards/
│   └── shared/
├── assets/
└── styles/
```

## Validation Rules

- No past due dates allowed
- Title length: 3-50 characters
- Description length: 0-200 characters
- Unique category names required
- Required fields: title, due date, priority

## Development

1. Clone repository
2. Install dependencies
3. Create new branch for features
4. Submit PR for review

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Contributing

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Submit pull request
