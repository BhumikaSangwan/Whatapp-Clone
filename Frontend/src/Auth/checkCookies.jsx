// import React from 'react'

function checkCookies() {
    function check_Cookies(){
        console.log("Check cookies request sent");
        fetch("http://localhost:9000/users/checkCookies", {
            method: "GET",
            credentials: "include"
        })
  .then((res) => res.json())
  .then((data) => console.log("Cookies from server:", data))
  .catch((err) => console.error(err));
    }
  return (
    <button onClick={check_Cookies}>checkCookies</button>
  )
}

export default checkCookies