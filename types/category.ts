export type CategoryTheme =
  | 'GRAY'
  | 'RED'
  | 'YELLOW'
  | 'GREEN'
  | 'BLUE'
  | 'INDIGO'
  | 'PURPLE'
  | 'PINK';

export type CategoryInput = {
  id?: string; // uuid
  name: string;
  theme: CategoryTheme;
};

export type Category = {
  id: string; // uuid
  name: string;
  theme: CategoryTheme;
};
