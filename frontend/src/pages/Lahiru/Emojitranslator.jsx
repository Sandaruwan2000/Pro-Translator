import React, { useEffect, useState } from 'react';
import Userdashboard from '../../components/Userdashboard';
import axios from 'axios';
import { GrStarOutline, GrTransaction } from 'react-icons/gr';
import { useSelector } from 'react-redux';
import b1 from '../../Image/e3.jpg';
import { Link, useNavigate } from 'react-router-dom';

const styles = {
    backgroundImage: `url(${b1})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    height: '100%',
  };

export default function Emojitranslator() {
    const { currentUser } = useSelector((state) => state.user);
    const [formData, setFormData] = useState([]); 
    const [searchInput, setSearchInput] = useState(''); 
    const [filteredEmoji, setFilteredEmoji] = useState(null); 
    const [searchInputMeaning, setSearchInputMeaning] = useState(''); 
    const [filteredEmojiByMeaning, setFilteredEmojiByMeaning] = useState(null); 
    const [showMeaningSearch, setShowMeaningSearch] = useState(false); 
    const [showEmojiSearch, setShowEmojiSearch] = useState(false); 
    const navigate = useNavigate(); // Create navigate function

    const email = currentUser.email;

    const [sentData, setSentData] = useState({
        email: `${email}`,
        word: '',
        meaning: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('/backend/emoji/getAllemoji');
                setFormData(res.data);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchEmojiByInput = async () => {
            if (searchInput.trim()) {
                const foundEmoji = formData.find((emoji) => emoji.emoji === searchInput.trim());
                setFilteredEmoji(foundEmoji ? foundEmoji : null);

                
                if (filteredEmoji !== foundEmoji) {
                    setSentData({
                        ...sentData,
                        word: searchInput,
                        meaning: foundEmoji ? foundEmoji.name : '',
                    });

                    try {
                        await axios.post('/backend/history/addhistory', {
                            email: sentData.email,
                            word: searchInput,
                            meaning: foundEmoji ? foundEmoji.name : '',
                        });
                    } catch (error) {
                        console.error('Error posting data:', error.message);
                    }
                }
            } else {
                setFilteredEmoji(null);
            }
        };

        fetchEmojiByInput();
    }, [searchInput, formData, filteredEmoji, sentData]);

    useEffect(() => {
        const fetchEmojiByMeaning = async () => {
            if (searchInputMeaning.trim()) {
                const foundEmoji = formData.find((emoji) => emoji.name.toLowerCase() === searchInputMeaning.trim().toLowerCase());
                setFilteredEmojiByMeaning(foundEmoji ? foundEmoji : null);

                
                if (filteredEmojiByMeaning !== foundEmoji) {
                    setSentData({
                        ...sentData,
                        word: foundEmoji ? foundEmoji.emoji : '',
                        meaning: searchInputMeaning,
                    });

                    try {
                        await axios.post('/backend/history/addhistory', {
                            email: sentData.email,
                            word: foundEmoji ? foundEmoji.emoji : '',
                            meaning: searchInputMeaning,
                        });
                    } catch (error) {
                        console.error('Error posting data:', error.message);
                    }
                }
            } else {
                setFilteredEmojiByMeaning(null);
            }
        };

        fetchEmojiByMeaning();
    }, [searchInputMeaning, formData, filteredEmojiByMeaning, sentData]);

    const showMeaningSearchOnly = () => {
        setShowMeaningSearch(true);
        setShowEmojiSearch(false);
    };

    const showEmojiSearchOnly = () => {
        setShowMeaningSearch(false);
        setShowEmojiSearch(true);
    };

    const feedback = () => {
        navigate('/AddFeedback'); 
    };

    return (
        <div  >
           

            <div className="ml-auto flex-1 overflow-y-auto" >
                <div>
                    <h1 className='text-3xl text-center font-bold font-serif my-5 text-black'>Emoji Translator</h1>

                    {!showMeaningSearch && !showEmojiSearch ? (
                        <div className='flex gap-14 ml-16 my-20'>
                            <div className='flex flex-col gap-3'>
                                <input
                                    type='text'
                                    className='border border-slate-950 p-3 rounded-lg w-96 bg-white text-blue-600'
                                    defaultValue="Emoji"
                                    disabled
                                />
                                <textarea
                                    id='word'
                                    type='text'
                                    placeholder='Enter Emoji'
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)} 
                                    className='border border-slate-950 p-3 rounded-lg w-96 bg-white text-black h-40'
                                />
                            </div>

                            <div>
                                <button className='text-xl' onClick={showMeaningSearchOnly}>
                                    <GrTransaction className='text-xl' />
                                </button>
                            </div>

                            <div className='flex flex-col gap-3'>
                                <input
                                    type='text'
                                    className='border border-slate-950 p-3 rounded-lg w-96 bg-white text-blue-600'
                                    value="Meaning"
                                    disabled
                                />
                                <textarea
                                    id='meaning'
                                    type='text'
                                    placeholder='Meaning'
                                    value={filteredEmoji ? filteredEmoji.name : 'No meaning found'} 
                                    readOnly
                                    className='border border-slate-950 p-3 rounded-lg w-96 bg-white text-black h-40'
                                />
                            </div>
                        </div>
                    ) : showMeaningSearch ? (
                        <div className='flex gap-14 ml-16 my-20'>
                            <div className='flex flex-col gap-3'>
                                <input
                                    type='text'
                                    className='border border-slate-950 p-3 rounded-lg w-96 bg-white  text-blue-600'
                                    value='Meaning'
                                    disabled
                                />
                                <textarea
                                    id='meaning'
                                    type='text'
                                    placeholder='Enter Meaning'
                                    value={searchInputMeaning}
                                    onChange={(e) => setSearchInputMeaning(e.target.value)}  
                                    className='border border-slate-950 p-3 rounded-lg w-96 bg-white text-black h-40'
                                />
                            </div>

                            <div>
                                <button className='text-xl' onClick={showEmojiSearchOnly}>
                                    <GrTransaction className='text-xl' />
                                </button>
                            </div>

                            <div className='flex flex-col gap-3'>
                                <input
                                    type='text'
                                    className='border border-slate-950 p-3 rounded-lg w-96 bg-white  text-blue-600'
                                    value="Emoji"
                                    disabled
                                />
                                <textarea
                                    id='word'
                                    type='text'
                                    placeholder='Emoji'
                                    value={filteredEmojiByMeaning ? filteredEmojiByMeaning.emoji : 'No emoji found'} 
                                    readOnly
                                    className='border border-slate-950 p-3 rounded-lg w-96 bg-white text-black h-40'
                                />
                            </div>
                        </div>
                    ) : showEmojiSearch && !showMeaningSearch ? (
                        <div className='flex gap-14 ml-16 my-20'>
                            <div className='flex flex-col gap-3'>
                                <input
                                    type='text'
                                    className='border border-slate-950 p-3 rounded-lg w-96 bg-white  text-blue-600'
                                    value='Emoji'
                                    disabled
                                />
                                <textarea
                                    id='word'
                                    type='text'
                                    placeholder='Enter Emoji'
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)} 
                                    className='border border-slate-950 p-3 rounded-lg w-96 bg-white  text-black h-40'
                                />
                            </div>

                            <div>
                                <button className='text-xl' onClick={showMeaningSearchOnly}>
                                    <GrTransaction className='text-xl' />
                                </button>
                            </div>

                            <div className='flex flex-col gap-3'>
                                <input
                                    type='text'
                                    className='border border-slate-950 p-3 rounded-lg w-96 bg-white  text-blue-600'
                                    value="Meaning"
                                    disabled
                                />
                                <textarea
                                    id='meaning'
                                    type='text'
                                    placeholder='Meaning'
                                    value={filteredEmoji ? filteredEmoji.name : 'No meaning found'} 
                                    readOnly
                                    className='border border-slate-950 p-3 rounded-lg w-96 bg-white text-black h-40'
                                />
                            </div>
                        </div>
                    ) : null}
                </div>
                
                    <div className='ml-16 -mt-16' onClick={feedback}>
                    <div className='font-serif text-blue-700 ml-96 '><button className='ml-96 flex flex-row gap-3' style={{fontStyle:'italic'}}>Feedbacks<div className='flex flex-row mt-0.5' ><GrStarOutline /><GrStarOutline /><GrStarOutline /></div></button></div>

                    </div>
                
            </div>
        </div>
    );
}
