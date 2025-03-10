// import styles from './styles.module.css';
// import Edit from '../Edit/index.jsx';
// import { useState, useEffect } from 'react';

// export default function Profile() {
//     const getName = async () => {
//         try {
//             const response = await fetch('http://localhost:9000/whatsapp/getName', {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 credentials: 'include',
//             });
//             if (!response.ok) {
//                 throw new Error(`HTTP error! Status: ${response.status}`);
//             }
//             const data = await response.json();
//             return data.name;
//         } catch (error) {
//             console.error('Error fetching name:', error);
//             return "";
//         }
//     };

//     const getAbout = async () => {
//         try {
//             const response = await fetch('http://localhost:9000/whatsapp/getAbout', {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 credentials: 'include',
//             });
//             if (!response.ok) {
//                 throw new Error(`HTTP error! Status: ${response.status}`);
//             }
//             const data = await response.json();
//             return data.about;
//         } catch (error) {
//             console.error('Error fetching about:', error);
//             return "";
//         }
//     };

//     const [name, setName] = useState('');
//     const [about, setAbout] = useState('');

//     useEffect(() => {
//         getName().then((data) => {if(data) {setName(data)}});
//         getAbout().then((data) => {if(data) {setAbout(data)}});
//     }, []);

//     const handleNameChange = (event) => {
//         setName(event.target.value);
//     };

//     const handleAboutChange = (event) => {
//         setAbout(event.target.value);
//     };

//     const [edit, setEdit] = useState(<Edit/>);

//     const save = <svg 
//                     viewBox="0 0 24 24" 
//                     height="24" 
//                     width="24" 
//                     preserveAspectRatio="xMidYMid meet" 
//                     version="1.1" 
//                     x="0px" 
//                     y="0px" 
//                     enableBackground="new 0 0 24 24"
//                     >
//                       <title>checkmark</title>
//                       <path fill="currentColor" d="M9,17.2l-4-4l-1.4,1.3L9,19.9L20.4,8.5L19,7.1L9,17.2z"></path>
//                   </svg>

//     function handleClick()
//     {

//     }

//   return (
//     <div className={styles.main}>
//       <div className={styles.head}>
//         <div className={styles.heading}>
//           Profile
//         </div>
//       </div>

