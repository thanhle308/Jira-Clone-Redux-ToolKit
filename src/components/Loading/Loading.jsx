import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
const antIcon = (
    <LoadingOutlined
        style={{
            fontSize: 200,
        }}
        spin
    />
);

const Loading = (props) => {
    const { isLoading } = useSelector(state => state.loadingReducer);


    return (
        <Fragment>
            {isLoading ? <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 99 }}>
                <Spin indicator={antIcon} />
            </div> : ''
            }

        </Fragment>

    );
}

export default Loading;
