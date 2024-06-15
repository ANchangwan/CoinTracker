import { ContextType, useState } from "react";
import { Outlet, useNavigate, useOutletContext } from "react-router-dom";
import { ThemeProvider, styled } from "styled-components";
import { DarkMode, LightMode } from "./theme";

function Root() {
  
  return (
    <div>
      <Outlet  />
    </div>
  );
}

export default Root;
