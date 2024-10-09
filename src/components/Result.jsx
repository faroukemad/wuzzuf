import React, { useEffect  } from 'react';
import './result.scss';
import { useNavigate } from 'react-router-dom'
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
export default function Result({ jobs, meta, fetchJobs, cursor, showHistory,searchHistory }) {

    useEffect(() => {
        fetchJobs(cursor);
    }, []);

    useEffect(() => {
        const handleScroll = debounce(() => {
            if (
                window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && 
                cursor !== null && 
                jobs.length < meta.count 
            ) {
                fetchJobs(cursor); 
            }
        }, 300); 

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll); 
        };
    }, [cursor, jobs, meta, fetchJobs]);


    const navigate = useNavigate();
    const handlejobClick = (jobId) => {
        navigate(`/job/${jobId}`);
    }
    return (
        <div className='result'>
            <div className="result-wrapper">
                {jobs && (
                    <h1 className='result-alljobs'>All Jobs ({meta.count})</h1>
                )}
                <div className="results-with-history">
                    <div className={"results-all-results "+(showHistory && ' results-all-results-history')}>

                        {jobs && jobs.map((job, index) => (
                            <div className={'results-result-cont ' + (showHistory && ' results-result-cont-history')} key={index} onClick={() => handlejobClick(job.id)}>
                                <p className='result-grade'>{job.attributes.title}</p>
                                <p className='result-skills'>Related Skills:</p>
                                <div className="result-skills-cont">

                                    {job.skills && job.skills.map((skill, skillIndex) => (
                                        <p className='result-skill' key={skillIndex}>{skill}</p>
                                    ))}
                                </div>
                                <p className='result-details'>View Job details</p>
                            </div>
                        ))}
                    </div>
                    {showHistory && (
                        <div className="results-history">
                            <p className='job-search-history'>Search History:</p>
                            <ul className='job-search-ul'>

                                {searchHistory.map((historyItem, index) => (
                                    <li key={index} className="job-search-li">{historyItem}</li>
                                ))}

                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
