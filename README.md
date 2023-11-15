# AI Flashcard System

This project is an attempt at making a simple, easy to use flashcard app that can be used to study Japanese. It follows the [Wanikani algorithm](https://knowledge.wanikani.com/wanikani/srs-stages/) for spaced repetition.

Card creation is enhanced with OpenAI to create contextual, relevant, and helpful descriptions for the card reviewer.

### Tech stack

- React
- Next.js
  - Utilises the API routes feature for server side functionality
- Prisma
  - Database ORM layer
- Supabase
  - Hosts the Postgres database
- OpenAI
  - For card creation
