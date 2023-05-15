import express from "express"
const router=express.Router()

router.get("/",(req,res)=>{
    res.send("Estyo haciendo un get desde auth")
})



export default router