import React, { useEffect, useState } from 'react'
import "./Dashboard.css";
import { CiMail } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { MdOutlinePerson } from "react-icons/md";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const initialState = {
        Image: "",
        Description: "",
      };
    const [data, setData] = useState(initialState);
const navigate = useNavigate();

    const handleChange = (e) => {
      setData({ ...data, [e.target.name]: e.target.value });
    };

const[img,setImg]=useState()

    function loadImage(event) {
        var reader = new FileReader();
        reader.onload = function () {
          
          setData({ ...data, Image:reader.result});
        };
        reader.readAsDataURL(event.target.files[0]);
        
      }
  
    const handleSubmit = async (e) => {
        e.preventDefault();
      console.log(data);
      try {
        const res = await axios.post("https://photography-server-tawny.vercel.app/file/uploadimage", data);
        console.log(res);
        window.location.reload();
        
      } catch (error) {
        console.log(error);
      }  
    };

    const[contact,setContact]=useState([])

    const fetchData = async()=>{
        try {
            const res = await axios.get("https://photography-server-tawny.vercel.app/contactus/getcontact")
            setContact(res.data)
            console.log(res.data)
         } catch (error) {
            
         }
    }

    useEffect(()=>{
        fetchData();

    },[])

  return (
    <div>
       <div className="service bg-image">
      <div className='bg-blackshade'>
        <div className="container">
            <h1 className= 'services-h1 text-light'>
                Dashboard
            </h1>
        </div>
        </div>

      </div>
   <div className=''>
   <div class="d-flex align-items-start">
  <div style={{height:"62vh",padding:"80px",background:"rgb(226, 52, 100)", color:"white",gap:"50px"}} class="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
    <button class="nav-link  active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">Clients Messages</button>
    <button class="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Portfolio Form</button>
    <button class="nav-link" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">Services Form</button>
    <button class="nav-link" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false">Price Form</button>
  </div>
  <div class="tab-content w-100" id="v-pills-tabContent" >
    <div class="tab-pane fade show active w-100" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
    <table class="table animate__animated animate__backInLeft">
  <thead>
    <tr>
      <th scope="col">S.NO</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Message</th>
    </tr>
  </thead>
  <tbody>
    {
        contact && contact.map((item,index)=>{
            return(
<tr>
      <th scope="row">{index}</th>
      <td>{item.Name}</td>
      <td>{item.Email}</td>
      <td>{item.Message}</td>
    </tr>
            )
        })
    }
    
    
  </tbody>
</table>
   
        </div>
    <div class="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
    <div className="chatvia-register-form animate__animated animate__backInLeft">
            <form onSubmit={handleSubmit}>
              <div class="col-auto">
                <label style={{color:"black"}} class="sr-only" for="inlineFormInputGroup">
                  Image
                </label>
                <div class="input-group mb-2">
                  <div class="input-group-prepend">
                    
                  </div>
                  <input
                    type="file"
                    class=""
                    required
                    name="Image"
                    onChange={(event) => {
                        loadImage(event);
                      }}
                    id="inlineFormInputGroup"
                    placeholder="Enter Email"
                  />
                </div>
              </div>
              <div class="col-auto">
                <label style={{color:"black"}} class="sr-only" for="inlineFormInputGroup">
                  Description
                </label>
                <div class="input-group mb-2">
                  <div class="input-group-prepend">
                    
                  </div>
                  <input
                    type="text"
                    class=""
                    id="inlineFormInputGroup"
                    required
                    name="Description"
                    value={data.Description}
                    onChange={handleChange}
                    placeholder=" Enter Description"
                  />
                </div>
              </div>
             

              <button type="submit" >
                Add Portfolio
              </button>

             
            </form>
          </div>
    </div>
    <div class="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
    <div className="chatvia-register-form animate__animated animate__backInLeft">
            <form onSubmit={handleSubmit}>
              <div class="col-auto">
                <label style={{color:"black"}} class="sr-only" for="inlineFormInputGroup">
                  Service Name
                </label>
                <div class="input-group mb-2">
                  <div class="input-group-prepend">
                    
                  </div>
                  <input
                    type="text"
                    class=""
                    required
                    name="Service"
                    
                    id="inlineFormInputGroup"
                    placeholder="Enter Service Name"
                  />
                </div>
              </div>
              <div class="col-auto">
                <label style={{color:"black"}} class="sr-only" for="inlineFormInputGroup">
                  Image
                </label>
                <div class="input-group mb-2">
                  <div class="input-group-prepend">
                    
                  </div>
                  <input
                    type="text"
                    class=""
                    id="inlineFormInputGroup"
                    required
                    name="Image"
                   
                    placeholder=" Enter Image"
                  />
                </div>
              </div>
           

              <button type="submit" >
                Add Service
              </button>
            </form>
          </div>
    </div>
    <div class="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">
    <div className="chatvia-register-form animate__animated animate__backInLeft">
            <form onSubmit={handleSubmit}>
              <div class="col-auto">
                <label style={{color:"black"}} class="sr-only" for="inlineFormInputGroup">
                  Price
                </label>
                <div class="input-group mb-2">
                  <div class="input-group-prepend">
                    
                  </div>
                  <input
                    type="text"
                    class=""
                    required
                    name="Price"
                    
                    id="inlineFormInputGroup"
                    placeholder="Enter Price"
                  />
                </div>
              </div>
              <div class="col-auto">
                <label style={{color:"black"}} class="sr-only" for="inlineFormInputGroup">
                  Type
                </label>
                <div class="input-group mb-2">
                  <div class="input-group-prepend">
                    
                  </div>
                  <input
                    type="text"
                    class=""
                    id="inlineFormInputGroup"
                    required
                    name="type"
                   
                    placeholder=" Enter Type"
                  />
                </div>
              </div>
              

              <button type="submit" >
                Add Price
              </button>

              
            </form>
          </div>
    </div>
  </div>
</div>
   </div>
    </div>
  )
}

export default Dashboard
