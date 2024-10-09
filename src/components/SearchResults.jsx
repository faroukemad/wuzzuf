import React, { useState,useEffect } from 'react';
import Search from './Search'
import Result from './Result'
import axios from 'axios';

export default function SearchResults() {
    const [jobs, setJobs] = useState([]);
    const [meta, setMeta] = useState({});
    const [cursor, setCursor] = useState(0); 
    const [suggestions, setSuggestions] = useState([]);
    const [searchHistory, setSearchHistory] = useState([]); 
    const [showHistory, setShowHistory] = useState(false); 
    const fetchSkills = async (job) => {
        try {
            const skillIds = job.relationships.skills.map((skill) => skill.id);
            const skillPromises = skillIds.map((id) => axios.get(`https://skills-api-zeta.vercel.app/skill/${id}`));
            const skillsResponses = await Promise.all(skillPromises);

            const skillTitles = skillsResponses.map((res) => res.data.data.skill.attributes.name);
         
            return { ...job, skills: skillTitles };
        } catch (error) {
            console.error('Error fetching skills:', error);
            return { ...job, skills: [] }; 
        }
    };
    const fetchJobs = async (cursor) => {
        try {
            const response = await axios.get(`https://skills-api-zeta.vercel.app/jobs?cursor=${cursor}&limit=12`);
            const newJobs = response.data.data.jobs;
            const jobsWithSkills = await Promise.all(newJobs.map(fetchSkills));
            setJobs((prevJobs) => [...prevJobs, ...jobsWithSkills]); 
            setMeta(response.data.data.meta); 
            setCursor(response.data.data.meta.next); 
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    };

    const searchJobs = async (query) => {
        try {
            const response = await axios.get(`https://skills-api-zeta.vercel.app/jobs/search?query=${query}`);
            const searchedJobs = response.data.data.jobs;

            const jobsWithSkills = await Promise.all(searchedJobs.map(fetchSkills));

            setJobs(jobsWithSkills); 
            setMeta({ count: jobsWithSkills.length, next: null }); 
            setSuggestions(jobsWithSkills);

            if (query.length >= 3) {
                setSearchHistory((prevHistory) => [...new Set([query, ...prevHistory])]); 
                setShowHistory(true); 
              } else {
                setShowHistory(false); 
              }
        } catch (error) {
            console.error('Error searching jobs:', error);
        }
    };
    useEffect(() => {
        const storedHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
        const filteredHistory = storedHistory.filter((item) => {
          const searchDate = new Date(item.timestamp);
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          return searchDate >= yesterday; 
        });
        setSearchHistory(filteredHistory.map(item => item.query));
      }, []);
    
     
    return (
        <>
            <Search onSearch={searchJobs} suggestions={suggestions} />
            <Result jobs={jobs} meta={meta} fetchJobs={fetchJobs} cursor={cursor} showHistory={showHistory} searchHistory={searchHistory}/>
        </>
    )
}
