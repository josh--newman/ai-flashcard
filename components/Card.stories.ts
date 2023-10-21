import type { Meta, StoryObj } from "@storybook/react";

import Card from "./Card";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    card: {
      id: "1",
      front: "Front of card",
      back: "Back of card",
      deckId: null,
      userId: "123",
      Assignment: {
        id: "1",
      },
    },
  },
};
