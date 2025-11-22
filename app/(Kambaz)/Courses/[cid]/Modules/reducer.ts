import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export interface Lesson {
    _id: string;
    name: string;
    description: string;
    module: string; // module id
}

export interface Module {
    _id: string;
    name: string;
    description: string;
    course: string;   // course id
    lessons: Lesson[];
    editing?: boolean;
}

interface ModulesState {
    modules: Module[];
}

type AddModulePayload = {
    name: string;
    course: string;
    description?: string;
};

type UpdateModulePayload = Module;

// ---- Initial state (EMPTY — will be loaded from server)
const initialState: ModulesState = {
    modules: [],
};

// ---- Slice
const modulesSlice = createSlice({
    name: "modules",
    initialState,
    reducers: {
        // Load modules from server
        setModules: (state, action: PayloadAction<Module[]>) => {
            state.modules = action.payload;
        },

        addModule: (state, action: PayloadAction<AddModulePayload>) => {
            const newModule: Module = {
                _id: uuidv4(),
                name: action.payload.name,
                description: action.payload.description ?? "",
                course: action.payload.course,
                lessons: [],
            };
            state.modules.push(newModule);
        },

        deleteModule: (state, action: PayloadAction<string>) => {
            state.modules = state.modules.filter(
                (m) => m._id !== action.payload
            );
        },

        updateModule: (state, action: PayloadAction<UpdateModulePayload>) => {
            state.modules = state.modules.map((m) =>
                m._id === action.payload._id ? action.payload : m
            );
        },

        editModule: (state, action: PayloadAction<string>) => {
            state.modules = state.modules.map((m) =>
                m._id === action.payload ? { ...m, editing: true } : m
            );
        },
    },
});

// Export reducer actions
export const {
    setModules,
    addModule,
    deleteModule,
    updateModule,
    editModule,
} = modulesSlice.actions;

export default modulesSlice.reducer;
