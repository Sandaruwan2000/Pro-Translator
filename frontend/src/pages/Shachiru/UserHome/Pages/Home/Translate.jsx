import React, { useState, useEffect } from "react";
import axios from "axios";
import Alert from 'react-bootstrap/Alert';


import Form from 'react-bootstrap/Form';

import RiseLoader from "react-spinners/ClipLoader";
import './Translate.css';
import { useLocation, useNavigate } from "react-router-dom";


export default function Translator(){



    const [sourceText, setSourceText] = useState("");
    const [translatedText, setTranslatedText] = useState("");
    const [sourceLang, setSourceLang] = useState("en");
    const [targetLang, setTargetLang] = useState("si");
    const [isLoading, setIsLoading] = useState(false);
    const [showAlert,setshowAlert]=useState(false);
    const [alertMessage,setalertMessage]=useState("");
    const [editMode, setEditMode] = useState(false);
    const [editFavorite, setEditFavorite] = useState(null);
    const [originalSourceText, setOriginalSourceText] = useState("");
    const [originalSourceLang, setOriginalSourceLang] = useState("");
    const [originalTargetLang, setOriginalTargetLang] = useState("");
    const [hasChanges, setHasChanges] = useState(false);
    const [translationDone, setTranslationDone] = useState(false);
    const [useGlossary, setUseGlossary] = useState(false);
   
    const navigate = useNavigate();
    const location = useLocation();
    const[TogLisActive,setTogLActive]=useState(false);
    const[TogRisActive,setTogRActive]=useState(false);






  useEffect(() => {
    if (location.state?.editMode) {
      setEditMode(true);
      const { favorite } = location.state;
      setSourceText(favorite.text);
      setTranslatedText(favorite.translatedText);
      setSourceLang(favorite.sourceLang);
      setTargetLang(favorite.targetLang);
      setEditFavorite(favorite);

      setOriginalSourceText(favorite.text);
      setOriginalSourceLang(favorite.sourceLang);
      setOriginalTargetLang(favorite.targetLang);
    }
  }, [location.state]);

  useEffect(() => {
    if (
      sourceText !== originalSourceText ||
      sourceLang !== originalSourceLang ||
      targetLang !== originalTargetLang
    ) {
      setHasChanges(true);
    } else {
      setHasChanges(false);
    }
  }, [sourceText, sourceLang, targetLang, originalSourceText, originalSourceLang, originalTargetLang]);

  const handleTranslate = async () => {
    if (!sourceText) {
     setalertMessage("Please Enter the text");
     setshowAlert(true);
     timer();
    }
    
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:4000/translate-text", {
        text: sourceText,
        sourceLang,
        targetLang,
        useGlossary 
      });
      setTranslatedText(response.data.translatedText);
      setTranslationDone(true);
    } catch (error) {
      console.error("Translation error:", error);
    } finally {
      setIsLoading(false);
    }
  };



  const handleSaveTranslation = async () => {
    try {
      if (editMode) {
        await axios.put(`http://localhost:4000/favourite/update/${editFavorite._id}`, {
          text: sourceText,
          sourceLang,
          targetLang,
          translatedText
        });
       
        setalertMessage("Translation updated successfully!");
       
      
     
      } else {
        await axios.post("http://localhost:4000/favourite/add", {
          text: sourceText,
          translatedText,
          sourceLang,
          targetLang,
          userId: 1
        });
      
        setalertMessage("Translation saved to favorites!");
       
      
     
       
      }
      setshowAlert(true);
      setTimeout(() => {
        navigate('/UserHome/favorites');
      }, 2300);
      
    } catch (error) {
      console.error("Error saving translation:", error);
    }
  };




/*Speech to text*/ 
/*
const handleSpeechToText = () => {
    if (listening) {
      SpeechRecognition.stopListening();
      resetTranscript();
    } else {
      SpeechRecognition.startListening();
    }
  };
  const handleTextToSpeech = () => {
    if ('speechSynthesis' in window) {
       
      const utterance = new SpeechSynthesisUtterance(translatedText);
      utterance.lang = targetLang;
      speechSynthesis.speak(utterance);
   

    } else {
      
      setalertMessage('Speech synthesis not supported');
      setshowAlert(true);
      timer();
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

*/

/* Swap Lang */
 
    const SwapOnClick=()=>{

        setTogLActive(!TogLisActive);
        setTogRActive(!TogRisActive);

        /*swap lanugaes*/

       setSourceLang(targetLang);
       setTargetLang(sourceLang);

       /*swap texts*/
       setSourceText(translatedText);
       setTranslatedText(sourceText);

       setalertMessage("Language Swapped");
       setshowAlert(true);
       timer();
      
    };

/* Swap Lang */


/*alert*/
let timer = ()=>{setTimeout(() => {
  setshowAlert(false);
}, 2000)};
/*************************/

    return(

        <div>
<Alert show={showAlert}  variant="success" className="Alert">
    {alertMessage}
 </Alert>
            
 
<div className="float-container">

    
<div className="Translate-btn"  onClick={handleTranslate}  disabled={!sourceText}>

          
            {isLoading ? (
              <div className="d-flex align-items-center">
               
               <span class="loader"></span>
              
              </div>
            ) : (
              "Translate"
            )}
         
</div>
<div className="glossery">
<input id="cb3" class="tgl tgl-skewed" type="checkbox"  checked={useGlossary}
            onChange={(e) => setUseGlossary(e.target.checked)}/>
<label class="tgl-btn"  for="cb3"></label>
</div>
<div className="Troggler r">


        <div className={TogLisActive? 'activeL' :''} id="togL">
        {(sourceLang==='en' && !TogLisActive)?"A":(targetLang==='en' && TogLisActive)?"A":"අ"}
        </div>
        <div className="togM" onClick={SwapOnClick}><i class="fa fa-exchange" aria-hidden="true"></i></div>
        <div className={TogLisActive? 'activeR' :''} id="togR">
        {(targetLang==='si' && !TogRisActive)?"අ":(sourceLang==='si' && TogRisActive)?"අ":"A"}
        </div>
        

</div>
    


<div className="float-child left">
  <div className="green">
 <span className="form-heading">Enter text here</span>
  <Form
              className="Sourcetext"  
              as="textarea"
              placeholder="Enter text"
              value={sourceText}
              onChange={(e) => {
                setSourceText(e.target.value);
                setTranslationDone(false);
              }}
              rows={15}
            />


  </div>
  <span className="Lang left">{(sourceLang==='en')?"English":"Sinhala"}</span>

  {/*sourceLang==="en"?<button className={listening?"Lang listening":"Lang speech"}  onClick={handleSpeechToText}>
    <i className="fa-solid fa-microphone"></i>
  </button>:null*/}
  
</div>

<div className="float-child right">
  <div className="blue">
  <span className="form-heading">Translated text</span>
  <Form
              className="Sourcetext translated"  
              as="textarea"
             value={translatedText}
              placeholder={translationDone ? "" : "Translation"}
              readOnly
              rows={15}
            ></Form>

  </div>
  <span className="Lang right">{(targetLang==='en')?"English":"Sinhala"}</span>
 {/*translationDone && targetLang==='en'?<button className="Lang TransDone" onClick={handleTextToSpeech}>
  <i className="fa-solid fa-volume-high"></i>
  </button>
  :null*/} 
   {translationDone ?<button className="Lang Save" onClick={handleSaveTranslation}>
   <i className="fas fa-save"></i>
  </button>
  :null} 
</div>

</div>



        </div>
    )
}