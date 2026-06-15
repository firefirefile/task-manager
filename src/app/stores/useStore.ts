import { create } from 'zustand'
import { persist } from 'zustand/middleware' // ← правильный импорт

interface Task {
  id: string
  title: string
  description: string
  durationSeconds: number
}

export type DayOfWeek =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday'

interface AppStore {
  defaultTaskDuration: number
  defaultFieldHeight: number
  defaultFieldDuration: number
  taskBank: Task[]
  scheduledTasks: Record<DayOfWeek, Task[]>
  setDefaultTaskDuration: (duration: number) => void
  setDefaultFieldHeight: (height: number) => void
  setDefaultFieldDuration: (duration: number) => void
  addToTaskBank: (task: Task) => void
  removeFromTaskBank: (taskId: string) => void
  moveTask: (taskId: string, from: string, to: string) => void
}

export const useStore = create<AppStore>()(
  persist(
    (set, get) => ({
      defaultTaskDuration: 1800,
      defaultFieldHeight: 600,
      defaultFieldDuration: 21600,
      taskBank: [],
      scheduledTasks: {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: [],
      },

      setDefaultTaskDuration: (duration) =>
        set({ defaultTaskDuration: duration }),
      setDefaultFieldHeight: (height) => set({ defaultFieldHeight: height }),
      setDefaultFieldDuration: (duration) =>
        set({ defaultFieldDuration: duration }),

      addToTaskBank: (task) =>
        set((state) => ({
          taskBank: [...state.taskBank, task],
        })),

      removeFromTaskBank: (taskId) =>
        set((state) => ({
          taskBank: state.taskBank.filter((task) => task.id !== taskId),
        })),

      moveTask: (taskId, from, to) => {
        const state = get()

        let task: Task | undefined

        if (from === 'bank') {
          task = state.taskBank.find((t) => t.id === taskId)
        } else {
          task = state.scheduledTasks[
            from as keyof typeof state.scheduledTasks
          ].find((t) => t.id === taskId)
        }

        if (!task) return

        let newSource: Task[]
        if (from === 'bank') {
          newSource = state.taskBank.filter((t) => t.id !== taskId)
        } else {
          newSource = state.scheduledTasks[
            from as keyof typeof state.scheduledTasks
          ].filter((t) => t.id !== taskId)
        }

        let newTarget: Task[]
        if (to === 'bank') {
          newTarget = [...state.taskBank, task]
        } else {
          newTarget = [
            ...state.scheduledTasks[to as keyof typeof state.scheduledTasks],
            task,
          ]
        }

        if (from === 'bank' && to === 'bank') return

        if (from === 'bank') {
          set({
            taskBank: newSource,
            scheduledTasks: {
              ...state.scheduledTasks,
              [to]: newTarget,
            },
          })
        } else if (to === 'bank') {
          set({
            taskBank: newTarget,
            scheduledTasks: {
              ...state.scheduledTasks,
              [from]: newSource,
            },
          })
        } else {
          set({
            scheduledTasks: {
              ...state.scheduledTasks,
              [from]: newSource,
              [to]: newTarget,
            },
          })
        }
      },
    }),
    {
      name: 'task-planner-storage',
    },
  ),
)
