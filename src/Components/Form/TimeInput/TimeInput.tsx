import {
  HStack,
  IconButton,
  NumberInputRoot,
  NumberInput,
} from '@chakra-ui/react'
import { LuMinus, LuPlus } from 'react-icons/lu'
import { useState } from 'react'

const TimeInput = () => {
  const [value, setValue] = useState(3)

  return (
    <NumberInputRoot
      value={value.toString()}
      onValueChange={(details) => setValue(details.value)}
      min={1}
      max={60}
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
