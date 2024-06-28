import { v4 as uuidV4 } from "uuid";
import { RawNote, Tag } from "./App";

export function initializeLocalStorage() {
  const initialTags: Tag[] = [
    { id: uuidV4(), label: "Work" },
    { id: uuidV4(), label: "Personal" },
    { id: uuidV4(), label: "Urgent" },
  ];

  const initialNotes: RawNote[] = [
    {
      id: uuidV4(),
      title: "Meeting Notes",
      markdown: `

**Date:** 2024-06-27

## Agenda
- Project updates
- Budget review
- Next steps

## Notes
- Project A is on track for Q3 release.
- Budget for Q4 needs approval.
- Action items:
  - [ ] Prepare presentation for next meeting.
  - [ ] Follow up with the finance team.

## Summary
Overall, the meeting was productive and all major points were covered.

## Links
[Project A Documentation](https://example.com/docs/project-a)
`,
      tagIds: [initialTags[0].id],
    },
    {
      id: uuidV4(),
      title: "Personal Journal",
      markdown: `

## June 27, 2024

### Morning
- Went for a run in the park.
- Had a healthy breakfast.

### Afternoon
- Worked on the React project.
- Had a team meeting.

### Evening
- Cooked dinner.
- Watched a movie.

## Thoughts
Today was a good day, felt productive and energized.

## Quotes
> "The only way to do great work is to love what you do." - Steve Jobs
`,
      tagIds: [initialTags[1].id],
    },
    {
      id: uuidV4(),
      title: "Urgent Tasks",
      markdown: `

## To-Do
- [x] Finish the quarterly report.
- [ ] Respond to client emails.
- [ ] Update the project timeline.

## Notes
- The report needs to be reviewed by the manager before submission.
- Client emails should be prioritized by urgency.

## Links
[Quarterly Report Template](https://example.com/templates/report)
`,
      tagIds: [initialTags[2].id],
    },
    {
      id: uuidV4(),
      title: "Project Plan",
      markdown: `

**Project:** New Website Launch

## Objectives
- Launch the new company website by the end of Q3.
- Improve user experience and site performance.

## Timeline
- **June:** Design and prototype.
- **July:** Development and testing.
- **August:** Final review and launch.

## Tasks
- [ ] Finalize design mockups.
- [ ] Set up development environment.
- [ ] Conduct user testing.

## Links
[Design Prototypes](https://example.com/designs)
`,
      tagIds: [initialTags[0].id, initialTags[2].id],
    },
    {
      id: uuidV4(),
      title: "Learning Markdown",
      markdown: `

Markdown is a lightweight markup language for creating formatted text using a plain-text editor. Here are some basics:

## Headings
- # H1
- ## H2
- ### H3

## Emphasis
- *Italic* or _Italic_
- **Bold** or __Bold__

## Lists
### Ordered
1. Item one
2. Item two
3. Item three

### Unordered
- Item one
- Item two
- Item three

## Code
\`\`\`javascript
console.log('Hello, world!');
\`\`\`

## Links
[Markdown Guide](https://www.markdownguide.org)

## Images
![Markdown Logo](https://markdown-here.com/img/icon256.png)
`,
      tagIds: [initialTags[1].id, initialTags[2].id],
    },
  ];

  localStorage.setItem("NOTES", JSON.stringify(initialNotes));
  localStorage.setItem("TAGS", JSON.stringify(initialTags));
}

// Run the initialization function
initializeLocalStorage();
