export interface TagIconProps {
  readonly tagName: string;
  readonly tagStyleType: 'smallTag' | 'bigTag';
  readonly deleteOption: boolean;

  onValueChange?: Function;
}
