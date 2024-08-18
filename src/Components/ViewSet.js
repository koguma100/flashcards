import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { get, ref } from "firebase/database";

const ViewSet = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { title, userData } = location.state || {};
    const [dataLoaded, setDataLoaded] = useState(false);
    const [showFront, setShowFront] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const length = Object.keys(userData.sets[title]).length;
            setShowFront(Array.from({ length }, () => true));

            setDataLoaded(true);  
            } catch (error) {
            console.error('Error fetching data:', error);
          }
        };

        fetchData();
      }, [location]);

    const flipCard = (id) => {
        setShowFront(
            showFront.map((card, i) => {
            if (id === i) {
                return card ? false : true;
            }
            else {
                return card;
            }
            }
        ))
        console.log(showFront)
    }

    const navigateHome = () => {
         navigate("/home");
    }

    return (
        <div>
            <div>{title}</div>
            { dataLoaded ? Object.entries(userData.sets[title]).map(([key, value]) => (
                <div key={value.id + 'container'} className="flashcard-container">
                <div className="flashcard" key={value.id}>
                  { showFront[value.id] ? (
                    <div key={value.id + 'front'}>
                      <div style={{ fontSize: `5vw`, padding: '10px' }} className="flashcard-input">
                        {value.front}
                      </div>
                    </div>
                  ) : (
                    <div key={value.id + 'back'}>                  
                      <div style={{ fontSize: `3vw`, padding: '10px' }} className="flashcard-input">
                        {value.back}
                      </div>
                    </div>
                  )}
                            
                  
                </div>
                <button className="no-select" onClick={() => flipCard(value.id)}>flip</button>
              </div>
            )) :
                <div className="spinner"></div>
            }
            <button onClick={navigateHome}>Home</button>
        </div>
    )
}

export default ViewSet;