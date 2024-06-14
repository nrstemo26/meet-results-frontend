import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { baseUrl } from '../../../config';

const RelatedAthletes = ({ athleteName }) => {
    const [relatedAthletes, setRelatedAthletes] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRelatedAthletes = async () => {
            try {
                const response = await axios.get(`${baseUrl}/v1/related_athletes/${athleteName}`);
                setRelatedAthletes(response.data);
            } catch (error) {
                setError('Failed to fetch related athletes.');
                console.error(error);
            }
        };

        fetchRelatedAthletes();
    }, [athleteName]);

    return (
        <div className="p-6 shadow-lg rounded-lg">
            <h2 className="text-lg font-bold border-b border-primary-100 text-center m-2">Related Athletes</h2>
            {error && <p className="text-sm text-red-500">{error}</p>}
            {relatedAthletes.length > 0 ? (
                <ul className="list-none">
                    {relatedAthletes.map((relatedAthlete, index) => (
                        <li key={index}>
                            <Link to={`/athlete/${relatedAthlete}`} className="text-sm text-primary-950 hover:text-primary-500">
                                {relatedAthlete}
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-sm text-gray-700">No related athletes found.</p>
            )}
        </div>
    );
};

export default RelatedAthletes;
