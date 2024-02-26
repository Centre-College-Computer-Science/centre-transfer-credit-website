//ensures that information across pages will be saved, ensures that there is no need for prop drilling 
//acts largely as a global variable
import { createContext } from "react";

export const LevelContext = createContext(1);
