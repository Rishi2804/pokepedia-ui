import React from 'react';
import TeraSvg from './assets/tera.svg'

const TeraIcon: React.FC<React.SVGProps<SVGElement>> = (props) => {
    return (
        <TeraSvg {...props} />
    );
};

export default TeraIcon;