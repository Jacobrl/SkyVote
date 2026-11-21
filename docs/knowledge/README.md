# SkyVote knowledge base

Short, sourced facts about astronomy that the site's text, and a future
chatbot, can draw from. A chatbot can search these cards and quote the
sources behind each answer.

## Files

- `sources.md`: every website used for SkyVote, with what was used and
  what was left out.
- `moon-phases.md`: fact cards about the Moon's phases.

## Rules for every card

1. **Our own words.** Never paste text from a source. Summarize the fact
   in plain language a high school student can follow.
2. **Every card cites sources** by their ID from `sources.md`.
3. **Astronomy, not astrology.** Astrology content is never added.
4. **Flag doubt.** If sources disagree, or only one source supports a
   fact, say so in the card's `Note` line.
5. **Every website used for SkyVote goes in `sources.md`**, including
   sites used for page content, dates or tooltips.

## Card format

Each card is one `##` section, so it can be split into one chunk for
search. Keep each card to one idea.

```markdown
## <ID>: <Short title>

<The fact, in our own words. One to four sentences.>

- Sources: <source-id>, <source-id>
- Note: <optional: disagreements, single source, date-specific>
```

## Adding a new source

1. Read the page.
2. Add it to `sources.md` with an ID, title, publisher, URL, date read,
   what was used and what was left out.
3. Add new cards, or add the source ID to existing cards it supports.
