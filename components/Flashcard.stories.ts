import type { Meta, StoryObj } from "@storybook/react";

import Flashcard from "./Flashcard";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Flashcard> = {
  title: "Flashcard",
  component: Flashcard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Flashcard>;

export const Default: Story = {
  args: {
    frontContent: "Front content",
    backContent: "Back content",
  },
};
