import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  statusCounts: {
    pending: 0,
    completed: 0,
  },
};
const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        ...action.payload,
        status: action.payload.status || "pending", 
      };
      state.tasks.push(newTask);
      if (newTask.status === "pending") {
        state.statusCounts.pending += 1;
      } else if (newTask.status === "completed") {
        state.statusCounts.completed += 1;
      }
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {

        const prevStatus = state.tasks[index].status;
        const newStatus = action.payload.status;

        state.tasks[index] = action.payload;
        if (prevStatus !== newStatus) {
          if (prevStatus === "pending") {
            state.statusCounts.pending -= 1;
          } else if (prevStatus === "completed") {
            state.statusCounts.completed -= 1;
          }

          if (newStatus === "pending") {
            state.statusCounts.pending += 1;
          } else if (newStatus === "completed") {
            state.statusCounts.completed += 1;
          }
        }
      }
    },
    deleteTask: (state, action) => {
      const taskToDelete = state.tasks.find(
        (task) => task.id === action.payload
      );
      if (taskToDelete) {
        if (taskToDelete.status === "pending") {
          state.statusCounts.pending -= 1;
        } else if (taskToDelete.status === "completed") {
          state.statusCounts.completed -= 1;
        }
      }
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    markAsCompleted: (state, action) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task && task.status === "pending") {
        task.status = "completed";
        state.statusCounts.pending -= 1;
        state.statusCounts.completed += 1;
      }
    },
    markAsPending: (state, action) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task && task.status === "completed") {
        task.status = "pending";
        state.statusCounts.completed -= 1;
        state.statusCounts.pending += 1;
      }
    },
  },
});

export const {
  addTask,
  updateTask,
  deleteTask,
  markAsCompleted,
  markAsPending,
} = tasksSlice.actions;
export const selectTasks = (state) => state.tasks.tasks;
export const selectStatusCounts = (state) => state.tasks.statusCounts;
export default tasksSlice.reducer;
