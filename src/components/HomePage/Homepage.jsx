import styles from './homepage.module.css';
import { useState, useEffect } from 'react';
import bgImage from '../../assets/bg-image.png';
import lock from '../../assets/lock.jpg';
import PopUp from '../pop-up/PopUP';
import Page_b from '../Page_b/Page_b';

function Homepage() {
  const [popup, setPopup] = useState(false);
  const [groups, setGroups] = useState([]);
  const [selectedBox, setSelectedBox] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showPageB, setShowPageB] = useState(false);

  useEffect(() => {
    const storedGroups = JSON.parse(localStorage.getItem('groups')) || [];
    if (Array.isArray(storedGroups)) {
      setGroups([...storedGroups]);
    } else {
      setGroups([]);
    }
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  const handleClick = () => {
    setPopup(true);
  };



  const handleNameBoxClick = (index, groupName, selectedColor) => {
    setSelectedBox(selectedBox === index ? null : index);
    setShowPageB(true);
  };

  const getFirstLetters = (text) => {
    const words = text.split(' ');
    const firstWord = words[0]?.charAt(0).toUpperCase() || '';
    const secondWord = words[1]?.charAt(0).toUpperCase() || '';
    return `${firstWord}${secondWord}`;
  };

  const togglePageB = () => {
    setShowPageB(false);
  };

  const handleClose = (groupName, selectedColor) => {
    if (groupName && selectedColor) {
      const newGroup = { storedGroupName: groupName, storedSelectedColor: selectedColor };
      const updatedGroups = [...groups, newGroup];
      setGroups(updatedGroups);
      localStorage.setItem('groups', JSON.stringify(updatedGroups));
    }
    setPopup(false);
  };

  return (
    <div>
      {isMobile ? (
        <div className={styles.homepage_container}>
          {showPageB ? (
            <Page_b
              storedGroupName={groups[selectedBox]?.storedGroupName}
              storedSelectedColor={groups[selectedBox]?.storedSelectedColor}
              togglePage={togglePageB}
            />
          ) : (
            <div className={styles.left_container}>
              <h2 className={styles.pocket_notes}>Pocket Notes</h2>
              <div className={styles.add_button} onClick={handleClick}>
                <span className={styles.add_icon}>+</span>
              </div>
              <div className={styles.notes_names}>
                {Array.isArray(groups) &&
                  groups.map((group, index) => (
                    <div
                      key={index}
                      className={`${styles.name_box} ${selectedBox === index ? styles.selected : ''}`}
                      onClick={() => handleNameBoxClick(index, group.storedGroupName, group.storedSelectedColor)}
                    >
                      <div style={{ backgroundColor: group.storedSelectedColor }}>
                        {getFirstLetters(group.storedGroupName)}
                      </div>
                      <p>{group.storedGroupName}</p>
                    </div>
                  ))}
              </div>
              {popup && <PopUp onClose={handleClose} />}
            </div>
          )}
        </div>
      ) : (
        <div className={styles.homepage_container}>
          <div className={styles.left_container}>
            <h2 className={styles.pocket_notes}>Pocket Notes</h2>
            <div className={styles.add_button} onClick={handleClick}>
              <span className={styles.add_icon}>+</span>
            </div>
            <div className={styles.notes_names}>
              {Array.isArray(groups) &&
                groups.map((group, index) => (
                  <div
                    key={index}
                    className={`${styles.name_box} ${selectedBox === index ? styles.selected : ''}`}
                    onClick={() => handleNameBoxClick(index, group.storedGroupName, group.storedSelectedColor)}
                  >
                    <div style={{ backgroundColor: group.storedSelectedColor }}>
                      {getFirstLetters(group.storedGroupName)}
                    </div>
                    <p>{group.storedGroupName}</p>
                  </div>
                ))}
            </div>
          </div>

          <div className={styles.right_container}>
            {selectedBox === null ? (
              <>
                <img src={bgImage} alt="Background" />
                <h1 className={styles.pocket_notes}>Pocket Notes</h1>
                <p>
                  Send and receive messages without keeping your phone online.<br />
                  Use Pocket Notes on up to 4 linked devices and 1 mobile phone
                </p>
                <div className={styles.encrypted}>
                  <img src={lock} alt="Lock Icon" />
                  <p>end-to-end encrypted</p>
                </div>
              </>
            ) : (
              <Page_b
                storedGroupName={groups[selectedBox]?.storedGroupName}
                storedSelectedColor={groups[selectedBox]?.storedSelectedColor}
              />
            )}
          </div>

          {popup && <PopUp onClose={handleClose} />}
        </div>
      )}
    </div>
  );
}

export default Homepage;
