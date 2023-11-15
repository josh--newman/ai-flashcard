# AI Flashcard System

A toolset that streamlines immersion based language learning.

- Flashcard app akin to [Wanikani](https://www.wanikani.com/) that uses an SRS based approach to reviewing cards
- Browser extension akin to Migaku that can parse subtitles and record audio and take screenshots (to be built)
- AI powered translation and explanations of grammar/vocabularly

## Why?

- Anki has a bad UX
- Dictionary translations don't properly capture the intent or context of the sentences
  - AI is much more powerful at describing natural language
- AI can be used to describe in simple terms, in context, in either target or source language

## Tech stack

- React
- Emotion CSS
- Next.js
  - Utilises the API routes feature for server side functionality
- Prisma
  - Database ORM layer
- Supabase
  - Hosts the Postgres database
- OpenAI
  - For card creation

## Quick links

- [Production deployment](https://ai-flashcard-five.vercel.app/)
