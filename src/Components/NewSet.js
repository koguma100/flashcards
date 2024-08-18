import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from '../firebase';
import {  signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { set, update, ref } from "firebase/database";
import "./styling/NewSet.css";

const NewSet = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState("Untitled");
    const [fontSize, setFontSize] = useState(5); // Default font size in vw
    const [flashcards, setFlashcards] = useState([{ id: 0, front: '', back: ''}]);
    const [showFront, setShowFront] = useState([true]);

    const handleAddFlashcard = () => {
      setFlashcards([...flashcards, { id: flashcards.length, front: '', back: ''}]);
      setShowFront([...showFront, true]);
    }

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
      )
    )}

    const handleFlashcardChange = (id, newValue, side) => {
      setFlashcards(
        flashcards.map(card => {
          if (card.id === id) {
            // Create a new object with the updated front or back value based on the side
            return side === "front" ? { ...card, front: newValue } : { ...card, back: newValue };
          }
          // Return the unchanged card if the ID does not match
          return card;
        }
        )
      );
    };

    const handleFontSizeChange = (event) => {
      const newSize = parseInt(event.target.value);
      setFontSize(newSize);
    };

    const handleTitleChange = (newTitle) => {
      setTitle(newTitle);
    }

    const handleCancel = () => {
      navigate("/home");
    }

    const handleSubmit = () => {
      const dataRef = ref(db, 'users/' + auth.currentUser.uid + '/sets');
        // Set data at the specified location
        const flashcardsObj = Object.assign({}, flashcards);
      
        const updates = {
          [title]: flashcardsObj  
        }
        update(dataRef, updates)
          .then(() => {
            console.log('Data saved successfully!');
            // Optionally clear the input fields or handle success
          })
          .catch((error) => {
            console.error('Error saving data: ', error);
            // Handle errors here
          });
      navigate("/home");
    }
    
    const handleRemoveFlashcard = (id) => {
      if (id >= 1) {
        setFlashcards(flashcards.filter((card) => card.id !== id));
      }
    };
  
    return (
      <div>
        <div>
          <input
            type="text"
            placeholder='Enter Title...'
            value={title}
            style={{ fontSize: `${fontSize}vw`, padding: '10px' }}
            onChange={e => handleTitleChange(e.target.value)}
          />

          {/* <input
            type="range"
            min="1"
            max="10"
            value={fontSize}
            onChange={handleFontSizeChange}
          />
          <label>Font Size: {fontSize}vw</label> */}
        </div>

        {flashcards.map(card => (
          <div key={card.id + 'container'} className="flashcard-container">
            <div className="flashcard" key={card.id}>
              { showFront[card.id] ? (
                <div key={card.id + 'front'}>
                  <input
                    type="text"
                    placeholder="Type here..."
                    style={{ fontSize: `${fontSize}vw`, padding: '10px' }}
                    value={card.front}
                    className="flashcard-input"
                    onChange={e => handleFlashcardChange(card.id, e.target.value, 'front')}/>
        
                </div>
              ) : (
                <div key={card.id + 'back'}>
                  <input
                    type="text"
                    placeholder="Type here..."
                    style={{ fontSize: `3vw`, padding: '10px' }}
                    value={card.back}
                    className="flashcard-input-back"
                    onChange={e => handleFlashcardChange(card.id, e.target.value, 'back')}/>
                </div>
              )}
                        
              
            </div>
            <button onClick={() => flipCard(card.id)}>flip</button>
          </div>

        ))}
        <button onClick={handleAddFlashcard}>Add</button>
        <button onClick={() => handleRemoveFlashcard(flashcards.length - 1)}>Remove</button>
        <button onClick={handleCancel}>Cancel</button>
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </div>
      
    );
};

export default NewSet;