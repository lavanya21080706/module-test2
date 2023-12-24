import React, {useState, useEffect , useRef } from 'react';
import styles from './Popup.module.css';

function PopUp({ onClose }) {

    const colors = [
        { id: 1, color: "#B38BFA" },
        { id: 2, color: "#FF79F2" },
        { id: 3, color: "#43E6FC" },
        { id: 4, color: "#F19576" },
        { id: 5, color: "#0047FF" },
        { id: 6, color: "#6691FF" },
    ]

    const[groupName,  setGroup] = useState('');
    const[selectedColor, setColor] = useState('');
    const popUpRef = useRef(null);

    const handleClickOutside = (e) => {
        if (popUpRef.current && !popUpRef.current.contains(e.target)) {
            onClose();
        }
    };

    const handle = ()=>{
        if (groupName && selectedColor) {
            localStorage.setItem('groupName', groupName);
            localStorage.setItem('selectedColor', selectedColor);
            onClose(groupName, selectedColor);
            setGroup('');
            setColor('');
        }
    }
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return (
        <div className={styles.overlay}>
            <div className={styles.popup_container} ref={popUpRef}> 
                <div className={styles.popup}>
                    <span>Create New group</span><br /><br />
                    <span>Group Name</span>
                    <input type='text' placeholder='Enter Group Name' className={styles.input_group} onChange={(e)=>setGroup(e.target.value)}/><br /><br />
                    <div className={styles.choose_color}>
                        <span>Choose Colour</span>
                        <div className={styles.color_container}>
                            {colors.map((color) => (
                                <div key={color.id} className={`${styles.color} ${selectedColor === color.color ? styles.selected : ''}`} 
                                onClick={()=>{setColor(color.color)}}
                                    style={{ backgroundColor: color.color }}>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <button className={styles.create_button} onClick={handle}>Create</button>
            </div>

        </div>
    );
}

export default PopUp;
