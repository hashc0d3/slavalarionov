export class WatchColorDto {
    colorName: string;
    colorHex: string;
}

export class WatchDto {
    id: string;
    model: string;
    image: string;
    sizes: string[];
    colors: WatchColorDto[];
}