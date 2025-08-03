import React from "react";
import { observer } from "mobx-react-lite";
import { FirstStep } from "@/features/configurator/components/FirstStep";

const ConfiguratorPage = observer(() => (
    <div>
        <FirstStep />
    </div>
));

export default ConfiguratorPage;