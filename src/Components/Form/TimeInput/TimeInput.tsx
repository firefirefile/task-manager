import {
  HStack,
  IconButton,
  NumberInputRoot,
  NumberInput,
} from '@chakra-ui/react'
import { LuMinus, LuPlus } from 'react-icons/lu'

interface TimeInputProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
}

const TimeInput = (props: TimeInputProps) => {
  const { value, onChange, min = 1, max = 6 } = props

  return (
    <NumberInputRoot
      value={value.toString()}
      onValueChange={(details) => onChange(Number(details.value))}
      min={min}
      max={max}
    >
      <HStack gap="2">
        <NumberInput.DecrementTrigger asChild>
          <IconButton variant="outline" size="sm">
            <LuMinus />
          </IconButton>
        </NumberInput.DecrementTrigger>

        <NumberInput.ValueText textAlign="center" fontSize="lg" minW="3ch" />

        <NumberInput.IncrementTrigger asChild>
          <IconButton variant="outline" size="sm">
            <LuPlus />
          </IconButton>
        </NumberInput.IncrementTrigger>
      </HStack>
    </NumberInputRoot>
  )
}

export default TimeInput
