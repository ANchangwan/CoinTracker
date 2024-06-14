import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ThemeProvider, styled } from "styled-components";
import { DarkMode, LightMode } from "./theme";

const Navigation = styled.header`
  display: flex;
  justify-content: end;
`;




function Root() {
  
  return (
    <div>
      
      <Outlet />
    </div>
  );
}

export default Root;
