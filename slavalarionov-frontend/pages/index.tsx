import React from "react";
import Link from "next/link";

export default function HomePage() {
    return (
        <div>
            Hello World! <br/>
            Pages: <br/>
            <Link href="/configurator">
                <button>Перейти в конфигуратор</button>
            </Link>
        </div>
    );
}