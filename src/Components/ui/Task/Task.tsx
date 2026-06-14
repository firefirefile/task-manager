import { Card, Heading, Text } from '@chakra-ui/react'
import { CSS } from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable'

interface TaskProps {
  id: string
  title: string
  description: string
  className: string
}

const Task = ({ id, title, description, className }: TaskProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card.Root
        className={className}
        variant="outline"
        size="sm"
        style={{
          minHeight: '80px',
          backgroundColor: 'var(--chakra-colors-bg-default)',
          color: 'var(--chakra-colors-fg-default)',
        }}
      >
        <Card.Header>
          <Heading size="sm">{title}</Heading>
        </Card.Header>
        <Card.Body pt={0}>
          <Text fontSize="sm">{description}</Text>
        </Card.Body>
      </Card.Root>
    </div>
  )
}

export default Task