//       <div>
//         <div className={styles.addProfile}>
//         <div >
//           <div className={styles.profile}>
//           <svg
//             viewBox="0 0 212 212"
//             height="200"
//             width="200"
//             preserveAspectRatio="xMidYMid meet"
//             className="xh8yej3 x5yr21d"
//             version="1.1"
//             x="0px"
//             y="0px"
//             enableBackground="new 0 0 212 212"
//           >
//             <title>default-user</title>
//             <path fill="#DFE5E7" d="M106.251,0.5C164.653,0.5,212,47.846,212,106.25S164.653,212,106.25,212C47.846,212,0.5,164.654,0.5,106.25 S47.846,0.5,106.251,0.5z" className="xl21vc0"></path>
//             <g><path fill="#FFFFFF" d="M173.561,171.615c-0.601-0.915-1.287-1.907-2.065-2.955c-0.777-1.049-1.645-2.155-2.608-3.299 c-0.964-1.144-2.024-2.326-3.184-3.527c-1.741-1.802-3.71-3.646-5.924-5.47c-2.952-2.431-6.339-4.824-10.204-7.026 c-1.877-1.07-3.873-2.092-5.98-3.055c-0.062-0.028-0.118-0.059-0.18-0.087c-9.792-4.44-22.106-7.529-37.416-7.529 s-27.624,3.089-37.416,7.529c-0.338,0.153-0.653,0.318-0.985,0.474c-1.431,0.674-2.806,1.376-4.128,2.101 c-0.716,0.393-1.417,0.792-2.101,1.197c-3.421,2.027-6.475,4.191-9.15,6.395c-2.213,1.823-4.182,3.668-5.924,5.47 c-1.161,1.201-2.22,2.384-3.184,3.527c-0.964,1.144-1.832,2.25-2.609,3.299c-0.778,1.049-1.464,2.04-2.065,2.955 c-0.557,0.848-1.033,1.622-1.447,2.324c-0.033,0.056-0.073,0.119-0.104,0.174c-0.435,0.744-0.79,1.392-1.07,1.926 c-0.559,1.068-0.818,1.678-0.818,1.678v0.398c18.285,17.927,43.322,28.985,70.945,28.985c27.678,0,52.761-11.103,71.055-29.095 v-0.289c0,0-0.619-1.45-1.992-3.778C174.594,173.238,174.117,172.463,173.561,171.615z" className="x1d6ck0k"></path>
//               <path fill="#FFFFFF" d="M106.002,125.5c2.645,0,5.212-0.253,7.68-0.737c1.234-0.242,2.443-0.542,3.624-0.896 c1.772-0.532,3.482-1.188,5.12-1.958c2.184-1.027,4.242-2.258,6.15-3.67c2.863-2.119,5.39-4.646,7.509-7.509 c0.706-0.954,1.367-1.945,1.98-2.971c0.919-1.539,1.729-3.155,2.422-4.84c0.462-1.123,0.872-2.277,1.226-3.458 c0.177-0.591,0.341-1.188,0.49-1.792c0.299-1.208,0.542-2.443,0.725-3.701c0.275-1.887,0.417-3.827,0.417-5.811 c0-1.984-0.142-3.925-0.417-5.811c-0.184-1.258-0.426-2.493-0.725-3.701c-0.15-0.604-0.313-1.202-0.49-1.793 c-0.354-1.181-0.764-2.335-1.226-3.458c-0.693-1.685-1.504-3.301-2.422-4.84c-0.613-1.026-1.274-2.017-1.98-2.971 c-2.119-2.863-4.646-5.39-7.509-7.509c-1.909-1.412-3.966-2.643-6.15-3.67c-1.638-0.77-3.348-1.426-5.12-1.958 c-1.181-0.355-2.39-0.655-3.624-0.896c-2.468-0.484-5.035-0.737-7.68-0.737c-21.162,0-37.345,16.183-37.345,37.345 C68.657,109.317,84.84,125.5,106.002,125.5z" className="x1d6ck0k"></path></g>
//           </svg>
//           </div>
//           <div className={styles.innerContent}>
//           <span aria-hidden="true" data-icon="camera">
//             <svg
//               viewBox="0 0 24 24"
//               height="24"
//               width="24"
//               preserveAspectRatio="xMidYMid meet"
//               version="1.1"
//               x="0px"
//               y="0px"
//               enableBackground="new 0 0 24 24"
//             >
//               <title>camera</title>
//               <path fill="currentColor" d="M21.317,4.381H10.971L9.078,2.45C8.832,2.199,8.342,1.993,7.989,1.993H4.905 c-0.352,0-0.837,0.211-1.078,0.468L1.201,5.272C0.96,5.529,0.763,6.028,0.763,6.38v1.878c0,0.003-0.002,0.007-0.002,0.01v11.189 c0,1.061,0.86,1.921,1.921,1.921h18.634c1.061,0,1.921-0.86,1.921-1.921V6.302C23.238,5.241,22.378,4.381,21.317,4.381z  M12.076,18.51c-3.08,0-5.577-2.497-5.577-5.577s2.497-5.577,5.577-5.577s5.577,2.497,5.577,5.577 C17.654,16.013,15.157,18.51,12.076,18.51z M12.076,9.004c-2.17,0-3.929,1.759-3.929,3.929s1.759,3.929,3.929,3.929 s3.929-1.759,3.929-3.929C16.004,10.763,14.245,9.004,12.076,9.004z"></path>
//             </svg>
//           </span>

//         <div className={styles.addinfo}>
//           ADD PROFILE 
//             PHOTO
//           </div>
//           </div></div>
//         </div></div>

//         <div className={styles.nameSection}>
//           <div className={styles.nameHeading}>
//               Your name
//           </div>
//           <div className={styles.editName}>
//             <div className={styles.inputName}>
//               <input 
//               onChange={(e) => handleNameChange(e.target.value)} 
//               type="text" 
//               value={name} 
//               className={styles.putName}
//               />
//             </div>
//             <div className={styles.edit}>
//               {edit onClick={handleClick}}
//             </div>
//           </div>
//         </div>

