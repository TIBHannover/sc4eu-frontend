import React, { Component } from 'react';
import html2canvas from 'html2canvas';
import PropTypes from 'prop-types';
import { Overlay, Crosshairs } from 'styledComponents/styledComponents';

export default class ScreenCapture extends Component {
    state = {
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0,
        crossHairsTop: 0,
        crossHairsLeft: 0,
        isMouseDown: false,
        windowWidth: 0,
        windowHeight: 0,
        borderWidth: 0,
        cropPositionTop: 0,
        cropPositionLeft: 0,
        cropWidth: 0,
        cropHeigth: 0,
        imageURL: ''
    };

    componentDidMount = () => {
        this.handleWindowResize();
        window.addEventListener('resize', this.handleWindowResize);
    };

    componentWillUnmount = () => {
        window.removeEventListener('resize', this.handleWindowResize);
    };

    handleMouseMove = e => {
        const { isMouseDown, windowWidth, windowHeight, startX, startY, borderWidth } = this.state;

        let cropPositionTop = startY;
        let cropPositionLeft = startX;
        const endX = e.clientX;
        const endY = e.clientY;
        const isStartTop = endY >= startY;
        const isStartBottom = endY <= startY;
        const isStartLeft = endX >= startX;
        const isStartRight = endX <= startX;
        const isStartTopLeft = isStartTop && isStartLeft;
        const isStartTopRight = isStartTop && isStartRight;
        const isStartBottomLeft = isStartBottom && isStartLeft;
        const isStartBottomRight = isStartBottom && isStartRight;
        let newBorderWidth = borderWidth;
        let cropWidth = 0;
        let cropHeigth = 0;

        if (isMouseDown) {
            if (isStartTopLeft) {
                newBorderWidth = `${startY}px ${windowWidth - endX}px ${windowHeight - endY}px ${startX}px`;
                cropWidth = endX - startX;
                cropHeigth = endY - startY;
            }

            if (isStartTopRight) {
                newBorderWidth = `${startY}px ${windowWidth - startX}px ${windowHeight - endY}px ${endX}px`;
                cropWidth = startX - endX;
                cropHeigth = endY - startY;
                cropPositionLeft = endX;
            }

            if (isStartBottomLeft) {
                newBorderWidth = `${endY}px ${windowWidth - endX}px ${windowHeight - startY}px ${startX}px`;
                cropWidth = endX - startX;
                cropHeigth = startY - endY;
                cropPositionTop = endY;
            }

            if (isStartBottomRight) {
                newBorderWidth = `${endY}px ${windowWidth - startX}px ${windowHeight - startY}px ${endX}px`;
                cropWidth = startX - endX;
                cropHeigth = startY - endY;
                cropPositionLeft = endX;
                cropPositionTop = endY;
            }
        }

        this.setState({
            crossHairsTop: e.clientY,
            crossHairsLeft: e.clientX,
            borderWidth: newBorderWidth,
            cropWidth,
            cropHeigth,
            cropPositionTop: cropPositionTop,
            cropPositionLeft: cropPositionLeft
        });
    };

    handleMouseDown = e => {
        const startX = e.clientX;
        const startY = e.clientY;

        this.setState(prevState => ({
            startX,
            startY,
            cropPositionTop: startY,
            cropPositionLeft: startX,
            isMouseDown: true,
            borderWidth: `${prevState.windowWidth}px ${prevState.windowHeight}px`
        }));
    };

    handleMouseUp = () => {
        this.handleClickTakeScreenShot();
        this.setState({
            on: false,
            isMouseDown: false,
            borderWidth: 0
        });
    };

    handleClickTakeScreenShot = () => {
        const { cropPositionTop, cropPositionLeft, cropWidth, cropHeigth } = this.state;
        const body = document.querySelector('body');

        html2canvas(body, { scale: 3 }).then(canvas => {
            const croppedCanvas = document.createElement('canvas');
            const croppedCanvasContext = croppedCanvas.getContext('2d');

            croppedCanvas.width = cropWidth * 3;
            croppedCanvas.height = cropHeigth * 3;

            croppedCanvasContext.drawImage(
                canvas,
                cropPositionLeft * 3,
                cropPositionTop * 3,
                cropWidth * 3,
                cropHeigth * 3,
                0,
                0,
                cropWidth * 3,
                cropHeigth * 3
            );

            this.setState({ imageURL: croppedCanvas.toDataURL() });
            this.props.onEndCapture(croppedCanvas.toDataURL());
        });

        this.setState({
            crossHairsTop: 0,
            crossHairsLeft: 0
        });
    };

    handleWindowResize = () => {
        const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

        this.setState({
            windowWidth,
            windowHeight
        });
    };

    render() {
        const { crossHairsTop, crossHairsLeft, borderWidth, isMouseDown } = this.state;

        return (
            <div onMouseMove={this.handleMouseMove} onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} role="region">
                <Overlay className={isMouseDown && 'highlighting'} style={{ borderWidth }} />
                {!this.state.imageURL && <Crosshairs style={{ left: crossHairsLeft + 'px', top: crossHairsTop + 'px' }} />}
            </div>
        );
    }
}

ScreenCapture.propTypes = {
    onEndCapture: PropTypes.func
};

