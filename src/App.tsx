import { Routes, Route, Link } from 'react-router-dom'
import { Button, Flex } from '@chakra-ui/react'
import Planner from './pages/Planner/Planner.tsx'
import FormPage from './pages/FormPage/FormPage.tsx'
import CreateTask from './pages/CreateTask/CreateTask.tsx'

function App() {
  return (
    <Flex direction="column" h="100vh">
      <Flex gap={4} p={4} bg="gray.100">
        <Link to="/settings">
          <Button>Настройки</Button>
        </Link>
        <Link to="/planner">
          <Button>Планировщик</Button>
        </Link>
        <Link to="/create">
          <Button>Создать задачи</Button>
        </Link>
      </Flex>

      {/* Роуты */}
      <Routes>
        <Route path="/create" element={<CreateTask />} />
        <Route path="/planner" element={<Planner />} />
        <Route path="/settings" element={<FormPage />} />
      </Routes>
    </Flex>
  )
}

export default App
