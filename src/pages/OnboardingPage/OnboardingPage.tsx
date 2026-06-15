import {
  Box,
  Button,
  Heading,
  SimpleGrid,
  VStack,
  Text,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'

export const OnboardingPage = () => {
  return (
    <Box textAlign="center" py={10} px={6}>
      <VStack>
        <Heading size="2xl">Task Planner</Heading>
        <Text>Планируй свои задачи по дням недели</Text>

        <SimpleGrid columns={{ base: 1, md: 3 }} mt={8}>
          <Link to="/settings">
            <Button colorScheme="blue" size="lg" w="full">
              Настройки
            </Button>
          </Link>
          <Link to="/create">
            <Button colorScheme="green" size="lg" w="full">
              Создать задачи
            </Button>
          </Link>
          <Link to="/planner">
            <Button colorScheme="purple" size="lg" w="full">
              Планировщик
            </Button>
          </Link>
        </SimpleGrid>
      </VStack>
    </Box>
  )
}
