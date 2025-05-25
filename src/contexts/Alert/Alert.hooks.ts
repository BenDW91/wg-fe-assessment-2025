import { useContext } from 'react';
import { AlertContext } from './Alert.context';

export const useAlert = () => useContext(AlertContext);
