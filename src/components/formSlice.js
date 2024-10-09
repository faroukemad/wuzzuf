import { createSlice } from '@reduxjs/toolkit';

const formSlice = createSlice({
    name: 'form',
    initialState: {
        skillDetails: null,
        relatedJobs: [],
        relatedSkills: [],
        loading: true,
        details: null,
        skills: null,
        relatedJobs: [],
        jobs: [],
        meta: {},
        cursor: 0,
        suggestions: [],
        searchHistory: [],
        showHistory: false,
    },
    reducers: {
        setSkillDetails: (state, action) => {
            state.skillDetails = action.payload;
        },
        setRelatedJobs: (state, action) => {
            state.relatedJobs = action.payload;
        },
        setRelatedSkills: (state, action) => {
            state.relatedSkills = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setDetails: (state, action) => {
            state.details = action.payload;
        },
        setSkills: (state, action) => {
            state.skills = action.payload;
        },
        setJobs: (state, action) => {
            state.jobs = action.payload;
        },
        setMeta: (state, action) => {
            state.meta = action.payload;
        },
        setCursor: (state, action) => {
            state.cursor = action.payload;
        },
        setSuggestions: (state, action) => {
            state.suggestions = action.payload;
        },
        setSearchHistory: (state, action) => {
            state.searchHistory = action.payload;
        },
        setShowHistory: (state, action) => {
            state.showHistory = action.payload;
        },
        clearSkillDetails: (state) => {
            state.skillDetails = null;
            state.relatedJobs = [];
            state.relatedSkills = [];
            state.loading = true;
            state.details = null;
            state.skills = null;
            state.relatedJobs = [];
        },
    },
});

export const { setSkillDetails, setRelatedJobs, setRelatedSkills, clearSkillDetails, setLoading, setDetails, setSkills,setJobs,setMeta,setCursor,setSuggestions,setSearchHistory,setShowHistory } = formSlice.actions;
export default formSlice.reducer;
