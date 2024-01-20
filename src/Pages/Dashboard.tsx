import { TextField, Button } from '@mui/material'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { setMode } from '../state';
import TransitionsModal from './Modal';
import Notify from '../components/pages/notify';
import { LightModeOutlined, DarkModeOutlined } from "@mui/icons-material"
import { useDispatch } from 'react-redux';
import { useTheme, IconButton } from "@mui/material";
import "../styles/Dashboard.css";



const Dashboard = () => {
    const [name, setName] = useState<string>("Hello");
    const [state, setState] = useState<boolean>(false);
    const [content, setContent] = useState<any>();
    const [error, setError] = useState<boolean>(false);
    const dispatch = useDispatch();
    const theme = useTheme();

    const getInfo = async (e: any) => {
        try {
            e.preventDefault();

            const res = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${name}`);
            // console.log(res.data[0]);
            setContent(res.data[0]);
            setState(true);
            setName("");

        } catch (err: any) {
            console.log(err.message);
            setError(true);
        }

    }

    useEffect(() => {
        const call = async () => {
            const res = await axios.get(`https://random-words-api.vercel.app/word`);
            // console.log(res.data[0]);
            setContent(res.data[0]);
        }
        call();
    }, []);

    return (
        <div>
            <IconButton onClick={() => dispatch(setMode())} sx={{ margin: "2rem" }}>
                {theme.palette.mode === 'light' ? (
                    <LightModeOutlined sx={{ fontSize: "25px" }} />
                ) : (<DarkModeOutlined sx={{ fontSize: "25px" }} />)}
            </IconButton>

            <div className='formcont'

            ><div className='title'><b>Search By Word</b></div>
                <form onSubmit={(e) => getInfo(e)} data-testid="form" className='form'>
                    <TextField variant='standard' label="search by word" onChange={(e) => setName(e.target.value)} className='text' />
                    <Button style={{
                        backgroundColor: theme.palette.secondary["light"],
                        color: theme.palette.background.default,
                        fontSize: "14px",
                        fontWeight: "bold",
                        padding: "10px 15px",
                        marginLeft: "1rem"
                    }} variant='outlined' type='submit' disabled={name.length > 0 ? false : true}>Submit</Button>
                </form>
                <div className='container'>
                    <div onClick={() => setState(true)} data-testid="words" className='wordcont'><b className='word'>{content?.word}</b>{!content?.definition ? "more info" : null}</div>
                    <p className='speech'><q>{content?.definition ? (content?.definition) : (content?.meanings[0].partOfSpeech)}</q></p>
                    <p className='definition'>{content?.pronunciation ? (content?.pronunciation) : (content?.meanings[0].definitions[0].definition)}</p>
                </div>
                {state && <TransitionsModal state={state} setState={setState} content={content} />}
                {error && <Notify setNotify={setError} message='Unable to fetch request' />}
            </div>
        </div>
    )
}


export default Dashboard
