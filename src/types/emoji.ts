export type EmojiPickerEmoji = {
  native: string;
  id: string;
  name: string;
  unified: string;
  keywords?: string[];
  skin?: number;
  emoticons?: string[];
  shortcodes?: string;
  custom?: boolean;
};
