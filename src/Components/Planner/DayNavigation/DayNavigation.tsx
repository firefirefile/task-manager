import { Heading, HStack, IconButton } from '@chakra-ui/react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import type { DayOfWeek } from '../../../app/stores/useStore.ts'

interface DayNavigationProps {
  currentDay: DayOfWeek
  onPrev: () => void
  onNext: () => void
}
const dayNames: Record<DayOfWeek, string> = {
  monday: 'Понедельник',
  tuesday: 'Вторник',
  wednesday: 'Среда',
  thursday: 'Четверг',
  friday: 'Пятница',
  saturday: 'Суббота',
  sunday: 'Воскресенье',
}

export const DayNavigation = (props: DayNavigationProps) => {
  const { currentDay, onPrev, onNext } = props

  return (
    <HStack>
      <IconButton onClick={onPrev} aria-label="Предыдущий день">
        <FaArrowLeft />
      </IconButton>
      <Heading size="lg">{dayNames[currentDay]}</Heading>
      <IconButton onClick={onNext} aria-label="Следующий день">
        <FaArrowRight />
      </IconButton>
    </HStack>
  )
}
