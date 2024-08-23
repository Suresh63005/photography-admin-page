import React, { useContext, useEffect } from 'react'
import { UserContext } from '../../Services/CreateContext'
import axios from 'axios'
import DeleteIcon from '@mui/icons-material/Delete';
const Portfolio = () => {
  const {user,setUser,images,setImages} =useContext(UserContext)


  useEffect(()=>{
    fetchImageData();
  },[])

  const fetchImageData = async()=>{
    try {
      const res = await axios.get("https://photography-server-tawny.vercel.app/file/getimage")
      console.log(res.data,"from dbimages")
      setImages(res.data)
    } catch (error) {
    }
  }

  const deleteImage = async (id) => {
    try {
        const imageid = id;
        const res = await axios.post("https://photography-server-tawny.vercel.app/file/deleteimage", { imageid });
        console.log(res);
        window.location.reload();
    } catch (error) {
        console.log(error);
    }
};


  

  return (
    <div>
      <div className="service bg-image">
      <div className='bg-blackshade'>
        <div className="container">
            <h1 className= 'services-h1 text-light'>
                Portfolio
            </h1>
        </div>
        </div>

      </div>

      <div id className="container animate__animated animate__backInUp portfolio mt-5">

  <div className="portfolio-ele-1 mt-4">
    <div className="row">
    {
        images && images.map((item,index)=>{
          return(
            
<div className="col-lg-4 col-md-6 col-12">
        <div className='portfolio-img-banner mb-4'>
          <img src={item.Image} alt="" />
          <div style={{cursor:"pointer"}} onClick={()=>deleteImage(item._id)}  className="delete-svg">
          <DeleteIcon/>
          
          </div>
        </div>
      </div>
            
          )
        })
      }
      
    </div>
  </div>
</div>
    </div>
  )
}

export default Portfolio
