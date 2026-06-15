import { useState } from 'react'
import type { DragEndEvent } from '@dnd-kit/core'
import { closestCenter, DndContext } from '@dnd-kit/core'
import { type DayOfWeek, useStore } from '../../app/stores/useStore.ts'
import { Box, HStack } from '@chakra-ui/react'
import { TaskBank } from '../../Components/Planner/TaskBank/TaskBank.tsx'
import { DayPlanner } from '../../Components/Planner/DayPlanner/DayPlanner.tsx'

const Planner = () => {
  const taskBank = useStore((state) => state.taskBank)
  const scheduledTasks = useStore((state) => state.scheduledTasks)
  const moveTask = useStore((state) => state.moveTask)
  const days: DayOfWeek[] = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ]
  const [currentDayIndex, setCurrentDayIndex] = useState(0)
  const currentDay = days[currentDayIndex]

  const goToPrevDay = () => {
    setCurrentDayIndex((prev) => (prev === 0 ? days.length - 1 : prev - 1))
  }

  const goToNextDay = () => {
    setCurrentDayIndex((prev) => (prev === days.length - 1 ? 0 : prev + 1))
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) return

    const activeId = String(active.id)
    const overId = String(over.id)

    // Определяем откуда задача
    let from: string | null = null
    if (taskBank.some((t) => t.id === activeId)) {
      from = 'bank'
    } else {
      for (const day of days) {
        if (scheduledTasks[day].some((t) => t.id === activeId)) {
          from = day
          break
        }
      }
    }

    // Определяем куда бросаем
    let to: string | null = null

    // Если бросили на TaskField (bank, monday, tuesday...)
    if (overId === 'bank' || days.includes(overId as DayOfWeek)) {
      to = overId
    } else {
      // Если бросили на задачу — ищем в каком она контейнере
      if (taskBank.some((t) => t.id === overId)) {
        to = 'bank'
      } else {
        for (const day of days) {
          if (scheduledTasks[day].some((t) => t.id === overId)) {
            to = day
            break
          }
        }
      }
    }

    console.log('from:', from)
    console.log('to:', to)

    // Если контейнеры разные — перемещаем
    if (from && to && from !== to) {
      console.log('✅ Перемещаем из', from, 'в', to)
      moveTask(activeId, from, to)
    } else {
      console.log('❌ Перемещение не нужно (одинаковые контейнеры или null)')
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
      <HStack align="start" gap={6} p={6}>
        <Box flex={1} borderRight="1px solid" borderColor="gray.200" pr={4}>
          <TaskBank />
        </Box>

        <Box flex={2}>
          <DayPlanner
            currentDay={currentDay}
            onPrevDay={goToPrevDay}
            onNextDay={goToNextDay}
          />
        </Box>
      </HStack>
    </DndContext>
  )
}

export default Planner
