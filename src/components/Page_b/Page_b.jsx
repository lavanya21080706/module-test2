import React, { useState, useEffect } from 'react';
import styles from './page_b.module.css';
import send from '../../assets/send_btn.png';
import sendGray from '../../assets/send_gray.png';
import ArrowIcon from '../../assets/ArrowIcon.jpg';

function Page_b({ storedGroupName, storedSelectedColor,togglePage }) {
  const [userInput, setUserInput] = useState('');
  const [notes, setNotes] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);


  useEffect(() => {
    const storedGroupNotes = JSON.parse(localStorage.getItem(storedGroupName)) || [];
    setNotes(storedGroupNotes);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [storedGroupName]);

  const getFirstLetters = (text) => {
    const words = text.split(' ');
    const firstWord = words[0]?.charAt(0).toUpperCase() || '';
    const secondWord = words[1]?.charAt(0).toUpperCase() || '';
    return `${firstWord}${secondWord}`;
  };


  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleArrowIconClick = () => {
    togglePage(); // Call the togglePage function passed from Homepage
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    const dateOptions = { day: 'numeric', month: 'short', year: 'numeric' };
    const dateString = now.toLocaleDateString('en-US', dateOptions);
    const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
    const timeString = now.toLocaleTimeString('en-US', timeOptions);
    return `${dateString} ${timeString}`;
  };


  const handleSendClick = () => {
    if (userInput.trim() !== '') {
      const newNote = {
        content: userInput,
        dateTime: getCurrentDateTime(),
      };

      const updatedNotes = [...notes, newNote];
      setNotes(updatedNotes);

      localStorage.setItem(storedGroupName, JSON.stringify(updatedNotes));
      setUserInput('');
    }
  };

  return (
    <div className={styles.notes_container}>
      <div className={styles.header}>
        <div className={styles.grp_container}>
          {isMobile && (
            <div className={styles.arrow_icon} onClick = {handleArrowIconClick}>
              <img src={ArrowIcon} alt="icon" className={styles.ArrowIcon} />
            </div>
          )}
          <div style={{ backgroundColor: storedSelectedColor }} className={styles.profile}>
            {getFirstLetters(storedGroupName)}
          </div>
          <p className={styles.grpname}>{storedGroupName}</p>
        </div>
      </div>
      <div className={styles.user_notes}>
        {notes.map((note, index) => (
          <div key={index} className={styles.note_container}>
            <p className={styles.note}>{note.content}</p>
            <div className={styles.date}>
              <p>{note.dateTime}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.msg_sender}>
          <textarea
            placeholder="Here’s the sample text for sample work"
            className={styles.textarea}
            value={userInput}
            onChange={handleInputChange}
          />
        <img
          src={userInput.trim() === '' ? sendGray : send}
          alt="send"
          className={styles.send}
          onClick={handleSendClick}
        />
      </div>
    </div>
  );
}

export default Page_b;
