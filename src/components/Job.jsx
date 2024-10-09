import React, { useState, useEffect } from 'react';
import './job.scss';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {  setDetails, setLoading, setSkills, setRelatedJobs  } from './formSlice';

export default function Job() {
    const dispatch=useDispatch();
    const { jobId } = useParams(); 
    const details = useSelector((state) => state.form.details); 
    const loading = useSelector((state) => state.form.loading); 
    const skills = useSelector((state) => state.form.skills); 
    const relatedJobs = useSelector((state) => state.form.relatedJobs);

    const navigate = useNavigate();
    const handeljob = (jobId) => {
        navigate(`/job/${jobId}`);
     };

     const handelskill = (skillIdo)=>{
        navigate(`/skill/${skillIdo}`);
     }

    useEffect(() => {
        const fetchJobDetail = async () => {
            try {
                const jobResponse = await axios.get(`https://skills-api-zeta.vercel.app/job/${jobId}`); 
                
                dispatch(setDetails(jobResponse.data.data.job));
                const skillIds = jobResponse.data.data.job.relationships.skills.map(skill => skill.id);

                const skillResponses = await Promise.all(skillIds.map(skillId =>
                    axios.get(`https://skills-api-zeta.vercel.app/skill/${skillId}`)
                ));

                const extractedSkills = skillResponses.map(skillResponse => skillResponse.data.data.skill);
                dispatch(setSkills(extractedSkills));

                const jobIds = [];
                skillResponses.forEach(skillResponse => {
                    const relatedJobs = skillResponse.data.data.skill.relationships.jobs;
                    jobIds.push(...relatedJobs.map(job => job.id));
                });

                const relatedJobResponses = await Promise.all(jobIds.map(relatedJobId =>
                    axios.get(`https://skills-api-zeta.vercel.app/job/${relatedJobId}`)
                ));

                const relatedJobDetails = relatedJobResponses.map(res => res.data.data.job);
                dispatch(setRelatedJobs(relatedJobDetails));


            } catch (error) {
                console.error('Error fetching job details:', error);
            } finally {
                dispatch(setLoading(false)); 
            }
        };

        fetchJobDetail();
    }, [jobId]);

    if (loading) {
        return <div className='loading'>Loading...</div>; 
    }

    if (!details) {
        return <div>No job details found.</div>; 
    }

    return (
        <div className='job'>
            <div className="job-wrapper">
                {details.attributes.title && (
                    <h1 className='job-alljobs'>{details.attributes.title}</h1>
                )}
                <div className="job-with-history">
                    <div className="job-all-results">
                        <p className="job-related">Related Skills:</p>
                        {skills.map(skill => (
                            <div key={skill.id} className="job-result-cont" onClick={()=>handelskill(skill.id)}>
                                <p className='job-operation'>{skill.attributes.name}</p>
                                <p className='job-ability'>The ability to communicate information and ideas in speaking so others will understand.</p>
                                <div className="job-description">
                                    <p className='job-type'>Type: <span>{skill.attributes.type}</span></p>
                                    <p className='job-type'>Importance: <span>{skill.attributes.importance}</span></p>
                                    <p className='job-type'>Level: <span>{skill.attributes.level}</span></p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="job-history">
                        <p className='job-search-history'>Related Jobs:</p>
                        <ul className='job-search-ul'>

                            {relatedJobs.map(job => (
                                <li key={job.id} className='job-search-li' onClick={() => handeljob(job.id)}>{job.attributes.title}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
