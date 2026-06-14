import { useStore } from '../app/stores/useStore.ts'

export const useDurationInHours = (
  field: 'defaultTaskDuration' | 'defaultFieldDuration',
) => {
  const seconds = useStore((state) => state[field])
  const setSeconds = useStore((state) =>
    field === 'defaultTaskDuration'
      ? state.setDefaultTaskDuration
      : state.setDefaultFieldDuration,
  )

  return {
    hours: Math.round(seconds / 3600),
    setHours: (hours: number) => setSeconds(Math.round(hours * 3600)),
  }
}
