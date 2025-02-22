import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import {img_500,unavailable,unavailableLandscape} from "../../config/config";
import YouTubeIcon from '@mui/icons-material/YouTube';
import './ContentModal.css'


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "90%",
  height: "80%",
  bgcolor: '#39445a',
  border: '1px solid #282c34',
  boxShadow: 24,
  borderRadius: 10,
  color: "white",
  p: 4,
};


export default function ContentModal({children,media_type,id}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [content,setContent] = useState();
  const [video,setVideo]=useState();

  const fetchData = async() => {
    const {data}= await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    setContent(data);
  };

  const fetchVideo = async() => {
    const {data}= await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setVideo(data.results[0]?.key)
  };

  useEffect(()=>{
    fetchData();
    fetchVideo();
    // eslint-disable-next-line
  },[]);

  return (
    <>
      <div onClick={handleOpen} type="button" className="media">{children}</div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
           { content && <div className='ContentModal'>
            <img className='ContentModal_portrait' src={content.poster_path ? `${img_500}/${content.poster_path}`:unavailable} alt={content.name || content.title}/>
            <img className='ContentModal_landscape' src={content.backdrop_path ? `${img_500}/${content.backdrop_path}`:unavailableLandscape} alt={content.name || content.title}/>
            <div className='ContentModal_about'>
              <span className='ContentModal_title'>
                {content.name || content.title} (
                  {(
                    content.first_air_date || content.release_date || "_ _ _ _"
                  ).substring(0,4)}
                )
              </span>
              {content.tagline && (
                <i className='tagline'>{content.tagline}</i>
              )}
              <span className='ContentModal_description'>
                {content.overview}
              </span>
              
              <Button variant='contained' startIcon={<YouTubeIcon/>} color='secondary' target='__blank' href={`https://www.youtube.com/watch?v=${video}`}>
                Watch the Trailer
              </Button>
            </div>
           </div>}
          </Box>
        </Fade>
      </Modal>
    </>
  );
}