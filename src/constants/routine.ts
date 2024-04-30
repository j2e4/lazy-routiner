export enum RoutineCheck {
  ToCheck,
  Checked,
  Skipped,
  NoCheck,
}

export const ROUTINE_CHECK_ITEMS = [
  { name: '완료하기', value: RoutineCheck.Checked },
  { name: '오늘은 건너뛰기', value: RoutineCheck.Skipped },
  { name: '오늘 안 하기', value: RoutineCheck.NoCheck },
];

export const ROUTINE_CHECK_TABS = [
  {
    key: RoutineCheck.ToCheck,
    name: '미완료',
    pendingMessage: '오늘 실천할 루틴을 불러오는 중이에요.',
    emptyListMessage: '오늘 루틴을 모두 완료했어요.',
    updatable: true,
  },
  {
    key: RoutineCheck.Checked,
    name: '완료',
    pendingMessage: '오늘 완료한 루틴을 불러오는 중이에요.',
    emptyListMessage: '아직 완료한 루틴이 없어요.',
  },
  {
    key: RoutineCheck.Skipped,
    name: '건너뜀',
    pendingMessage: '오늘 건너뛴 루틴을 불러오는 중이에요.',
    emptyListMessage: '오늘 건너뛴 루틴이 없어요.',
  },
  {
    key: RoutineCheck.NoCheck,
    name: '안 함',
    pendingMessage: '오늘 안 하기로 한 루틴을 불러오는 중이에요.',
    emptyListMessage: '오늘 안 하기로 한 루틴이 없어요.',
  },
];
