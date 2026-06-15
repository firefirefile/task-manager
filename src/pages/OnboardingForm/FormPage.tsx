import TimeInput from '../../Components/Form/TimeInput/TimeInput.tsx'
import { Text } from '@chakra-ui/react'
import { useDurationInHours } from '../../hooks/useDurationInHours.ts'

const FormPage = () => {
  const { hours: taskHours, setHours: setTaskHours } = useDurationInHours(
    'defaultTaskDuration',
  )
  const { hours: fieldHours, setHours: setFieldHours } = useDurationInHours(
    'defaultFieldDuration',
  )

  return (
    <>
      <Text> Давай выберем, сколько часов будем планировать </Text>
      <TimeInput value={fieldHours} onChange={setFieldHours} />

      <Text>
        {' '}
        Давай выберем, сколько времени будет занимать одно задание (это время
        получится увеличить во время планирования)
      </Text>
      <TimeInput value={taskHours} onChange={setTaskHours} />
    </>
  )
}

export default FormPage
