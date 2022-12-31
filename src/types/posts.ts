import { DateTime } from "luxon";

export interface Post {
  id: string;
  title: string;
  created: string;
  markdown: string;
  html: string;
  authorId: string;
}

export interface TimelinePost extends Omit<Post, "created"> {
  created: DateTime;
}

export const today: Post = {
  id: "1",
  title: "Today",
  created: DateTime.now().toISO(),
  markdown: "",
  html: "",
  authorId: "-1",
};

export const thisWeek: Post = {
  id: "2",
  title: "This Week",
  created: DateTime.now().minus({ day: 5 }).toISO(),
  markdown: "",
  html: "",
  authorId: "-1",
};

export const thisMonth: Post = {
  id: "3",
  title: "This Month",
  created: DateTime.now().minus({ weeks: 3 }).toISO(),
  markdown: "",
  html: "",
  authorId: "-1",
};
