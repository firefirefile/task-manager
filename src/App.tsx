import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { Button, Flex } from '@chakra-ui/react'
import Planner from './pages/Planner/Planner.tsx'
import FormPage from './pages/FormPage/FormPage.tsx'
import CreateTask from './pages/CreateTask/CreateTask.tsx'
import { OnboardingPage } from './pages/OnboardingPage/OnboardingPage.tsx'
import { MdOutlineCreate } from 'react-icons/md'
import { HiOutlineWrenchScrewdriver } from 'react-icons/hi2'
import { IoHomeOutline } from 'react-icons/io5'
import { useEffect } from 'react'
import { useStore } from './app/stores/useStore.ts'

function App() {
  const hasOnboarded = useStore((state) => state.hasOnboarded)
  const taskBank = useStore((state) => state.taskBank)
  const setHasOnboarded = useStore((state) => state.setHasOnboarded)
  const navigate = useNavigate()

  useEffect(() => {
    if (taskBank.length > 0 && !hasOnboarded) {
      setHasOnboarded(true)
    }
  }, [hasOnboarded, taskBank, navigate, setHasOnboarded])

  return (
    <Flex direction="column" h="100vh">
      <Flex gap={4} p={4} bg="gray.100">
        <Link to="/">
          {' '}
          <Button>
            <IoHomeOutline />
          </Button>
        </Link>
        <Link to="/settings">
          <Button>
            <HiOutlineWrenchScrewdriver />
          </Button>
        </Link>
        <Link to="/planner">
          <Button>Планировщик</Button>
        </Link>
        <Link to="/create">
          <Button>
            {' '}
            <MdOutlineCreate />
          </Button>
        </Link>
      </Flex>

      {/* Роуты */}
      <Routes>
        <Route path="/" element={<OnboardingPage />} />
        <Route path="/create" element={<CreateTask />} />
        <Route path="/planner" element={<Planner />} />
        <Route path="/settings" element={<FormPage />} />
      </Routes>
    </Flex>
  )
}

export default App
