import React, {Fragment} from "react";

const style = {
    width: '80px',
    height: '80px',
    border: '0',
    marginLeft: '50%',
    marginTop: '30%',
    display: 'flex',
    position: 'relative'
}

export default () => (
    <Fragment>
        <p
            className="spinner"
            style={style}
        />
    </Fragment>
)