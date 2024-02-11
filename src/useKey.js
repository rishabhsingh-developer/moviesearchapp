import { useEffect } from "react"
export function useKey(key,setClose){
    useEffect(function(){
        function callback(e){
          if (e.code.toLowerCase() === key.toLowerCase()){
            setClose(false)
          }
    
        }
    
    
        document.addEventListener("keydown" , callback)
    
        return function(){
          document.removeEventListener("keydown" , callback)
    
        }
      },[setClose , key])
    
    

}