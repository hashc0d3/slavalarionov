import { makeAutoObservable, runInAction } from "mobx";
import { fetchWatches } from "../api/watchesApi";
import { WatchDto } from "../types/WatchDto";

class ConstructorStore {
    selectedProduct: string | null = null;
    options: Record<string, any> = {};

    watches: WatchDto[] = [];
    isWatchesLoading = false;
    watchesError: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    setProduct(product: string) {
        this.selectedProduct = product;
    }

    setOption(key: string, value: any) {
        this.options[key] = value;
    }

    reset() {
        this.selectedProduct = null;
        this.options = {};
    }

    async loadWatches() {
        this.isWatchesLoading = true;
        this.watchesError = null;
        try {
            const data = await fetchWatches();
            runInAction(() => {
                this.watches = data;
                this.isWatchesLoading = false;
            });
        } catch (e: any) {
            runInAction(() => {
                this.watchesError = e.message;
                this.isWatchesLoading = false;
            });
        }
    }
}

const constructorStore = new ConstructorStore();
export default constructorStore;