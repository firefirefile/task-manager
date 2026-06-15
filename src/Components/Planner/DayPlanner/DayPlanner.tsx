import { type DayOfWeek, useStore } from '../../../app/stores/useStore.ts'
import { Box, VStack, Text } from '@chakra-ui/react'
import { DayNavigation } from '../DayNavigation/DayNavigation.tsx'
import TaskField from '../../ui/TaskField/TaskField.tsx'
import Task from '../../ui/Task/Task.tsx'

interface DayPlannerProps {
  currentDay: DayOfWeek
  onPrevDay: () => void
  onNextDay: () => void
}

export const DayPlanner = (props: DayPlannerProps) => {
  const { currentDay, onPrevDay, onNextDay } = props

  const scheduledTasks = useStore((state) => state.scheduledTasks)
  const tasks = scheduledTasks[currentDay]
  return (
    <Box flex={2} p={4}>
      <DayNavigation
        currentDay={currentDay}
        onPrev={onPrevDay}
        onNext={onNextDay}
      />

      <TaskField
        height={'600'}
        className={'task-field'}
        id={currentDay}
        items={tasks.map((t) => t.id)}
      >
        <VStack gap={2} align="stretch">
          {tasks.map((task) => (
            <Task key={task.id} {...task} />
          ))}

          {tasks.length === 0 && (
            <Text>Нет запланированных задач. Перетащите из коробки.</Text>
          )}
        </VStack>
      </TaskField>
    </Box>
  )
}
