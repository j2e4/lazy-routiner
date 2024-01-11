export type CategoryTheme =
  | 'gray'
  | 'red'
  | 'yellow'
  | 'green'
  | 'blue'
  | 'indigo'
  | 'purple'
  | 'pink';

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
