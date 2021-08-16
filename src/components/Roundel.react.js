// @flow

import React from 'react';

import "./Roundel.css";
import "./Roundel.animation.css";

export default function Roundel(): React$MixedElement {
    return (
        <div className="roundel" type="underground">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                <circle className="roundel-outer-circle" cx="50" cy="50" r="40" />
                <circle className="roundel-inner-circle" cx="50" cy="50" r="26" />
                <rect className="roundel-rectangle" x="1" y="42.5" width="98" height="15" />
                <div className="roundel-label" />
            </svg>
        </div>
    );
}