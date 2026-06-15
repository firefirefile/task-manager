import type { ReactNode } from 'react'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

interface TaskFieldProps {
  height: string
  className: string
  children: ReactNode
  id: string
  items: string[]
}

const TaskField = ({
  id,
  height,
  className,
  children,
  items,
}: TaskFieldProps) => {
  const { setNodeRef } = useDroppable({ id })

  return (
    <div
      ref={setNodeRef}
      className={`task-list_container ${className}`}
      style={{ height: `${height}px` }}
    >
      <SortableContext
        id={id}
        items={items}
        strategy={verticalListSortingStrategy}
      >
        {children}
      </SortableContext>
    </div>
  )
}

export default TaskField
