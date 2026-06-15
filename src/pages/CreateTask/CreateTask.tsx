import { useNavigate } from 'react-router-dom'
import { useStore } from '../../app/stores/useStore.ts'
import { useState } from 'react'
import { IoAdd, IoTrashOutline } from 'react-icons/io5'
import {
  VStack,
  Text,
  Box,
  HStack,
  IconButton,
  Input,
  Textarea,
  Button,
} from '@chakra-ui/react'

interface TaskForm {
  id: string
  title: string
  description: string
}

const CreateTask = () => {
  const navigate = useNavigate()
  const addToTaskBank = useStore((state) => state.addToTaskBank)

  const [tasks, setTasks] = useState<TaskForm[]>([
    { id: crypto.randomUUID(), description: '', title: '' },
  ])

  const addTask = () => {
    setTasks([
      ...tasks,
      {
        id: crypto.randomUUID(),
        title: '',
        description: '',
      },
    ])
  }

  const removeTask = (id: string) => {
    if (tasks.length === 1) return
    setTasks(tasks.filter((t) => t.id !== id))
  }

  const updateTask = (
    id: string,
    field: 'title' | 'description',
    value: string,
  ) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, [field]: value } : t)))
  }

  const handleSaveAll = () => {
    const validTasks = tasks.filter((t) => t.title.trim())
    validTasks.forEach((task) => {
      addToTaskBank({
        id: task.id,
        title: task.title,
        description: task.description,
        durationSeconds: 1800,
      })
    })
    navigate('/planner')
  }

  const handleGoToPlanner = () => {
    navigate('/planner')
  }

  return (
    <VStack>
      <Text> Создание задач</Text>
      {tasks.map((task) => (
        <Box key={task.id} borderWidth="1px" p={4} borderRadius="md">
          <HStack justify="space-between" mb={2}>
            <Text fontWeight="bold">Задача</Text>
            <IconButton
              aria-label="Удалить"
              icon={<IoTrashOutline />}
              size="sm"
              onClick={() => removeTask(task.id)}
              isDisabled={tasks.length === 1}
            />
          </HStack>
          <Input
            placeholder="Название задачи"
            value={task.title}
            onChange={(e) => updateTask(task.id, 'title', e.target.value)}
            mb={2}
          />

          <Textarea
            placeholder="Описание (необязательно)"
            value={task.description}
            onChange={(e) => updateTask(task.id, 'description', e.target.value)}
            size="sm"
          />
        </Box>
      ))}
      <Button leftIcon={<IoAdd />} onClick={addTask} variant="outline">
        Добавить ещё задачу
      </Button>

      <HStack mt={4}>
        <Button colorScheme="blue" onClick={handleSaveAll} flex={1}>
          Сохранить все и перейти к планированию
        </Button>

        <Button variant="ghost" onClick={handleGoToPlanner} flex={1}>
          Перейти к планированию (без сохранения)
        </Button>
      </HStack>
    </VStack>
  )
}

export default CreateTask
