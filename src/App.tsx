import { Routes, Route, Link } from 'react-router-dom'
import { Button, Flex } from '@chakra-ui/react'
import Planner from './pages/Planner/Planner.tsx'
import FormPage from './pages/OnboardingForm/FormPage.tsx'
import CreateTask from './pages/CreateTask/CreateTask.tsx'

function App() {
  return (
    <Flex direction="column" h="100vh">
      <Flex gap={4} p={4} bg="gray.100">
        <Link to="/">
          <Button>Настройки</Button>
        </Link>
        <Link to="/planner">
          <Button>Планировщик</Button>
        </Link>
      </Flex>

      {/* Роуты */}
      <Routes>
        <Route path="/" element={<FormPage />} />
        <Route path="/planner" element={<Planner />} />
        <Route path="/create" element={<CreateTask />} />
      </Routes>
    </Flex>
  )
}

export default App
