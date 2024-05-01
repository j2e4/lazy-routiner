import { useQueryClient } from '@tanstack/react-query';
import List from 'src/components/list';
import { RoutineCheck } from 'src/constants/routine';
import { DailyRoutineTab } from 'types/routine';

const PendingMessage = {
  [RoutineCheck.ToCheck]: '오늘 실천할 루틴을 불러오는 중이에요.',
  [RoutineCheck.Checked]: '오늘 완료한 루틴을 불러오는 중이에요.',
  [RoutineCheck.Skipped]: '오늘 건너뛴 루틴을 불러오는 중이에요.',
  [RoutineCheck.NoCheck]: '오늘 안 하기로 한 루틴을 불러오는 중이에요.',
};
const EmptyListMessage = {
  [RoutineCheck.ToCheck]: '오늘 루틴을 모두 완료했어요.',
  [RoutineCheck.Checked]: '아직 완료한 루틴이 없어요.',
  [RoutineCheck.Skipped]: '오늘 건너뛴 루틴이 없어요.',
  [RoutineCheck.NoCheck]: '오늘 안 하기로 한 루틴이 없어요.',
};

function createListItem(message: string) {
  return (
    <List.Item>
      <List.ItemBody className="text-center">
        <List.ItemBodyText>{message}</List.ItemBodyText>
      </List.ItemBody>
    </List.Item>
  );
}

type TabListPlaceholderProps = {
  tabIndex: number;
};

/**
 * DailyRoutine 목록을 fetch 중이거나 데이터가 없을 때 보여주는 placeholder
 */
export default function TabListPlaceholder({
  tabIndex,
}: TabListPlaceholderProps) {
  const queryClient = useQueryClient();
  const queryState = queryClient.getQueryState<DailyRoutineTab[]>([
    'daily_routines',
  ]);
  const queryData = queryClient.getQueryData<DailyRoutineTab[]>([
    'daily_routines',
  ]);

  const status = queryState?.status;
  const tab = queryData?.[tabIndex];

  // query 문제
  if (tab === undefined) return createListItem('탭 정보를 찾을 수 없어요.');
  if (tab.routines === undefined)
    return createListItem('루틴 목록을 찾을 수 없어요.');

  // query state 관련
  if (status === 'pending') return createListItem(PendingMessage[tab.id]);
  if (status === 'success' && tab.routines.length === 0)
    return createListItem(EmptyListMessage[tab.id]);

  return null;
}
