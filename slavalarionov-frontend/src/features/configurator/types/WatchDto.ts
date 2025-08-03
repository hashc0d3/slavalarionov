export interface WatchColorDto {
    colorName: string;
    colorHex: string;
}

export interface WatchDto {
    id: string;
    model: string;
    image: string;
    sizes: string[];
    colors: WatchColorDto[];
}