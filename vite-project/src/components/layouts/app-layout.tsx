import { Outlet } from "react-router-dom";
import {Navbar1} from "@/components/navbar1";
import {Footer2} from "@/components/footer2";


const AppLayout = () =>{
 


  return (
    <>
    <Navbar1 />
     <Outlet />
    <Footer2 />
    </>
  );
};

export default AppLayout;