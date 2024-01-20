import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import Loading from '../components/pages/Loading';
import "../styles/Modal.css";
import { useTheme } from '@mui/material';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,

};

interface modalProps {
    state: boolean,
    setState: (active: boolean) => void,
    content: any
}

export default function TransitionsModal({ state, setState, content }: modalProps) {

    const theme = useTheme();
    const handleClose = () => setState(false);

    const aud: any = content?.phonetics.filter((ele: any) => ele?.audio);
    // console.log(content);
    const mycontent = content?.meanings.reduce((obj: any, ele: any) => {

        if (ele?.synonyms) {
            ele?.synonyms.map((syn: any) => obj.synonyms.push(syn));

        }
        if (ele?.antonyms) {
            ele?.antonyms.map((ant: any) => obj.antonyms.push(ant));

        }
        if (ele?.definitions) {
            ele?.definitions?.map((ex: any) => { if (ex.example) { obj.example.push(ex.example) } });

        }

        return obj;
    }, { synonyms: [], antonyms: [], example: [] });
    // console.log(mycontent);
    const play = () => {
        new Audio(aud[0]?.audio).play();
    }

    return (
        (!content) ? <Loading /> :
            <div data-testid="modal" >

                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={state}
                    onClose={handleClose}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                        backdrop: {
                            timeout: 500,
                        },
                    }}

                    data-testid="mymodal"
                >
                    <Fade in={state}>

                        <Box sx={style} className="box">

                            <div className='top_con' >
                                <Typography id="transition-modal-title" variant="h4" component="h2" data-testid="myword">
                                    <b className='myword'>{content?.word}</b>
                                </Typography>
                                <span className='track' data-testid="audio" onClick={play}>
                                    <AudiotrackIcon data-testid="audio-track" sx={{ fontSize: "30px" }} />
                                </span>
                            </div>
                            <div data-testid="info">

                                <div >

                                    {mycontent.synonyms.length > 0 && <div className='lists'>Synonyms<ul className='list syn'>
                                        {mycontent.synonyms.map((syn: any) => (
                                            <li className="syns" key={syn} style={{ backgroundColor: theme.palette.secondary.light, color: theme.palette.background.default, width: "fit-content", padding: "0.5rem", borderRadius: "6px", margin: "3px" }}>{syn}</li>
                                        ))}
                                    </ul></div>}
                                    {mycontent.antonyms.length > 0 && <div className='lists'>  Antonyms<ul className='list ant'>
                                        {mycontent?.antonyms.map((ant: any, i: any) => (
                                            <li className='ants' key={i} style={{ backgroundColor: theme.palette.secondary.light, color: theme.palette.background.default, width: "fit-content", padding: "0.5rem", borderRadius: "6px", margin: "3px" }}>{ant}</li>
                                        ))}
                                    </ul></div>}
                                    {mycontent.example.length > 0 && <ul className='list exp'>
                                        Examples
                                        {mycontent?.example.map((exp: any) => (
                                            <li className="exps" key={exp.example}>{exp}</li>
                                        ))
                                        }
                                    </ul>}
                                </div>
                            </div>
                        </Box>

                    </Fade>
                </Modal>

            </div>

    );
}