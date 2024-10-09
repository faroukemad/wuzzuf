import React, {  useEffect } from 'react';
import './skill.scss';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {  setSkillDetails, setRelatedJobs, setRelatedSkills, setLoading } from './formSlice';


export default function Skill() {
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const { skillId } = useParams();
    const skillDetails = useSelector((state) => state.form.skillDetails); 
    const relatedJobs = useSelector((state) => state.form.relatedJobs); 
    const relatedSkills = useSelector((state) => state.form.relatedSkills); 
    const loading = !skillDetails;
    useEffect(() => {
        const fetchSkillDetails = async () => {
            try {
                const skillResponse = await axios.get(`https://skills-api-zeta.vercel.app/skill/${skillId}`);
                const skillData = skillResponse.data.data.skill;

                dispatch(setSkillDetails(skillData));

                const jobIds = skillData.relationships.jobs.map(job => job.id);
                const skillIds = skillData.relationships.skills.map(skill => skill.id);

                const relatedJobResponses = await Promise.all(jobIds.map(jobId => 
                    axios.get(`https://skills-api-zeta.vercel.app/job/${jobId}`)
                ));
                const relatedSkillResponses = await Promise.all(
                    skillIds.map(skillId =>
                        axios.get(`https://skills-api-zeta.vercel.app/skill/${skillId}`)
                    )
                );

                const jobs = relatedJobResponses.map(res => res.data.data.job);
                dispatch(setRelatedJobs(jobs));
                const skills = relatedSkillResponses.map(res => res.data.data.skill);
                dispatch(setRelatedSkills(skills));
            } catch (error) {
                console.error("Error fetching skill details:", error);
            } finally {
                dispatch(setLoading(false)); 
            }
        };

        fetchSkillDetails();
    }, [skillId]);

    if (loading) {
        return <div className='loading'>Loading...</div>; 
    }

    if (!skillDetails) {
        return <div>No skill details found.</div>; 
    }


    const handeljob = (jobId) => {
        navigate(`/job/${jobId}`);
     };
     const handelskill = (skillIdo)=>{
        navigate(`/skill/${skillIdo}`);
     }

  return (
    <div className='job'>
            <div className="job-wrapper">
           
                   <h1 className='job-alljobs'>{skillDetails.attributes.name}</h1>
                
                <div className="job-with-history">
                    <div className="job-all-results">
                        <p className="skill-description">
                        Description:
                        </p>

                        <p className='skill-knw'>knowledge of principles and methods for moving people or goods by air, rail, sea, or road, including the relative costs and benefits.</p>
                        <p className="skill-related">Related Jobs:</p>
                       
                        {relatedJobs.map(job => (
                            <div key={job.id} className="job-result-cont" onClick={() => handeljob(job.id)}>
                                <p className='skill-operation'>{job.attributes.title}</p>
                                <div className="job-description">
                                    <p className='job-type'>Importance: <span>{skillDetails.attributes.importance}</span></p>
                                    <p className='job-type'>Level: <span>{skillDetails.attributes.level}</span></p>
                                </div>
                            </div>
                        ))}
                    
                    </div>

                    <div className="job-history">
                        <p className='job-search-history'>Related Skills:</p>
                        <ul className='job-search-ul'>
                        {relatedSkills.map(skill => (
                                <li key={skill.id} className='job-search-li' onClick={()=>handelskill(skill.id)}>{skill.attributes.name}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
  )
}
