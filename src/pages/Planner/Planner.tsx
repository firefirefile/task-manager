import { useState } from 'react'
import type { DragEndEvent } from '@dnd-kit/core'
import { closestCenter, DndContext } from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import {
  restrictToVerticalAxis,
  restrictToParentElement,
} from '@dnd-kit/modifiers'
import TaskField from '../../Components/ui/TaskField/TaskField.tsx'
import Task from '../../Components/ui/Task/Task.tsx'

const Planner = () => {
  const [tasks, setTasks] = useState([
    {
      id: '1',
      title: 'wash teeth',
      description: 'kfldfldf',
      durationSeconds: 1800,
    },
    {
      id: '2',
      title: 'wasfdsfdh dsds',
      description: 'fddfs',
      durationSeconds: 1800,
    },
    {
      id: '3',
      title: 'wasfdsdfdffdh dsds',
      description: 'fddfdfdfdfs',
      durationSeconds: 1800,
    },
    {
      id: '4',
      title: 'fdlgs,lfsdgsd',
      description: 'kfldfldf',
      durationSeconds: 1800,
    },
  ])

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    console.log('Перетащили задачу:', active.id)
    console.log('Бросили в:', over?.id)

    if (active.id !== over?.id) {
      const oldIndex = tasks.findIndex((t) => t.id === active.id)
      const newIndex = tasks.findIndex((t) => t.id === over?.id)

      setTasks(arrayMove(tasks, oldIndex, newIndex))
    }
  }

  const initialHeight = '600'

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis, restrictToParentElement]}
    >
      <TaskField height={initialHeight} className={'current-tasks_list'}>
        <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
          <ul>
            {tasks.map((task) => (
              <Task
                id={task.id}
                key={task.id}
                title={task.title}
                description={task.description}
                className={'task'}
              />
            ))}
          </ul>
        </SortableContext>
      </TaskField>
    </DndContext>
  )
}

export default Planner
