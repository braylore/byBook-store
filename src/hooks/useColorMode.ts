import { useContext } from 'react';
import { ColorModeContext } from '../context/ColorModeContext';

export const useColorMode = () => useContext(ColorModeContext);
