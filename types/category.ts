export type CategoryTheme =
  | 'GRAY'
  | 'RED'
  | 'YELLOW'
  | 'GREEN'
  | 'BLUE'
  | 'INDIGO'
  | 'PURPLE'
  | 'PINK';

export type Category = {
  id: string; // uuid
  name: string;
  theme: CategoryTheme;
};
