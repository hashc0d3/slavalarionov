import axios from 'axios';
import { WatchDto } from '../types/WatchDto';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchWatches = async (): Promise<WatchDto[]> => {
    const { data } = await axios.get(`${API_URL}/watches`);

    return data;
};