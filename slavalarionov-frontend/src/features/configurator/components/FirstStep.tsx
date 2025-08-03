import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import constructorStore from "../store/constructorStore";

export const FirstStep = observer(() => {
    useEffect(() => {
        constructorStore.loadWatches();
    }, []);

    if (constructorStore.isWatchesLoading) return <div>Загрузка...</div>;
    if (constructorStore.watchesError) return <div>Ошибка: {constructorStore.watchesError}</div>;

    return (
        <div>
            {constructorStore.watches.map((watch) => (
                <div key={watch.id}>
                    <img src={watch.image} alt={watch.model} width={100} />
                    <div>{watch.model}</div>
                    {watch.sizes.map((size, index) => <div key={index}>{size}</div>)}
                    {watch.colors.map((color, index) => <div key={index}>{color.colorName}</div>)}
                </div>
            ))}
        </div>
    );
});