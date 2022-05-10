import React, { FC } from 'react';

interface NgIfProps {
    show: boolean;
    children: any;
}

export const NgIf: FC<NgIfProps> = ({ show, children }: NgIfProps): any | null => {
    if (show) {
        return children;
    }

    return null;
}

export default NgIf;
