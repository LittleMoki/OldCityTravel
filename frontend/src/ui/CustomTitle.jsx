import React from 'react';
import {useTranslation} from "react-i18next";

// eslint-disable-next-line react/prop-types
function CustomTitle({tag, text, className}) {
    const {t} = useTranslation();
    return React.createElement(
        tag,
        {className: `${className} lg:text-5xl text-4xl font-medium`},
        t(text)
    );
}

export default CustomTitle;