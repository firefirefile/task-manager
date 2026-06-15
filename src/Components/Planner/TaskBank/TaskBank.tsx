import { useStore } from '../../../app/stores/useStore.ts'
import { Box, Heading, VStack, Text } from '@chakra-ui/react'
import TaskField from '../../ui/TaskField/TaskField.tsx'
import Task from '../../ui/Task/Task.tsx'

export const TaskBank = () => {
  const taskBank = useStore((state) => state.taskBank)

  return (
    <Box>
      <Heading> Нераспределенные задачи</Heading>
      <TaskField
        id="bank"
        height={'600'}
        className={'taskBank'}
        items={taskBank.map((t) => t.id)}
      >
        <VStack>
          {taskBank.map((task) => (
            <Task key={task.id} {...task} />
          ))}
          {taskBank.length === 0 && (
            <Text color="gray.400" textAlign="center" py={8}>
              {' '}
              Нет задач. Так держать!{' '}
            </Text>
          )}
        </VStack>
      </TaskField>
    </Box>
  )
}
