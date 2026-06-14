import type { ReactNode } from 'react'
import { useDroppable } from '@dnd-kit/core'

interface TaskFieldProps {
  height: string
  className: string
  children: ReactNode
}

const TaskField = ({ height, className, children }: TaskFieldProps) => {
  const { setNodeRef } = useDroppable({ id: 'task-field' })

  return (
    <div
      ref={setNodeRef}
      className={`task-list_container ${className}`}
      style={{ height: `${height}px` }}
    >
      {children}
    </div>
  )
}

export default TaskField