//         <div className={styles.showInfo}>
//           This is not your username or PIN. This name will be visible to your WhatsApp contacts.
//         </div>

//         <div className={styles.nameSection}>
//           <div className={styles.nameHeading}>
//               About
//           </div>
//           <div className={styles.editName}>
//             <div className={styles.inputName}>
//               <input 
//                 onChange={(e) => handleAboutChange(e.target.value)} 
//                 type="text" 
//                 value={about} 
//                 className={styles.putName}
//               />
//             </div>
//             <div className={styles.edit}>
//               <Edit />
//             </div>
//           </div>
//         </div>

//         <div className={styles.other}></div>
//     </div>
//   )
// }

import styles from './styles.module.css';
import { useState, useEffect, useRef } from 'react';

export default function Profile() {
  const getName = async () => {
    try {
      const response = await fetch('http://localhost:9000/whatsapp/getName', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data.name;
    } catch (error) {
      console.error('Error fetching name:', error);
      return "";
    }
  };

  const getAbout = async () => {
    try {
      const response = await fetch('http://localhost:9000/whatsapp/getAbout', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data.about;
    } catch (error) {
      console.error('Error fetching about:', error);
      return "";
    }
  };

  const getProfile = async () => {
    try {
      const response = await fetch('http://localhost:9000/whatsapp/getProfile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (!response.ok) {
        if (response.status === 200) {
          setProfile(null);
          setAddProfileMsg("ADD PROFILE PHOTO");
          return;
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      if (response.headers.get('content-type')?.startsWith('image/')) {
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setProfile(imageUrl);
        setAddProfileMsg("CHANGE PROFILE PHOTO");
      } else {
        setProfile(null);
      }
    } catch (error) {
      console.error('Error fetching about:', error);
      return "";
    }
  }

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [editMode, setEditMode] = useState({ name: false, about: false });
  const [profile, setProfile] = useState(null);
  const [addProfileMsg, setAddProfileMsg] = useState('ADD PROFILE PHOTO');

  const fileInputRef = useRef(null);

  useEffect(() => {
    getName().then((data) => { if (data) { setName(data) } });
    getAbout().then((data) => { if (data) { setAbout(data) } });
    getProfile()
  }, []);


  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAboutChange = (event) => {
    setAbout(event.target.value);
  };

  const save = (
    <svg
      viewBox="0 0 24 24"
      height="24"
      width="24"
      preserveAspectRatio="xMidYMid meet"
      version="1.1"
      x="0px"
      y="0px"
      enableBackground="new 0 0 24 24"
    >
      <title>checkmark</title>
      <path fill="currentColor" d="M9,17.2l-4-4l-1.4,1.3L9,19.9L20.4,8.5L19,7.1L9,17.2z"></path>
    </svg>
  );

  const edit = (
    <svg
      viewBox="0 0 24 24"
      height="24"
      width="24"
      preserveAspectRatio="xMidYMid meet"
      version="1.1"
      x="0px"
      y="0px"
      enableBackground="new 0 0 24 24"
    >
      <title>pencil</title>
      <path fill="currentColor" d="M3.95,16.7v3.4h3.4l9.8-9.9l-3.4-3.4L3.95,16.7z M19.75,7.6c0.4-0.4,0.4-0.9,0-1.3 l-2.1-2.1c-0.4-0.4-0.9-0.4-1.3,0l-1.6,1.6l3.4,3.4L19.75,7.6z"></path>
    </svg>
  );

  const handleNameEditClick = () => {
    setEditMode({ ...editMode, name: !editMode.name });
  };

  const handleAboutEditClick = () => {
    setEditMode({ ...editMode, about: !editMode.about });
  };

  const handleProfileClick = () => {
    fileInputRef.current.click();
  };

  const handleNameSaveClick = async () => {
    try {
      console.log("update name try block");
      await fetch('http://localhost:9000/whatsapp/updateName', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ username: name }),
      });
      console.log("name updated successfully");
      setEditMode({ ...editMode, name: false });
    } catch (error) {
      console.error('Error saving name:', error);
    }
  };

  const handleAboutSaveClick = async () => {
    try {
      await fetch('http://localhost:9000/whatsapp/updateAbout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ about: about }),
      });
      setEditMode({ ...editMode, about: false });
    } catch (error) {
      console.error('Error saving about:', error);
    }
  };

  const handleProfileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('profilePic', file);

    try {
      console.log("sending upload profile request");
      const response = await fetch('http://localhost:9000/whatsapp/uploadProfile', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (!response.ok) throw new Error(`Upload failed! Status: ${response.status}`);

      console.log('File uploaded successfully');
      getProfile();
      setAddProfileMsg("CHANGE PROFILE PHOTO");
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };


  return (
    <div className={styles.main}>
      <div className={styles.head}>
        <div className={styles.heading}>
          Profile
        </div>
      </div>

      <div>
        <div className={styles.addProfile}>
          <div className={styles.changeProfile} onClick={handleProfileClick}>
            <div className={styles.profile}>
              {profile ? <img src={profile} alt="Profile" style={{ width: '200px', height: '200px', borderRadius: '50%' }} /> : (
                <svg
                  viewBox="0 0 212 212"
                  height="200"
                  width="200"
                  preserveAspectRatio="xMidYMid meet"
                  className="xh8yej3 x5yr21d"
                  version="1.1"
                  x="0px"
                  y="0px"
                  enableBackground="new 0 0 212 212"
                >
                  <title>default-user</title>
                  <path fill="#DFE5E7" d="M106.251,0.5C164.653,0.5,212,47.846,212,106.25S164.653,212,106.25,212C47.846,212,0.5,164.654,0.5,106.25 S47.846,0.5,106.251,0.5z" className="xl21vc0"></path>
                  <g><path fill="#FFFFFF" d="M173.561,171.615c-0.601-0.915-1.287-1.907-2.065-2.955c-0.777-1.049-1.645-2.155-2.608-3.299 c-0.964-1.144-2.024-2.326-3.184-3.527c-1.741-1.802-3.71-3.646-5.924-5.47c-2.952-2.431-6.339-4.824-10.204-7.026 c-1.877-1.07-3.873-2.092-5.98-3.055c-0.062-0.028-0.118-0.059-0.18-0.087c-9.792-4.44-22.106-7.529-37.416-7.529 s-27.624,3.089-37.416,7.529c-0.338,0.153-0.653,0.318-0.985,0.474c-1.431,0.674-2.806,1.376-4.128,2.101 c-0.716,0.393-1.417,0.792-2.101,1.197c-3.421,2.027-6.475,4.191-9.15,6.395c-2.213,1.823-4.182,3.668-5.924,5.47 c-1.161,1.201-2.22,2.384-3.184,3.527c-0.964,1.144-1.832,2.25-2.609,3.299c-0.778,1.049-1.464,2.04-2.065,2.955 c-0.557,0.848-1.033,1.622-1.447,2.324c-0.033,0.056-0.073,0.119-0.104,0.174c-0.435,0.744-0.79,1.392-1.07,1.926 c-0.559,1.068-0.818,1.678-0.818,1.678v0.398c18.285,17.927,43.322,28.985,70.945,28.985c27.678,0,52.761-11.103,71.055-29.095 v-0.289c0,0-0.619-1.45-1.992-3.778C174.594,173.238,174.117,172.463,173.561,171.615z" className="x1d6ck0k"></path>
                    <path fill="#FFFFFF" d="M106.002,125.5c2.645,0,5.212-0.253,7.68-0.737c1.234-0.242,2.443-0.542,3.624-0.896 c1.772-0.532,3.482-1.188,5.12-1.958c2.184-1.027,4.242-2.258,6.15-3.67c2.863-2.119,5.39-4.646,7.509-7.509 c0.706-0.954,1.367-1.945,1.98-2.971c0.919-1.539,1.729-3.155,2.422-4.84c0.462-1.123,0.872-2.277,1.226-3.458 c0.177-0.591,0.341-1.188,0.49-1.792c0.299-1.208,0.542-2.443,0.725-3.701c0.275-1.887,0.417-3.827,0.417-5.811 c0-1.984-0.142-3.925-0.417-5.811c-0.184-1.258-0.426-2.493-0.725-3.701c-0.15-0.604-0.313-1.202-0.49-1.793 c-0.354-1.181-0.764-2.335-1.226-3.458c-0.693-1.685-1.504-3.301-2.422-4.84c-0.613-1.026-1.274-2.017-1.98-2.971 c-2.119-2.863-4.646-5.39-7.509-7.509c-1.909-1.412-3.966-2.643-6.15-3.67c-1.638-0.77-3.348-1.426-5.12-1.958 c-1.181-0.355-2.39-0.655-3.624-0.896c-2.468-0.484-5.035-0.737-7.68-0.737c-21.162,0-37.345,16.183-37.345,37.345 C68.657,109.317,84.84,125.5,106.002,125.5z" className="x1d6ck0k"></path></g>
                </svg>
              )}
            </div>
            <div className = {`${styles.innerContent} ${profile === null ? styles.showInnerContent : ''}`} >
              <span aria-hidden="true" data-icon="camera">
                <svg
                  viewBox="0 0 24 24"
                  height="24"
                  width="24"
                  preserveAspectRatio="xMidYMid meet"
                  version="1.1"
                  x="0px"
                  y="0px"
                  enableBackground="new 0 0 24 24"
                >
                  <title>camera</title>
                  <path fill="currentColor" d="M21.317,4.381H10.971L9.078,2.45C8.832,2.199,8.342,1.993,7.989,1.993H4.905 c-0.352,0-0.837,0.211-1.078,0.468L1.201,5.272C0.96,5.529,0.763,6.028,0.763,6.38v1.878c0,0.003-0.002,0.007-0.002,0.01v11.189 c0,1.061,0.86,1.921,1.921,1.921h18.634c1.061,0,1.921-0.86,1.921-1.921V6.302C23.238,5.241,22.378,4.381,21.317,4.381z  M12.076,18.51c-3.08,0-5.577-2.497-5.577-5.577s2.497-5.577,5.577-5.577s5.577,2.497,5.577,5.577 C17.654,16.013,15.157,18.51,12.076,18.51z M12.076,9.004c-2.17,0-3.929,1.759-3.929,3.929s1.759,3.929,3.929,3.929 s3.929-1.759,3.929-3.929C16.004,10.763,14.245,9.004,12.076,9.004z"></path>
                </svg>
              </span>

              <div className={styles.addinfo}>
                {addProfileMsg}
              </div>
            </div>
          </div>
        </div>
        <input
          type="file"
          accept='image/*'
          name='profile'
          ref={fileInputRef}
          id={styles.inputProfile}
          onChange={handleProfileChange} />
      </div>


      <div className={styles.nameSection}>
        <div className={styles.nameHeading}>
          Your name
        </div>
        <div className={styles.editName}>
          <div className={styles.inputName}>
            {editMode.name ? (
              <input
                onChange={handleNameChange}
                type="text"
                value={name}
                className={styles.putName}
              />
            ) : (
              <div className={styles.putName}>{name}</div>
            )}
          </div>
          <div className={styles.edit}>
            {editMode.name ? <div onClick={handleNameSaveClick}>{save}</div> : <div onClick={handleNameEditClick}>{edit}</div>}
          </div>
        </div>
      </div>

      <div className={styles.showInfo}>
        This is not your username or PIN. This name will be visible to your WhatsApp contacts.
      </div>

      <div className={styles.nameSection}>
        <div className={styles.nameHeading}>
          About
        </div>
        <div className={styles.editName}>
          <div className={styles.inputName}>
            {editMode.about ? (
              <input
                onChange={handleAboutChange}
                type="text"
                value={about}
                className={styles.putName}
              />
            ) : (
              <div className={styles.putName}>{about}</div>
            )}
          </div>
          <div className={styles.edit}>
            {editMode.about ? <div onClick={handleAboutSaveClick}>{save}</div> : <div onClick={handleAboutEditClick}>{edit}</div>}
          </div>
        </div>
      </div>

      <div className={styles.other}></div>
    </div>
  );
}
