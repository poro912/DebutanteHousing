import React from 'react'
//API불러 오기
import { login } from "../apis/login"

const APITest = () => {
    // API 실행 함수
    function API(){
        //API 함수 실행
        //id, pw를 변수로 안쓰고 진짜 아이디 직접 넣어도됨
        login("0x006f96E335DB48C05f1f23D3137b02982b1cef71", (error, responseData) => {
            if(error){
                console.log("API실패")
                console.log(error)
            }
            else{
                console.log("API 성공 :", responseData);
            }
        }) 
    }

    const handleClick = async (e) => {
        e.preventDefault();
        //@notion API사용 함수를 호출하여 로그인 실행
        API();
      };

    return (
        <div>
            <button onClick={handleClick}>API 버튼</button>
        </div>
    )
}

export default APITest